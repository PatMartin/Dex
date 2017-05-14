package com.dexvis.dex.task.output

import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.image.Image
import javafx.stage.FileChooser
import javafx.stage.FileChooser.ExtensionFilter

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class WriteCsv extends DexTask {
  private DexEnvironment env = DexEnvironment.getInstance()
  
  
  private MigPane configPane = null
  
  private Label outputFileLabel = new Label("Output File Name:")
  
  @Element(required=false)
  private TextField outputFileText = new TextField()
  
  @Element(name="lastDir", required=false)
  private String lastDir = ""
  
  private Label effectiveFileLabel = new Label("Effective File Name:")
  private Label effectiveFile = new Label("" + env.interpolate(outputFileText.getText()))
  
  Button browseButton = new Button("Browse")
  
  public WriteCsv() {
    super("Output", "Write CSV", "output/WriteCsv.html")
    effectiveFile.setText(env.interpolate(outputFileText.getText()));
  }
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    def effFileName = env.interpolate(outputFileText.getText())
    updateMessage("Writing: ${effFileName}")
    def rowsToWrite = state.dexData.data.size();
    
    updateProgress(0, rowsToWrite)
    new File(effFileName).withWriter { out ->
      out.writeLine(state.dexData.header.collect()
          { h -> "\"$h\"" }.join(",") )
      state.dexData.data.eachWithIndex { row, ri ->
        out.writeLine(row.collect()
            { r -> "\"$r\"" }.join(","))
        if ((ri+1) % 1000 == 0) {
          updateMessage("Writing row ${ri+1} of ${rowsToWrite}")
          updateProgress(ri+1, rowsToWrite)
        }
      }
    }
    
    updateMessage("Wrote ${state.dexData.data.size()} rows of " +
        "${state.dexData.header.size()} columns to ${effFileName}")
    
    return state
  }
  
  public Node getConfig() {
    if (configPane == null) {
      configPane = new MigPane("", "[][grow][]", "[][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Write CSV Configuration"), "grow,span")
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow,span")
      configPane.add(outputFileLabel)
      configPane.add(outputFileText, "grow")
      configPane.add(browseButton, "span")
      
      outputFileText.onKeyReleased = { event ->
        effectiveFile.setText(env.interpolate(outputFileText.getText()))
      }
      browseButton.setOnAction(new ReflectiveActionEventHandler(this, "open"))
    }
    
    return configPane
  }
  
  public void open(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load Data File")
      
      File startDir
      
      try {
        if (lastDir != null && lastDir.length() > 0) {
          startDir = new File(new File(lastDir).getCanonicalPath())
        }
        else {
          startDir = new File(new File("data").getCanonicalPath())
        }
      }
      catch (Exception ex) {
        startDir = new File(new File("data").getCanonicalPath())
      }
      
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("CSV", "*.csv"))
      
      File loadFile = fc.showOpenDialog(null)
      
      if (loadFile != null) {
        effectiveFile.setText(loadFile.getAbsolutePath())
        
        String filePath = loadFile.getAbsolutePath()
        String userDir = System.getProperty("user.dir")
        
        if (userDir != null && userDir.length() > 0 && filePath.startsWith(userDir)) {
          // Including the file separator.
          filePath = filePath.substring(userDir.length() + File.separator.length());
        }
        
        outputFileText.setText(filePath)
        lastDir = loadFile.getParent()
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
}
