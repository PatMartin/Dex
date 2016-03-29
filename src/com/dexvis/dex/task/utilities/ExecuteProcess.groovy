package com.dexvis.dex.task.utilities

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextArea
import javafx.scene.control.TextField
import javafx.scene.image.Image
import javafx.stage.FileChooser

import com.dexvis.dex.exception.DexException;
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.scene.control.NodeFactory
import com.sun.glass.ui.CommonDialogs.ExtensionFilter

@Root(name="executeprocess")
class ExecuteProcess extends DexTask
{
  public ExecuteProcess()
  {
    super("Utilities", "Execute Process", "utilities/ExecuteProcess.html")
  }

  private MigPane configPane = null

  private Label cmdLabel = new Label("Command:")

  @Element(name="command", required=false)
  private TextField cmdText = new TextField("cmd /c C:\\tibco\\ems\\6.0\\bin\\tibemsadmin.exe -server tcp://localhost:7222 -user admin -password admin")

  @Element(name="input", required=false)
  private TextArea inputTA = new TextArea("Enter optional command input here...")

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    println "Running: $name = ${cmdText.getText()}"
    DexEnvironment env = DexEnvironment.getInstance()
    
    def c = env.interpolate(cmdText.getText())

    println "CMD: '$c'"
    Process proc = c.execute()

    def writer = new PrintWriter(new BufferedOutputStream(proc.out))

    println "OPTIONAL CMD: ${inputTA.getText()}"
    writer.print(env.interpolate(inputTA.getText()))
    writer.close()

    proc.text.split('\n').eachWithIndex
    { line, i ->
      println "OUTPUT: ${line + 1}"
      state.dexData.data << [i.toString(), line]
    }

    state.dexData.header = ["LINE", "OUTPUT"]

    return state
  }

  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[][grow]", "[][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")

      Button loadButton = new Button("Load Program Input")
      loadButton.setOnAction(new ReflectiveActionEventHandler(this, "loadInput"))

      Button saveButton = new Button("Save Program Input")
      saveButton.setOnAction(new ReflectiveActionEventHandler(this, "saveInput"))

      configPane.add(NodeFactory.createTitle("Execute Process Configuration"), "grow,span")
      configPane.add(cmdLabel)
      configPane.add(cmdText, "span,grow")
      configPane.add(new Label("Optional Program Input:"), "grow,span")
      configPane.add(inputTA, "grow,span")
      configPane.add(loadButton)
      configPane.add(saveButton, "span")
    }

    return configPane
  }

  public loadInput(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load Process Input")

      File startDir = new File(new File("input").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("INPUT", "*.input"))

      File loadFile = fc.showOpenDialog(null)

      if (loadFile != null)
      {
        inputTA.setText(FileUtils.readFileToString(loadFile))
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public saveInput(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Save Input File")

      File startDir = new File(new File("input").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("INPUT", "*.input"))

      File loadFile = fc.showSaveDialog(null)

      if (loadFile != null)
      {
        FileUtils.writeStringToFile(loadFile, inputTA.getText())
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
}
