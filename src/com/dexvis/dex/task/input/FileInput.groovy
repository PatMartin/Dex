package com.dexvis.dex.task.input

import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class FileInput extends DexTask {
  public FileInput() {
    super("Input", "File Input", "input/FileInput.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  private MigPane configPane = null
  
  private Label fileLabel = new Label("File Name:")
  
  @Element(required=false)
  private String lastDir = ""
  
  @Element(required=false)
  TextField fileText = new TextField("")
  
  private DexFileChooser fileChooser = new DexFileChooser("data",
    "Read File", "Read File", "ANY", "*")

  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    FileInputStream inputFile = new FileInputStream(fileText.getText())
    ArrayList<String> lines = inputFile.text.split('\n')
    lines = lines.collect
    { it.trim() }
    
    state.dexData.header = ["NUM", "LINE"]
    state.dexData.data = []
    
    int lineNum = 1
    
    lines.each { line ->
      if ((lineNum%10000) == 0) {
        updateMessage("Reading line number ${lineNum}")
      }
      
      state.dexData.data.add([(lineNum++).toString(), line])
    }
    
    return state
  }
  
  public Node getConfig() {
    if (configPane == null) {
      configPane = new MigPane("", "[][grow][]", "[][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("File Input Configuration"), "grow,span")
      
      fileChooser.setFileText(fileText);
      
      Button browseButton = new Button("Browse")
      
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      configPane.add(browseButton, "span")
      
      browseButton.setOnAction({ event -> fileChooser.setTextPath(event) })
    }
    
    return configPane
  }
}
