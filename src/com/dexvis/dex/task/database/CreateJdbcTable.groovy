package com.dexvis.dex.task.database

import groovy.sql.Sql

import java.sql.Connection
import java.sql.DriverManager
import java.sql.PreparedStatement
import java.sql.Statement
import java.sql.Types
import java.text.DateFormat

import javafx.beans.value.ChangeListener
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.CheckBox
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.input.KeyEvent
import javafx.scene.input.MouseEvent

import org.controlsfx.control.RangeSlider
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.Dex
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.ModalDialog
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.DateUtil

@Root
class CreateJdbcTable extends DexTask {
  
  public CreateJdbcTable() {
    this("Database", "Create Jdbc Table", "database/CreateJdbcTable.html")
  }
  
  public CreateJdbcTable(String category, String name, String helpFile) {
    super(category, name, helpFile)
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  private MigPane configPane = null
  
  private Map dbConfig = [
    "Oracle" : [
      "driver"   : "oracle.jdbc.OracleDriver",
      "url"      : "jdbc:oracle:thin:@localhost:1521:XE",
      "user"     : "DEX",
      "password" : "DEX"
    ],
    "MySql" : [
      "driver"   : "com.mysql.jdbc.Driver",
      "url"      : "jdbc:mysql://localhost:3306/dex",
      "user"     : "DEX",
      "password" : "DEX"
    ],
    "Sqlite" : [
      "driver"   : "org.sqlite.JDBC",
      "url"      : "jdbc:sqlite:dex.db",
      "user"     : "DEX",
      "password" : "DEX"
    ],
    "Neo4J" : [
      "driver"   : "org.neo4j.jdbc.Driver",
      "url"      : "jdbc:neo4j://localhost:7575/dex",
      "user"     : "DEX",
      "password" : "DEX"
    ],
    "HyperSql" : [
      "driver"   : "org.hsqldb.jdbc.JDBCDriver",
      "url"      : "jdbc:hsqldb:mem:csvdb",
      "user"     : "sa",
      "password" : ""
    ],
    "Other" : [
      "driver"   : "jdbc.SomeDriver",
      "url"      : "jdbc:unknown",
      "user"     : "DEX",
      "password" : "DEX"
    ]
  ]
  
  @Element(name="dbtype", required=false)
  private ChoiceBox dbCB = new ChoiceBox(FXCollections.observableArrayList(dbConfig.keySet()))
  
  @Element(name="driver",required=false)
  private TextField driverText = new TextField("org.hsqldb.jdbc.JDBCDriver")
  @Element(name="url",required=false)
  private TextField urlText = new TextField("jdbc:hsqldb:mem:csvdb")
  @Element(name="password",required=false)
  private TextField passText = new TextField("")
  @Element(name="username", required=false)
  private TextField userText = new TextField("sa")
  @Element(name="table", required=false)
  private TextField tableText = new TextField("CSV")
  DexEnvironment env = DexEnvironment.getInstance()
  
  @Element(name="batch", required=false)
  private CheckBox batchCB = new CheckBox()
  
  @Element(name="right_sizing", required=false)
  private CheckBox rightSizingCB = new CheckBox()
  
  @Element(name="strict", required=false)
  private CheckBox strictCB = new CheckBox()
  
  @Element(name="string_min", required=false)
  private TextField stringMinText = new TextField("16")
  
  @Element(name="string_max", required=false)
  private TextField stringMaxText = new TextField("256")
  
  @Element(name="ignoreNulls", required=false)
  private CheckBox ignoreNullsCB = new CheckBox()
  
  RangeSlider stringLengthSlider = new RangeSlider(0, 4000, 16, 256)
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
    // Filter out unwanted characters
    state.dexData.header = state.dexData.header.collect
    { it ->
      (it =~ /[\s\/\-\\(\\)<>,]/).replaceAll("")
    }
    
    updateMessage("Scrubbing column names")
    // Replace unwanted keywords and convert to upper case
    
    state.dexData.header.eachWithIndex
    { colName, i ->
      String effColName = colName.toUpperCase()
      if (effColName == "LEVEL")
      {
        effColName = "DLEVEL"
      }
      state.dexData.header[i] = effColName
    }
    
    // Two major database types are supported; Traditional RDBMS and Neo4J GraphDB.
    // Significant differences exist between the two, so I use distinct population
    // methods for each.
    if (driverText.getText().equals("org.neo4j.jdbc.Driver"))
    {
      populateGraphDb(state, env);
    }
    else
    {
      populateRDBMS(state, env);
    }
    
    return state
  }
  
  public String toString()
  {
    return name
  }
  
  public void populateRDBMS(DexTaskState state, DexEnvironment env)
  {
    Class.forName(env.interpolate(driverText.getText()))
    updateMessage("Connecting to database")
    Connection con = DriverManager.getConnection(env.interpolate(urlText.getText()), env.interpolate(userText.getText()),
        env.interpolate(passText.getText()))
    boolean prevAutoCommit = con.getAutoCommit();
    
    Statement stmt = con.createStatement()
    //String dropSql = "DROP TABLE IF EXISTS " + tableText.getText();
    
    updateMessage("Dropping previous version")
    String dropSql = "DROP TABLE ${env.interpolate(tableText.getText())}"
    println "DROP SQL: dropSql"
    
    try
    {
      stmt.execute(dropSql)
    }
    catch (Exception ex)
    {
      //ex.printStackTrace()
    }
    
    updateMessage("Creating Table: ${env.interpolate(tableText.getText())}")
    
    def dataTypes = []
    
    if (strictCB.isSelected())
    {
      dataTypes = state.dexData.guessTypes()
    }
    else
    {
      state.dexData.header.each { dataTypes << "string" }
    }
    
    println "DATATYPES: '${dataTypes}"
    
    def dbTypes = []
    Map<String, DateFormat> dateFmtMap = [:]
    
    def selectedDb = dbCB.getSelectionModel().getSelectedItem()
    println "SELECTED DB: '${selectedDb}'"
    
    def dbTypeMaps = [
      "default" : [
        "integer" : "NUMBER(19,0)",
        "double"  : "NUMBER(19,4)",
        "date"    : "DATE",
        "string"  : "VARCHAR2"
      ],
      "HyperSql" : [
        "integer" : "INTEGER",
        "double"  : "DOUBLE",
        "date"    : "TIMESTAMP",
        "string"  : "VARCHAR"
      ]
    ]
    
    def dbTypeMap = dbTypeMaps["default"]
    
    if (dbTypeMaps.containsKey(selectedDb))
    {
      dbTypeMap = dbTypeMaps[selectedDb]
    }
    println "DB TYPEMAP: '$dbTypeMap'"
    List<Integer> dataLengths = state.dexData.getMaxLengths()
    dataTypes.eachWithIndex { dataType, di ->
      
      // Enough to store a long integer
      if (dataType == "integer")
      {
        dbTypes << dbTypeMap["integer"]
      }
      else if (dataType == "double")
      {
        dbTypes << dbTypeMap["double"]
      }
      else if (dataType == "date")
      {
        dbTypes << dbTypeMap["date"]
        dateFmtMap.put(state.dexData.header[di], DateUtil.guessFormat(state.dexData.getColumn(di)))
      }
      else
      {
        if (rightSizingCB.isSelected())
        {
          // Make sure everything is in sync.
          stringLengthSlider.setLowValue(stringMinText.getText() as Integer)
          stringLengthSlider.setHighValue(stringMaxText.getText() as Integer)
          println "RIGHT SIZING SLIDER: ${stringLengthSlider.getLowValue()} to ${stringLengthSlider.getHighValue()}"
          
          //println "POW: ${Math.log(dataLengths[di]) / Math.log(2)}"
          int dataSize = (int) Math.max(Math.min(Math.pow(2,
              Math.floor(Math.log(dataLengths[di]) / Math.log(2)) + 1),
              stringLengthSlider.getHighValue()), stringLengthSlider.getLowValue())
          dbTypes << dbTypeMap["string"] + "(${dataSize})"
        }
        else
        {
          dbTypes << dbTypeMap["string"] + "(${stringLengthSlider.getHighValue() as Integer})"
        }
      }
    }
    
    def fieldSql = []
    state.dexData.header.eachWithIndex { hdr, hi ->
      fieldSql << "${hdr} ${dbTypes[hi]}"
    }
    println "FIELDSQL: ${fieldSql}"
    String createSql = "CREATE TABLE " + env.interpolate(tableText.getText()) + "(" +
        fieldSql.join(",") + ")"
    
    println createSql
    stmt.execute(createSql)
    
    String insertSql = "INSERT INTO " + env.interpolate(tableText.getText()) +
        " (" + state.dexData.header.join(",") + ") VALUES ( " +
        ((1..state.dexData.header.size()).collect
        { "?" }).join(",") + ")"
    
    println "INSERT SQL: $insertSql"
    
    con.setAutoCommit(false);
    
    // TODO: Check batchCB, populateBatch or populateRow
    if (batchCB.isSelected())
    {
      populateBatch(con, state, insertSql, dataTypes)
    }
    else
    {
      populateRowByRow(con, state, insertSql, dataTypes, dateFmtMap)
    }
    
    con.commit();
    con.setAutoCommit(prevAutoCommit);
    
    stmt.close()
    con.close()
  }
  
  private void populateBatch(Connection con, DexTaskState state, String insertSql,
      List<String> dataTypes)
  {
    PreparedStatement pstmt = null;
    int BATCH_FACTOR = 1000;
    int errorCount = 0;
    int batchCount = 0;
    
    try
    {
      pstmt = con.prepareStatement(insertSql)
      
      state.dexData.data.eachWithIndex
      { row, ri ->
        if ((ri+1) % 1000 == 0)
        {
          updateMessage("Inserting row ${ri + 1}")
        }
        pstmt.clearParameters()
        //println "ROW: $row"
        row.eachWithIndex
        { param, i ->
          if (param == null)
          {
            try
            {
              pstmt.setNull(i+1, Types.VARCHAR)
            }
            catch (Exception ex)
            {
              ex.printStackTrace()
            }
          }
          else
          {
            try
            {
              pstmt.setString(i+1, param ? param : "")
            }
            catch (Exception ex)
            {
              ex.printStackTrace()
            }
          }
        }
        
        if (row.size() < state.dexData.header.size())
        {
          ((row.size()+1)..state.dexData.header.size()).each { pstmt.setString( it, "") }
        }
        
        pstmt.addBatch()
        
        try
        {
          if ((ri + 1) % BATCH_FACTOR == 0)
          {
            batchCount++;
            pstmt.executeBatch()
          }
        }
        catch (Exception ex)
        {
          errorCount++;
          updateMessage("Skipping batch ending at: $ri: " + row.collect{ "\"$it\"" }.join(","))
          ex.printStackTrace()
        }
      }
      
      try
      {
        pstmt.executeBatch()
        batchCount++;
      }
      catch (Exception ex)
      {
        ex.printStackTrace()
        errorCount++;
      }
    }
    catch (Exception ex)
    {
      ex.printStackTrace()
    }
    finally
    {
      pstmt?.close()
      if (errorCount > 1) {
        updateMessage(batchCount + " batches processed with " + errorCount + " errors");
      }
      else if (errorCount == 1) {
        updateMessage(batchCount + " batches processed with 1 error");
      }
      else {
        updateMessage(batchCount + " batches processed");
      }
    }
  }
  
  private void populateRowByRow(Connection con, DexTaskState state, String insertSql,
      List<String> dataTypes, Map<String, DateFormat> dateFmtMap)
  {
    PreparedStatement pstmt = null;
    int rowCount = 0;
    int errorCount = 0;
    
    try
    {
      pstmt = con.prepareStatement(insertSql)
      
      state.dexData.data.eachWithIndex
      { row, ri ->
        if ((ri+1) % 1000 == 0)
        {
          con.commit();
          updateMessage("Row: ${ri + 1}, Errors: ${errorCount}")
        }
        pstmt.clearParameters()
        //println "ROW: $row"
        row.eachWithIndex { param, i ->
          //def scrubbedParam = (param =~ "[\\]\\-\\[]").replaceAll("")
          
          if (dataTypes[i] == "integer")
          {
            if (param)
            {
              pstmt.setInt(i+1, param as Integer)
            }
            else
            {
              pstmt.setNull(i+1, java.sql.Types.INTEGER)
            }
          }
          else if (dataTypes[i] == "double")
          {
            if (param)
            {
              pstmt.setDouble(i+1, param as Double)
            }
            else
            {
              pstmt.setNull(i+1, java.sql.Types.DOUBLE)
            }
          }
          else if (dataTypes[i] == "date")
          {
            if (param)
            {
              //Date date = DateUtil.createSqlDate(param)
              Date date = dateFmtMap.get(state.dexData.header[i]).parse(param)
              
              if (date != null)
              {
                //println "Date Format: '${dateFmtMap.get(state.dexData.header[i]).toPattern()}'"
                //pstmt.setDate(i+1, new java.sql.Date(date.getTime()))
                try
                {
                  //println "Creating Timestamp"
                  pstmt.setTimestamp(i+1, new java.sql.Timestamp(date.getTime()))
                }
                catch (Exception ex)
                {
                  //println "Downgrading to Date..."
                  pstmt.setDate(i+1, new java.sql.Date(date.getTime()))
                }
              }
              else
              {
                pstmt.setNull(i+1, java.sql.Types.DATE)
              }
            }
            else
            {
              pstmt.setNull(i+1, java.sql.Types.DATE)
            }
          }
          else
          {
            pstmt.setString(i+1, param ? param : "")
          }
        }
        
        if (row.size() < state.dexData.header.size())
        {
          ((row.size()+1)..state.dexData.header.size()).each {
            if (dataTypes[it] == "integer")
            {
              pstmt.setNull(it, java.sql.Types.INTEGER)
            }
            else if (dataTypes[it] == "double")
            {
              pstmt.setNull(it, java.sql.Types.DOUBLE)
            }
            else if (dataTypes[it] == "date")
            {
              pstmt.setNull(it, java.sql.Types.DATE)
            }
            else
            {
              pstmt.setString( it, "")
            }
          }
        }
        
        try
        {
          rowCount++;
          pstmt.execute()
        }
        catch (Exception ex)
        {
          errorCount++;
          updateMessage("Skipping row $ri: " + row.collect{ "\"$it\"" }.join(","))
          // No sense in inundating the user with endless errros
          if (errorCount < 10) {
            println "OFFENDING ROW: " + row.collect{ "\"$it\"" }.join(",")
            ex.printStackTrace()
          }
        }
      }
    }
    catch (Exception ex)
    {
      ex.printStackTrace()
    }
    finally
    {
      pstmt?.close()
      updateMessage("Rows: ${rowCount}, Errors: ${errorCount}")
    }
  }
  
  public void populateGraphDb(DexTaskState state, DexEnvironment env)
  {
    // Make sure dex knows about this driver.
    Class.forName(env.interpolate(driverText.getText()))
    
    // Create a connection to the graph database
    Connection con = DriverManager.getConnection(env.interpolate(urlText.getText()), env.interpolate(userText.getText()),
        env.interpolate(passText.getText()))
    
    // Open a statement.
    Statement stmt = con.createStatement()
    
    // Drop all nodes and relationships from the graph.
    String dropSql = """MATCH (n)
OPTIONAL MATCH (n)-[r]-()
DELETE n,r"""
    
    println "DROP SQL: $dropSql"
    
    try
    {
      stmt.execute(dropSql)
    }
    catch (Exception ex)
    {
      ex.printStackTrace()
    }
    
    // Given A table:
    //
    // C1, C2, C3
    // 11, 12, 13
    //
    // Create A GraphDb With:
    //
    // Relationships: C1, C2, C3
    // Connections:
    //
    // (11:C1) -[C2]-> (12:C2)
    // (11:C1) -[C3]-> (13:C3)
    // (12:C2) -[C1]-> (11:C1)
    // (12:C2) -[C3]-> (13:C3)
    // (13:C3) -[C1]-> (11:C1)
    // (13:C3) -[C2]-> (12:C2)
    
    // This will contain mappings between column names and values to node names.
    def nodes = [:]
    
    // Initialize a separate map for each column.
    state.dexData.header.each
    { col ->
      nodes[col] = [:]
    }
    
    // Our batch SQL.
    def batchStmt = ""
    
    // Assign node name map:
    def nodeNum = 1
    state.dexData.data.each
    { row ->
      //println "ROW: $row"
      row.eachWithIndex
      { col, i ->
        // New node:
        if (!nodes[state.dexData.header[i]][col])
        {
          nodes[state.dexData.header[i]][col] = "N$nodeNum"
          stmt.execute("CREATE (N$nodeNum:${state.dexData.header[i]} {value:'$col'})")
          nodeNum++
        }
      }
    }
    
    //stmt.execute(batchStmt)
    //batchStmt = ""
    
    def relations = []
    
    // C1, C2, C3
    state.dexData.data.each
    { row ->
      (0..(state.dexData.header.size()-2)).each { node1Index ->
        ((node1Index+1)..(state.dexData.header.size()-1)).each { node2Index->
          def node1 = nodes[state.dexData.header[node1Index]][row[node1Index]]
          def node2 = nodes[state.dexData.header[node2Index]][row[node2Index]]
          //println "NODE1: $node1, NODE2: $node2, NODE1INDEX; $node1Index, NODE2INDEX: $node2Index"
          // Connect them bidirectionally.
          stmt.execute("""MATCH (src:${state.dexData.header[node1Index]} {value:'${row[node1Index]}'}),
(dest:${state.dexData.header[node2Index]} {value:'${row[node2Index]}'})
CREATE (src)-[:${state.dexData.header[node2Index]}]->(dest),
(dest)-[:${state.dexData.header[node1Index]}]->(src)
          """)
        }
      }
    }
    
    //    batchStmt += "\nMERGE " + relations.join(",\n") + "\n"
    
    //    println batchStmt
    //    stmt.execute(batchStmt)
    
    stmt.close()
    con.close()
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      if (!dbCB.getValue())
      {
        dbCB.setValue("HyperSql")
      }
      
      Label driverLabel = new Label("Driver:")
      Label urlLabel = new Label("Url:")
      Label passLabel = new Label("Password:")
      Label userLabel = new Label("Username:")
      Label tableLabel = new Label("Table Name:")
      Label rightSizingLabel = new Label("Right Sizing?")
      Label ignoreNullsLabel = new Label("Ignore Nulls?")
      Label strictLabel = new Label("Strict Types?")
      Label stringRangeLabel = new Label("String Bounds:")
      Label batchLabel = new Label("Batch:")
      
      configPane = new MigPane("", "[][grow]", "[][][][][][][][][][][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      Button testButton = new Button("Test Connection")
      
      configPane.add(NodeFactory.createTitle("JDBC Create Table Configuration"), "grow,span")
      
      configPane.add(new Label("Database Type:"))
      configPane.add(dbCB, "span")
      configPane.add(driverLabel)
      configPane.add(driverText, "grow,span")
      configPane.add(urlLabel)
      configPane.add(urlText, "grow,span")
      
      configPane.add(userLabel)
      configPane.add(userText, "grow,span")
      
      configPane.add(passLabel)
      configPane.add(passText, "grow,span")
      configPane.add(tableLabel)
      configPane.add(tableText, "grow,span")
      configPane.add(rightSizingLabel)
      configPane.add(rightSizingCB, "grow, span")
      
      configPane.add(ignoreNullsLabel)
      configPane.add(ignoreNullsCB, "grow, span")
      
      configPane.add(stringRangeLabel)
      configPane.add(stringMinText)
      configPane.add(stringLengthSlider, "grow")
      configPane.add(stringMaxText, "span")
      
      stringLengthSlider.setShowTickMarks(true)
      stringLengthSlider.setShowTickLabels(true)
      stringLengthSlider.setBlockIncrement(500)
      stringLengthSlider.setMajorTickUnit(500)
      stringLengthSlider.setMinorTickCount(5)
      stringLengthSlider.setSnapToTicks(true)
      stringLengthSlider.setLowValue(stringMinText.getText() as Integer)
      stringLengthSlider.setHighValue(stringMaxText.getText() as Integer)
      
      stringLengthSlider.setOnMouseDragged({ MouseEvent event ->
        stringMinText.setText((stringLengthSlider.getLowValue() as Integer) as String)
        stringMaxText.setText((stringLengthSlider.getHighValue() as Integer) as String)
      })
      
      stringLengthSlider.setOnKeyPressed({ KeyEvent event ->
        stringMinText.setText((stringLengthSlider.getLowValue() as Integer) as String)
        stringMaxText.setText((stringLengthSlider.getHighValue() as Integer) as String)
      })
      
      stringMinText.setOnAction(
          {ActionEvent event ->
            stringLengthSlider.setLowValue(stringMinText.getText() as Double) })
      
      stringMaxText.setOnAction(
          {ActionEvent event ->
            stringLengthSlider.setHighValue(stringMaxText.getText() as Double) })
      
      configPane.add(strictLabel)
      configPane.add(strictCB, "grow, span")
      configPane.add(batchLabel, "")
      configPane.add(batchCB, "grow, span")
      configPane.add(testButton, "span")
      
      testButton.setOnAction({ ActionEvent event -> connect(event) })
      dbCB.getSelectionModel().selectedIndexProperty().addListener({ ObservableValue observable, Object oldValue, Object newValue ->
        selectDb(observable, oldValue, newValue) } as ChangeListener )
    }
    
    return configPane
  }
  
  public connect(ActionEvent evt)
  {
    try
    {
      DexEnvironment env = DexEnvironment.getInstance()
      def con = Sql.newInstance(env.interpolate(urlText.getText()), env.interpolate(userText.getText()),
          env.interpolate(passText.getText()), env.interpolate(driverText.getText()))
      ModalDialog dialog = new ModalDialog(stage, "Connection Status", "Connection successful!", "Ok")
    }
    catch(Exception ex)
    {
      StringWriter sw = new StringWriter()
      ex.printStackTrace(new PrintWriter(sw))
      ModalDialog dialog = new ModalDialog(stage, "Connection Status", sw.toString(), "Ok")
      ex.printStackTrace()
    }
  }
  
  public void selectDb(ObservableValue<? extends Object> ov,
      Object objOld, Object objNew)
  {
    String selected = "${dbCB.getItems().get(objNew)}"
    println "Selected DB: '$selected'"
    if (dbConfig.containsKey(selected))
    {
      driverText.setText(dbConfig[selected]["driver"])
      urlText.setText(dbConfig[selected]["url"])
      userText.setText(dbConfig[selected]["user"])
      passText.setText(dbConfig[selected]["password"])
    }
    else
    {
      driverText.setText(dbConfig["HyperSql"]["driver"])
      urlText.setText(dbConfig["HyperSql"]["url"])
      userText.setText(dbConfig["HyperSql"]["user"])
      passText.setText(dbConfig["HyperSql"]["password"])
    }
  }
}
