package com.dexvis.dex.task.input

import groovy.sql.Sql

import java.sql.Connection
import java.sql.DriverManager
import java.sql.PreparedStatement
import java.sql.Statement
import java.text.DateFormat

import javafx.application.Platform
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
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.controlsfx.control.RangeSlider
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.db.JdbcTable
import com.dexvis.dex.DexConfig
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.io.RegexFilterReader
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.ModalDialog
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.DateUtil
import com.dexvis.util.WebViewUtil
import com.opencsv.CSVReader

@Root
class Csv2Db extends DexTask {
  public Csv2Db() {
    super("Input", "CSV to DB", "input/Csv2Db.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  private DexEnvironment env = DexEnvironment.getInstance()
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private MigPane configPane = null
  
  private Label effectiveFileLabel = new Label("Effective File Name: ")
  private Label effectiveFile = new Label("")
  private Label fileLabel = new Label("File Name:")
  
  @Element(required=false)
  private TextField fileText = new TextField()
  
  private DexFileChooser csvChooser = new DexFileChooser("data",
  "Read CSV", "Read CSV", "CSV", "csv")
  
  private Label rowLimitLabel = new Label("Limit Number Of Rows:")
  
  @Element(required=false)
  private CheckBox limitRows = new CheckBox()
  
  @Element(required=false)
  private CheckBox filterCB = new CheckBox()
  
  @Element(required=false)
  private TextField rowLimitText = new TextField("0")
  
  @Element(name="filter",required=false)
  private TextField filterText = new TextField("")
  
  @Element(name="lastDir", required=false)
  private String lastDir = ""
  
  // Database controls
  @Element(name="dbtype", required=false)
  private ChoiceBox dbCB = new ChoiceBox(FXCollections.observableArrayList(DexConfig.getMap("databases").keySet()))
  
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
  
  private RangeSlider stringLengthSlider = new RangeSlider(0, 4000, 16, 256)
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    // Free any memory invested in pipeline since we'll overwrite it anyhow.
    state.dexData.header = []
    state.dexData.data = []
    
    def dbConfig = DexConfig.getDatabase((String) dbCB.getSelectionModel().getSelectedItem());
    def filePath = env.interpolate(fileText.getText())
    updateProgress(-1.0, -1.0)
    
    updateMessage("Reading Csv: '${filePath}'")
    
    Reader fileReader = null;
    // Filter or file reader
    if (filterCB.isSelected()) {
      def baseReader = new FileReader(new File(env.interpolate(fileText.getText())))
      fileReader = new RegexFilterReader(baseReader, filterText.getText(), true)
    }
    else {
      fileReader = new FileReader(new File(env.interpolate(fileText.getText())))
    }
    CSVReader reader = new CSVReader(fileReader)
    
    state.dexData.header = reader.readNext().collect { it }
    
    List<String> row
    
    boolean limit = limitRows.isSelected()
    int rowLimit = Integer.MAX_VALUE
    
    try {
      if (limit) {
        rowLimit = Integer.parseInt(rowLimitText.getText())
      }
    }
    catch (Exception ex) {
      limit = false
    }
    
    int rowNum = 0;
    
    def showpreview = true
    def table = new JdbcTable(
        dbCB.getSelectionModel().getSelectedItem() as String,
        driverText.getText(),
        urlText.getText(),
        userText.getText(),
        passText.getText(),
        tableText.getText());
    
    table.setStrictTypes(strictCB.isSelected())
    table.setMaxStringSize((int)stringLengthSlider.getHighValue())
    
    while (((row = reader.readNext()) != null) && ((limit == false) || (limit && rowNum < rowLimit))) {
      state.dexData.data << row.collect() { it }
      rowNum++;
      
      if (rowNum % 1000 == 0) {
        updateMessage("Read: ${rowNum} rows")
        
        table.append(state.dexData)
        
        // Display first 100 rows in browser
        if (showpreview) {
          showpreview = false
          
          def preview = state.dexData.head(100)
          def previewState = new DexTaskState(preview)
          
          // Enough data loaded to preview, do it in the background while still loading
          Platform.runLater {
            try {
              WebViewUtil.displayGroovyTemplate(we, "template/internal/tasks/input/Csv2Db.gtmpl", [
                "state": previewState,
                "dexData":preview,
                "data": preview.data,
                "header":preview.header,
                "errors":table.getErrorCount(),
                "rows":table.getRowCount(),
                "types":table.getColumnTypes(),
                "columnNames":table.getColumnNames(),
                "dbTypes":table.getDbTypes(),
                "basedir" : (new File(".")).toURI().toURL().toExternalForm(),
                "options":[:]])
            }
            catch (Exception ex) {
              ex.printStackTrace()
            }
          }
        }
        
        state.dexData.data = []
      }
    }
    
    if (state.dexData.data.size() > 0) {
      table.append(state.dexData);
    }
    
    if (showpreview) {
      showpreview = false
      
      // Enough data loaded to preview, do it in the background while still loading
      Platform.runLater {
        try {
          def preview = state.dexData.head((limit && rowLimit < 100) ? rowLimit : 100)
          def previewState = new DexTaskState(preview)
          
          WebViewUtil.displayGroovyTemplate(we, "template/internal/tasks/input/Csv2Db.gtmpl", [
            "state": previewState,
            "dexData":preview,
            "data": preview.data,
            "header":preview.header,
            "errors":table.getErrorCount(),
            "rows":table.getRowCount(),
            "types":table.getColumnTypes(),
            "columnNames":table.getColumnNames(),
            "dbTypes":table.getDbTypes(),
            "basedir" : (new File(".")).toURI().toURL().toExternalForm(),
            "options":[:]])
        } catch (Exception ex) {
          ex.printStackTrace()
        }
      }
    }
    
    table.close();
    setFinalMessage("Read: ${rowNum} rows");
    state.dexData.header = []
    state.dexData.data = []
    return state
  }
  
  public Node getConfig() {
    if (configPane == null) {
      Label filterLabel = new Label("Filter Expression:")
      configPane = new MigPane("", "[][grow][]", "[][][][][][][][][][][][][][][][grow]")
      configPane.setStyle("-fx-background-color: white;")
      WebViewUtil.noData(we)
      
      Button browseButton = new Button("Browse")
      
      configPane.add(NodeFactory.createTitle("Read CSV to Database"), "grow,span")
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow,span")
      
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      csvChooser.setFileText(fileText);
      configPane.add(browseButton, "span")
      
      configPane.add(rowLimitLabel)
      configPane.add(rowLimitText)
      configPane.add(limitRows, "span")
      
      configPane.add(filterLabel)
      configPane.add(filterText, "grow")
      configPane.add(filterCB, "span")
      
      browseButton.setOnAction({ action -> csvChooser.setTextPath(action)})
      
      fileText.textProperty().addListener((ChangeListener){obj, oldVal, newVal ->
        effectiveFile.setText(env.interpolate(fileText.getText()))
      })
      
      // Database configuration
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
      
      Button testButton = new Button("Test Connection")
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
      
      // Checkboxes
      MigPane cbPane = new MigPane("", "[][][][][][]", "[]")
      cbPane.add(strictLabel)
      cbPane.add(strictCB)
      
      cbPane.add(rightSizingLabel)
      cbPane.add(rightSizingCB)
      
      cbPane.add(ignoreNullsLabel)
      cbPane.add(ignoreNullsCB)
      configPane.add(cbPane, "grow, span");
      
      configPane.add(stringRangeLabel)
      MigPane sliderPane = new MigPane("", "[][grow][]", "[]")
      sliderPane.add(stringMinText, "shrink 50")
      sliderPane.add(stringLengthSlider, "grow")
      sliderPane.add(stringMaxText, "shrink 50")
      configPane.add(sliderPane, "grow, span")
      
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
      
      testButton.setOnAction({ ActionEvent event -> testConnection(event) })
      dbCB.getSelectionModel().selectedIndexProperty().addListener({ ObservableValue observable, Object oldValue, Object newValue ->
        selectDb(observable, oldValue, newValue) } as ChangeListener )
      
      configPane.add(wv, "grow,span")
    }
    
    return configPane
  }
  
  public testConnection(ActionEvent evt)
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
    Map<String, Object> dbConfig = DexConfig.getDatabase(selected)
    
    driverText.setText(dbConfig.driver)
    urlText.setText(dbConfig.url)
    userText.setText(dbConfig.user)
    passText.setText(dbConfig.password)
  }
}
