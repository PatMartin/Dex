package com.dexvis.dex.task.input

import javafx.beans.value.ChangeListener
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.CheckBox
import javafx.scene.control.Label
import javafx.scene.control.TextField

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import au.com.bytecode.opencsv.CSVReader

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class ReadCsv extends DexTask {
  public ReadCsv() {
    super("Input", "Read CSV", "input/ReadCsv.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  private MigPane configPane = null
  
  private Label effectiveFileLabel = new Label("Effective File Name: ")
  private Label effectiveFile = new Label("")
  private Label fileLabel = new Label("File Name:")
  
  @Element(required=false)
  private TextField fileText = new TextField()
  
  private DexFileChooser csvChooser = new DexFileChooser("data",
    "Read CSV", "Read CSV", "CSV", "csv", fileText)
  
  private Label rowLimitLabel = new Label("Limit Number Of Rows:")
  
  @Element(required=false)
  private CheckBox limitRows = new CheckBox()
  
  @Element(required=false)
  private TextField rowLimitText = new TextField("0")
  
  @Element(name="lastDir", required=false)
  private String lastDir = ""
  
  DexEnvironment env = DexEnvironment.getInstance()

  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    CSVReader reader = new CSVReader(new FileReader(new File(
        env.interpolate(fileText.getText()))))
    
    state.dexData.header = reader.readNext().collect
    { it }
    state.dexData.data = []
    
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
    
    while (((row = reader.readNext()) != null) && ((limit == false) || (limit && rowNum < rowLimit))) {
      state.dexData.data << row.collect() { it }
      rowNum++;
    }
    return state
  }
  
  public Node getConfig() {
    if (configPane == null) {
      configPane = new MigPane("", "[][grow][]", "[][][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      Button browseButton = new Button("Browse")
      
      configPane.add(NodeFactory.createTitle("Read CSV Configuration"), "grow,span")
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow,span")
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      configPane.add(browseButton, "span")
      configPane.add(rowLimitLabel)
      configPane.add(rowLimitText, "grow")
      configPane.add(limitRows, "span")
      browseButton.setOnAction({ action -> csvChooser.setTextPath(action)})

      fileText.textProperty().addListener((ChangeListener){obj, oldVal, newVal ->
        effectiveFile.setText(env.interpolate(fileText.getText()))
      })
    }
    
    return configPane
  }
}
