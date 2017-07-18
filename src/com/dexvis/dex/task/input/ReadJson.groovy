package com.dexvis.dex.task.input

import javafx.beans.value.ChangeListener
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField

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
  
  @Element(name="lastDir", required=false)
  private String lastDir = ""
  
  DexEnvironment env = DexEnvironment.getInstance()

  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"

    String jsonStr = FileUtils.readFileToString(new File(fileText.getText()), "UTF-8");
    List<NVP> nvpList = JsonUtil.parseNVPList("root", jsonStr);

    state.dexData.header = [ "NAME", "VALUE" ]
    state.dexData.data = []
    nvpList.each {
      nvp ->
      state.dexData.data << [ nvp.getName(), nvp.getValue() ]
    }
    
    return state
  }
  
  List<List<String>> parseData(List<List<String>> data, Object obj) {
    if (obj != null) {
      println "TYPE: ${obj.getClass().getSimpleName()}"
    }
    return data;
  }
  
  public Node getConfig() {
    if (configPane == null) {
      configPane = new MigPane("", "[][grow][]", "[][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      Button browseButton = new Button("Browse")
      
      configPane.add(NodeFactory.createTitle("Read JSON Configuration"), "grow,span")
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow,span")
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      jsonChooser.setFileText(fileText);
      configPane.add(browseButton, "span")

      browseButton.setOnAction({ action -> jsonChooser.setTextPath(action)})

      fileText.textProperty().addListener((ChangeListener){obj, oldVal, newVal ->
        effectiveFile.setText(env.interpolate(fileText.getText()))
      })
    }
    
    return configPane
  }
}
