package com.dexvis.dex.task.input

import javafx.collections.FXCollections
import javafx.collections.ObservableList
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.ListView
import javafx.scene.input.KeyCode
import javafx.stage.FileChooser

import org.simpleframework.xml.Element
import org.simpleframework.xml.ElementList
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class MultiFileInput extends DexTask {
  @Element(name="start-dir", required=false)
  String startDir = "data"
  
  public MultiFileInput() {
    super("Input", "Multi File Input", "input/MultiFileInput.html")
  }
  
  private MigPane configPane = null
  
  @ElementList(name = "fileList", inline = true, required = false)
  private ObservableList<String> fileList     = FXCollections
  .observableArrayList()
  
  private ListView<String> fileListView = new ListView<String>(fileList)
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    state.dexData.header = ["NUM", "FILE", "LINE"]
    state.dexData.data = []
    
    fileList.each { file ->
      
      FileInputStream inputFile = new FileInputStream(file)
      ArrayList<String> lines = inputFile.text.split('\n')
      
      lines = lines.collect{ it.trim() }
      
      int lineNum = 1
      
      lines.each { line ->
        state.dexData.data.add([(lineNum++).toString(), file, line])
      }
    }
    
    return state
  }
  
  public Node getConfig() {
    if (configPane == null) {
      configPane = new MigPane("", "[grow]", "[][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      Button browseButton = new Button("Browse")
      
      fileListView = new ListView<String>(fileList)
      fileListView.setItems(fileList)
      
      configPane.add(NodeFactory.createTitle("Multiple File Input"), "grow,span")
      configPane.add(fileListView, "grow,span")
      configPane.add(browseButton, "span")
      
      browseButton.setOnAction({action -> open(action)})
      fileListView.setOnKeyPressed({ evt ->
        if (evt.getCode().equals(KeyCode.DELETE)) {
          //System.out.println("DELETING...")
          int removeIndex = fileListView.getSelectionModel().getSelectedIndex();
          if (removeIndex >= 0)
          {
            fileList.remove(removeIndex)
          }
        }
        else {
          System.out.println("Ignoring keypress")
        }
      })
    }
    
    return configPane
  }
  
  public void open(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load Files")
      
      File startDirFile = new File(new File(startDir).getCanonicalPath())
      fc.setInitialDirectory(startDirFile)
      
      List<File> loadFiles = fc.showOpenMultipleDialog(null)
      
      String userDir = System.getProperty("user.dir")
      
      if (loadFiles && loadFiles.size() > 0) {
        
        for (File file : loadFiles) {
          String filePath = file.getAbsolutePath()
          
          if (userDir != null && userDir.length() > 0 && filePath.startsWith(userDir)) {
            // Including the file separator.
            filePath = filePath.substring(userDir.length() + File.separator.length());
          }
          
          fileList.add(filePath)
        }
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
}
