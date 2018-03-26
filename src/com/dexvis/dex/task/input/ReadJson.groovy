package com.dexvis.dex.task.input

import javafx.beans.value.ChangeListener
import javafx.collections.FXCollections
import javafx.scene.control.Button
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.Node

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.datastruct.NVP
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.JsonUtil

@Root
class ReadJson extends DexTask {
  public ReadJson() {
    super("Input", "Read JSON", "input/ReadJson.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  private MigPane configPane = null
  
  private Label effectiveFileLabel = new Label("Effective File Name: ")
  private Label effectiveFile = new Label("")
  private Label fileLabel = new Label("File Name:")
  
  @Element(required=false)
  private TextField fileText = new TextField()
  
  private DexFileChooser jsonChooser = new DexFileChooser("data",
  "Read JSON", "Read JSON", "JSON", "json")
  
  @Element(name="format", required=false)
  private ChoiceBox formatCB = new ChoiceBox(FXCollections.observableArrayList("Tabular", "NVP"));
  
  @Element(name="lastDir", required=false)
  private String lastDir = ""
  
  DexEnvironment env = DexEnvironment.getInstance()
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    // Free any memory invested in pipeline since we'll overwrite it anyhow.
    state.dexData.header = []
    state.dexData.data = []
    
    def selectedFormat = formatCB.getSelectionModel().getSelectedItem()
    
    String jsonStr = FileUtils.readFileToString(new File(fileText.getText()), "UTF-8");
    
    switch (selectedFormat) {
      case "NVP":
        List<NVP> nvpList = JsonUtil.parseNVPList("root", jsonStr);
      
        state.dexData.header = ["NAME", "VALUE"]
      
        nvpList.each { nvp ->
          state.dexData.data << [nvp.getName(), nvp.getValue()]
        }
        break;
        case "Tabular" :
          List<Map<String, String>> list = JsonUtil.parseTabular(jsonStr);
          if (list != null && list.size() > 0) {
            state.dexData.header = list[0].keySet().collect { return "${it}" }
            state.dexData.data = []
            
            list.eachWithIndex {
              objMap, ri ->
              def row = []
              state.dexData.header.eachWithIndex {
                hdr, hi ->
                row << "${objMap[hdr]}"
              }
              state.dexData.data << row
            }
          }
          break;
    }

    return state
  }
  
  public Node getConfig() {
    if (configPane == null) {
      configPane = new MigPane("", "[][grow][]", "[][][][]")
      configPane.setStyle("-fx-background-color: white;")
      Label formatLabel = new Label("Format:")
      
      Button browseButton = new Button("Browse")
      
      // If not previously selected, select the first element by default: "Tabular"
      if (formatCB.getSelectionModel().getSelectedIndex() < 0) {
        formatCB.getSelectionModel().select(0)
      }
      
      configPane.add(NodeFactory.createTitle("Read JSON Configuration"), "grow,span")
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow,span")
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      jsonChooser.setFileText(fileText);
      configPane.add(browseButton, "span")
      
      browseButton.setOnAction({ action -> jsonChooser.setTextPath(action)})
      
      configPane.add(formatLabel)
      configPane.add(formatCB, "span")
      
      fileText.textProperty().addListener((ChangeListener){obj, oldVal, newVal ->
        effectiveFile.setText(env.interpolate(fileText.getText()))
      })
    }
    
    return configPane
  }
}
