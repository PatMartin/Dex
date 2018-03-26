package com.dexvis.dex.task.output

import javafx.beans.value.ChangeListener
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class WriteJson extends DexTask {
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
  
  private DexFileChooser jsonChooser = new DexFileChooser("data",
  "Write JSON", "Write JSON", "JSON", "json")
  
  public WriteJson() {
    super("Output", "Write JSON", "output/WriteJson.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    def effFileName = env.interpolate(outputFileText.getText())
    updateMessage("Writing: ${effFileName}")
    def rowsToWrite = state.dexData.data.size();
    
    updateProgress(0, rowsToWrite)
    new File(effFileName).withWriter { out ->
      out.writeLine("[")
      state.dexData.data.eachWithIndex { row, ri ->
        out.write("{" + state.dexData.header.withIndex().collect { hdr, hi -> return "\"${hdr}\":\"${row[hi]}\"" }.join(",") + "}")
        if (ri < (rowsToWrite-1)) {
          out.writeLine(",")
        }
        else {
          out.writeLine("")
        }
        if ((ri+1) % 1000 == 0) {
          updateMessage("Writing row ${ri+1} of ${rowsToWrite}")
          updateProgress(ri+1, rowsToWrite)
        }
      }
      out.writeLine("]")
    }
    
    updateMessage("Wrote ${state.dexData.data.size()} rows of " +
        "${state.dexData.header.size()} columns to ${effFileName}")
    
    return state
  }
  
  public Node getConfig() {
    if (configPane == null) {
      configPane = new MigPane("", "[][grow][]", "[][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Write JSON"), "grow,span")
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow,span")
      configPane.add(outputFileLabel)
      configPane.add(outputFileText, "grow")
      configPane.add(browseButton, "span")
      
      jsonChooser.setFileText(outputFileText);
      
      browseButton.setOnAction({ action -> jsonChooser.setTextPath(action)})
      
      outputFileText.textProperty().addListener((ChangeListener){obj, oldVal, newVal ->
        effectiveFile.setText(env.interpolate(outputFileText.getText()))
      })
    }
    
    return configPane
  }
}
