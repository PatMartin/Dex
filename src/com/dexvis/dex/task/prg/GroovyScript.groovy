package com.dexvis.dex.task.prg

import javafx.beans.property.SimpleStringProperty
import javafx.beans.property.StringProperty
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.RadioButton
import javafx.scene.control.ToggleGroup
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor

@Root(name="groovyscript")
class GroovyScript extends DexTask {
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()

  private ToggleGroup processByGroup = new ToggleGroup()

  @Element(name="processbytable", required=false)
  private RadioButton processByTableRB = new RadioButton("Table")

  @Element(name="processbyrow", required=false)
  private RadioButton processByRowRB = new RadioButton("Row")

  @Element(name="processbycolumn", required=false)
  private RadioButton processByColumnRB = new RadioButton("Column")

  private DexFileChooser groovyChooser = new DexFileChooser("scripts/groovy",
  "Load Groovy Script", "Save Groovy Script", "GROOVY", "groovy")

  @Element(name="groovyCode", required=false)
  private StringProperty groovyCode = new SimpleStringProperty(
  "// Enter groovy code here...");

  private MigPane configPane = null
  private DexEnvironment env = DexEnvironment.getInstance()

  private CodeMirrorEditor editor = null;

  public GroovyScript() {
    super("Programming", "Groovy Script", "programming/GroovyScript.html")

    // Allows this task to run off the JavaFX Application thread.
    getMetaData().setTaskExecutionUpdatesUI(false)
  }

  public DexTaskState execute(DexTaskState state) throws DexException {
    Binding binding = new Binding()

    def numRows = state.dexData.data.size()

    if (numRows <= 0) {
      numRows = 1;
    }

    // Binding depends on how we are processing.

    // By Table
    if (processByTableRB.isSelected())
    {
      // No idea how long this will take.
      updateProgress(-1.0, -1.0)
      updateMessage("Processing entire table")
      binding.setVariable("dex", state.dexData)
      binding.setVariable("header", state.dexData.header)
      binding.setVariable("data", state.dexData.data)
      binding.setVariable("env", env)

      GroovyShell shell = new GroovyShell(binding)

      shell.evaluate(groovyCode.getValue())

      def groovyData = binding.getVariable("data")

      // Ensure all contents are strings
      groovyData.eachWithIndex { row, rowNum -> row.eachWithIndex { col, colNum -> groovyData[rowNum][colNum] = groovyData[rowNum][colNum].toString() } }
      def groovyHeader = binding.getVariable("header")

      state.dexData.header = groovyHeader.collect { it.toString() }
      state.dexData.data = groovyData
    }
    else if (processByRowRB.isSelected())
    {
      def newData = []
      GroovyShell shell = new GroovyShell(binding)
      def script = shell.parse(groovyCode.getValue())
      def rowMap = [:]

      state.getDexData().getData().eachWithIndex
      { row, ri ->
        rowMap = [:]
        state.getDexData().getHeader().eachWithIndex
        { h, hi ->
          rowMap[h] = row[hi].toString()
        }

        //println "Processing row: $ri"
        binding.setVariable("i", ri)
        binding.setVariable("row", rowMap)
        binding.setVariable("env", env)

        script.run()

        def resultMap = binding.getVariable("row")
        def resultRow = []
        state.getDexData().getHeader().each
        { h ->
          resultRow << resultMap[h]
        }
        newData << resultRow
        updateProgress(ri/numRows)
      }
      state.dexData.data = newData
    }
    else if (processByColumnRB.isSelected())
    {
      def newData = []
      GroovyShell shell = new GroovyShell(binding)
      def script = shell.parse(groovyCode.getValue())
      state.getDexData().getData().eachWithIndex
      { row, ri ->
        row.eachWithIndex
        { col, ci ->

          binding.setVariable("colName", state.getDexData().getHeader()[ci])
          binding.setVariable("col", col)
          binding.setVariable("env", env)

          script.run()

          def groovyCol = binding.getVariable("col")
          state.getDexData().getData()[ri][ci] = groovyCol.toString()
        }
        updateProgress(ri/numRows)
      }
    }
    return state
  }

  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[][][][][][grow]", "[][grow][]")
      configPane.setStyle("-fx-background-color: white;")

      Button loadButton = new Button("Load")
      loadButton.setOnAction({ event -> load(event)})

      Button saveButton = new Button("Save")
      saveButton.setOnAction({ event -> save(event) })

      configPane.add(NodeFactory.createTitle("Groovy Script"), "grow,span")
      configPane.add(wv, "align left,span,grow")

      def bindings = [
        'mode'     : 'groovy',
        'mime'     : 'text/x-groovy',
        'theme'    : 'eclipse'
      ]

      editor = new CodeMirrorEditor(we, bindings, groovyCode)

      //processByTableRB.setSelected(true)
      processByTableRB.setToggleGroup(processByGroup)
      processByRowRB.setToggleGroup(processByGroup)
      processByColumnRB.setToggleGroup(processByGroup)

      if (!processByGroup.getSelectedToggle())
      {
        processByTableRB.setSelected(true)
      }

      configPane.add(loadButton)
      configPane.add(saveButton)
      configPane.add(new Label("Process By:"))
      configPane.add(processByTableRB)
      configPane.add(processByRowRB)
      configPane.add(processByColumnRB, "span")
    }

    return configPane
  }

  public load(ActionEvent evt)
  {
    try
    {
      File loadFile = groovyChooser.load(evt)

      if (loadFile != null)
      {
        // Automatically updates groovyCode via shared StringProperty
        editor.setEditorContent(FileUtils.readFileToString(loadFile))
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
      File saveFile = groovyChooser.save(evt)

      if (saveFile != null)
      {
        FileUtils.writeStringToFile(saveFile, groovyCode.getValue())
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
}
