package com.dexvis.dex.task.database

import java.io.File
import java.io.InputStream
import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.ResultSetMetaData
import java.sql.SQLException;
import java.sql.Statement
import java.util.List

import javafx.beans.property.SimpleStringProperty
import javafx.beans.property.StringProperty
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.event.ActionEvent
import javafx.scene.control.Button
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.image.Image
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.event.ReflectiveChangeListener
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor

@Root
class QueryJdbc extends DexTask {
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  @Element(name="sqlScript", required=false)
  private StringProperty sqlScript = new SimpleStringProperty("SELECT * FROM CSV;")
  
  private MigPane configPane = null
  
  @Element(name="dbtype", required=false)
  private ChoiceBox dbCB = new ChoiceBox(FXCollections.observableArrayList("HyperSql", "Oracle", "MySql", "Sqlite"))
  
  private Label driverLabel = new Label("Driver:")
  private Label urlLabel = new Label("Url:")
  private Label passLabel = new Label("Password:")
  private Label userLabel = new Label("Username:")
  
  @Element(name="driver", required=false)
  private TextField driverText = new TextField("org.hsqldb.jdbc.JDBCDriver")
  @Element(name="url", required=false)
  private TextField urlText = new TextField("jdbc:hsqldb:mem:csvdb")
  @Element(name="password", required=false)
  private TextField passText = new TextField("")
  @Element(name="username", required=false)
  private TextField userText = new TextField("sa")
  
  private CodeMirrorEditor editor = null;
  
  private DexFileChooser sqlChooser = new DexFileChooser("sql",
  "Load Sql Script", "Save Sql Script", "SQL", "sql")
  
  public QueryJdbc() {
    super("Database", "Query Jdbc", "database/QueryJdbc.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    DexEnvironment env = DexEnvironment.getInstance()
    
    def List<String> header=[]
    def List<List<String>> data=[]
    
    Class.forName(env.interpolate(driverText.getText()))
    updateMessage("Connecting to database")
    
    Connection con = DriverManager.getConnection(env.interpolate(urlText.getText()), env.interpolate(userText.getText()),
        env.interpolate(passText.getText()))
    
    Statement stmt = null;
    def row
    
    updateProgress(-1.0, -1.0)
    
    try {
      updateMessage("Executing query")
      
      stmt = con.createStatement()
      stmt.setFetchSize(1000)
      
      String query = env.interpolate(sqlScript.getValue())
      query = query.replaceAll('[;\\s]*$', "");
      println "QUERY: '${query}'"
      
      ResultSet rs = stmt.executeQuery(query)
      
      ResultSetMetaData md = rs.getMetaData();
      
      for (i in 0..<md.columnCount) {
        header << md.getColumnLabel(i+1)
      }
      //println "HEADER: ${header}"
      
      int ri = 1;
      
      while (rs.next())
      {
        row = []
        header.each
        { h ->
          row << rs.getString(h)
        }
        //println "ROW: ${row}"
        if (ri%1000 == 0)
        {
          updateMessage("Reading row ${ri}")
        }
        ri++;
        data << row
      }
      
      state.dexData.header = header
      state.dexData.data = data
      //println "STATE: ${state.dexData}"
    }
    catch (SQLException sqlEx)
    {
      sqlEx.printStackTrace()
      println "SQL Error Code: ${sqlEx.getErrorCode()}"
      println "SQL Message   : ${sqlEx.getMessage()}"
      println "SQL State     : ${sqlEx.getSQLState()}"
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
    return state
  }
  
  public javafx.scene.Node getConfig()
  {
    if (configPane == null)
    {
      def bindings = [
        'mode'     : 'sql',
        'mime'     : 'text/x-mysql',
        'theme'    : 'eclipse'
      ]
      editor = new CodeMirrorEditor(we, bindings, sqlScript)
      
      if (!dbCB.getValue())
      {
        dbCB.setValue("HyperSql")
      }
      configPane = new MigPane("", "[][grow]", "[][][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      Button loadButton = new Button("Load Sql")
      loadButton.setOnAction(new ReflectiveActionEventHandler(this, "load"))
      
      Button saveButton = new Button("Save Sql")
      saveButton.setOnAction(new ReflectiveActionEventHandler(this, "save"))
      
      dbCB.getSelectionModel().selectedIndexProperty().addListener(new ReflectiveChangeListener(this, "selectDb"))
      
      configPane.add(NodeFactory.createTitle("JDBC Database Query Configuration"), "grow,span")
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
      
      configPane.add(wv, "align left,span,grow")
      
      configPane.add(loadButton, "")
      configPane.add(saveButton, "span")
    }
    
    return configPane
  }
  
  public load(ActionEvent evt)
  {
    try
    {
      File loadFile = sqlChooser.load(evt)
      
      if (loadFile != null)
      {
        // Automatically updates sqlScript
        editor.setEditorContent(FileUtils.readFileToString(loadFile))
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
  
  public save(ActionEvent evt)
  {
    try
    {
      File saveFile = sqlChooser.save(evt)
      
      if (saveFile != null)
      {
        FileUtils.writeStringToFile(saveFile, sqlScript.getValue())
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
  
  public void selectDb(ObservableValue<? extends Object> ov,
      Object objOld, Object objNew)
  {
    String selected = "${dbCB.getItems().get(objNew)}"
    if (selected == "Oracle")
    {
      driverText.setText("oracle.jdbc.OracleDriver")
      urlText.setText("jdbc:oracle:thin:@localhost:1521:XE")
      userText.setText("DEX")
      passText.setText("DEX")
    }
    else if (selected == "MySql")
    {
      driverText.setText("com.mysql.jdbc.Driver")
      urlText.setText("jdbc:mysql://localhost:3306/vote")
      userText.setText("DEX")
      passText.setText("DEX")
    }
    else if (selected == "Sqlite")
    {
      driverText.setText("org.sqlite.JDBC")
      urlText.setText("jdbc:sqlite:dex.db")
      userText.setText("DEX")
      passText.setText("DEX")
    }
    else
    {
      driverText.setText("org.hsqldb.jdbc.JDBCDriver")
      urlText.setText("jdbc:hsqldb:mem:csvdb")
      userText.setText("DEX")
      passText.setText("DEX")
    }
  }
}
