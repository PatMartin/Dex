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
  
  private DexFileChooser csvChooser = new DexFileChooser("data",
  "Write CSV", "Write CSV", "CSV", "csv", outputFileText)
  
  public WriteCsv() {
    super("Output", "Write CSV", "output/WriteCsv.html")
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
      
      browseButton.setOnAction({ action -> csvChooser.setTextPath(action)})
      
      outputFileText.textProperty().addListener((ChangeListener){obj, oldVal, newVal ->
        effectiveFile.setText(env.interpolate(outputFileText.getText()))
      })
    }
    
    return configPane
  }
}
