package com.dexvis.dex.task.input

import javafx.application.Platform
import javafx.beans.value.ChangeListener
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.CheckBox
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.io.RegexFilterReader
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.WebViewUtil
import com.opencsv.CSVReader

@Root
class ReadCsv extends DexTask {
  public ReadCsv() {
    super("Input", "Read CSV", "input/ReadCsv.html")
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
  private CheckBox limitRowsCB = new CheckBox()
  
  @Element(required=false)
  private CheckBox filterCB = new CheckBox()
  
  @Element(required=false)
  private TextField rowLimitText = new TextField("0")
  
  @Element(name="filter",required=false)
  private TextField filterText = new TextField("")
  
  @Element(name="lastDir", required=false)
  private String lastDir = ""
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    // Free any memory invested in pipeline since we'll overwrite it anyhow.
    state.dexData.header = []
    state.dexData.data = []
    
    def filePath = env.interpolate(fileText.getText())
    updateProgress(-1.0, -1.0)
    
    updateMessage("Reading Csv: '${filePath}'")
    
    Reader fileReader = null;
    // Filter or file reader
    if (filterCB.isSelected()) {
      def baseReader = new FileReader(new File(env.interpolate(fileText.getText())))
      fileReader = new RegexFilterReader(baseReader, filterText.getText())
    }
    else {
      fileReader = new FileReader(new File(env.interpolate(fileText.getText())))
    }
    CSVReader reader = new CSVReader(fileReader)
    
    state.dexData.header = reader.readNext().collect { it }
    
    List<String> row
    
    boolean limit = limitRowsCB.isSelected()
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
    while (((row = reader.readNext()) != null) && ((limit == false) || (limit && rowNum < rowLimit))) {
      state.dexData.data << row.collect() { it }
      rowNum++;
      if (rowNum % 100000 == 0) {
        updateMessage("Read: ${rowNum} rows")
        if (showpreview) {
          showpreview = false
          
          // Enough data loaded to preview, do it in the background while still loading
          Platform.runLater {
            try {
              def preview = state.dexData.head((limit && rowLimit < 100) ? rowLimit : 100)
              def previewState = new DexTaskState(preview)
              
              WebViewUtil.displayGroovyTemplate(we, "web/dexjs/grid/JqGrid.gtmpl", [
                "state": previewState,
                "dexData":preview,
                "data": preview.data,
                "header":preview.header,
                "basedir" : (new File(".")).toURI().toURL().toExternalForm(),
                "options":[:]])
            } catch (Exception ex) {
              ex.printStackTrace()
            }
          }
        }
      }
    }
    
    if (showpreview) {
      showpreview = false
      
      // Enough data loaded to preview, do it in the background while still loading
      Platform.runLater {
        try {
          def preview = state.dexData.head((limit && rowLimit < 100) ? rowLimit : 100)
          def previewState = new DexTaskState(preview)
          
          WebViewUtil.displayGroovyTemplate(we, "web/dexjs/grid/JqGrid.gtmpl", [
            "state": previewState,
            "dexData":preview,
            "data": preview.data,
            "header":preview.header,
            "basedir" : (new File(".")).toURI().toURL().toExternalForm(),
            "options":[:]])
        } catch (Exception ex) {
          ex.printStackTrace()
        }
      }
    }

    setFinalMessage("Read: ${rowNum} rows");
    return state
  }
  
  public Node getConfig() {
    if (configPane == null) {
      Label filterLabel = new Label("Filter Expression:")
      configPane = new MigPane("", "[][grow][]", "[][][][][][grow]")
      configPane.setStyle("-fx-background-color: white;")
      WebViewUtil.noData(we)
      
      Button browseButton = new Button("Browse")
      
      configPane.add(NodeFactory.createTitle("Read CSV Configuration"), "grow,span")
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow,span")
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      csvChooser.setFileText(fileText);
      configPane.add(browseButton, "span")
      configPane.add(rowLimitLabel)
      configPane.add(rowLimitText, "grow")
      configPane.add(limitRowsCB, "span")
      
      configPane.add(filterLabel)
      configPane.add(filterText, "grow")
      configPane.add(filterCB, "span")
      
      configPane.add(wv, "grow,span")
      
      browseButton.setOnAction({ action -> csvChooser.setTextPath(action)})
      
      fileText.textProperty().addListener((ChangeListener){obj, oldVal, newVal ->
        effectiveFile.setText(env.interpolate(fileText.getText()))
      })
    }
    
    return configPane
  }
}
