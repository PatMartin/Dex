package com.dexvis.dex.task.input

import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.image.Image
import javafx.stage.FileChooser

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
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

      Button browseButton = new Button("Browse")

      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      configPane.add(browseButton, "span")

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

      File loadFile

      try {
        fc.setInitialDirectory(startDir)
        loadFile = fc.showOpenDialog(null)
      }
      catch (Exception ex) {
        fc.setInitialDirectory(new File(System.getProperty("user.dir")));
        loadFile = fc.showOpenDialog(null);
      }

      if (loadFile != null) {
        fileText.setText(loadFile.getAbsolutePath())
        lastDir = loadFile.getParent()
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
}
