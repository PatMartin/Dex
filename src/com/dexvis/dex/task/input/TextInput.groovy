package com.dexvis.dex.task.input

import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.TextArea
import javafx.scene.image.Image
import javafx.stage.FileChooser

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="text-input")
class TextInput extends DexTask
{
  public TextInput()
  {
    super("Input", "Text Input", "input/TextInput.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }

  private MigPane configPane = null

  @Element(required=false)
  private TextArea inputText = new TextArea("Enter text here...")

  public DexTaskState initialize(DexTaskState state) throws DexException
  {
    return execute(state)
  }

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    state.dexData.header = ["NUM", "LINE"]
    state.dexData.data = []
    
    def lines = inputText.text.split("\n").toList()
    
    lines.eachWithIndex
    {
      line, i -> state.dexData.data.add([ i+1, line ])
    }
    
    return state
  }

  public Node getConfig()
  {

    if (configPane == null)
    {
      configPane = new MigPane("", "[][grow]", "[][grow][]")
      configPane.setStyle("-fx-background-color: white;")

      Button loadButton = new Button("Load Text")
      loadButton.setOnAction(new ReflectiveActionEventHandler(this, "load"))

      Button saveButton = new Button("Save Text")
      saveButton.setOnAction(new ReflectiveActionEventHandler(this, "save"))

      configPane.add(NodeFactory.createTitle("Text Input Configuration"), "grow,span")
      configPane.add(inputText, "span, grow")

      configPane.add(loadButton)
      configPane.add(saveButton, "span")
    }

    return configPane
  }

  public load(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load Text File")

      File startDir = new File(new File(".").getCanonicalPath())
      fc.setInitialDirectory(startDir)

      File loadFile = fc.showOpenDialog(null)

      if (loadFile != null)
      {
        inputText.setText(FileUtils.readFileToString(loadFile))
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public save(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Save Text File")

      File startDir = new File(new File(".").getCanonicalPath())
      fc.setInitialDirectory(startDir)

      File loadFile = fc.showSaveDialog(null)

      if (loadFile != null)
      {
        FileUtils.writeStringToFile(loadFile, inputText.getText())
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
}
