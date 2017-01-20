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

import javax.script.Bindings
import javax.script.ScriptContext
import javax.script.ScriptEngine
import javax.script.ScriptEngineManager

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor

@Root(name="rubyscript")
class RubyScript extends DexTask {
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private ToggleGroup processByGroup = new ToggleGroup()
  
  @Element(name="processbytable", required=false)
  private RadioButton processByTableRB = new RadioButton("Table")
  
  @Element(name="processbyrow", required=false)
  private RadioButton processByRowRB = new RadioButton("Row")
  
  @Element(name="processbycolumn", required=false)
  private RadioButton processByColumnRB = new RadioButton("Column")
  
  private DexFileChooser rubyChooser = new DexFileChooser("scripts/ruby",
  "Load Ruby Script", "Save Ruby Script", "RUBY", "rb")
  
  @Element(name="rubyCode", required=false)
  private StringProperty rubyCode = new SimpleStringProperty(
  "# Enter ruby code here...");
  
  private MigPane configPane = null
  private DexEnvironment env = DexEnvironment.getInstance()
  
  private CodeMirrorEditor editor = null;
  private ScriptEngineManager manager = new ScriptEngineManager();
  private ScriptEngine engine = manager.getEngineByName("jruby");
  
  public RubyScript() {
    super("Programming", "Ruby Script", "programming/RubyScript.html")
    
    // Allows this task to run off the JavaFX Application thread.
    getMetaData().setTaskExecutionUpdatesUI(false)
    
    // Do not remove this, for some reason you have to call the engine
    // at least once or subtle bugs (CodeMirror quits listening to
    // changes)  Could be it interferes with the JavaFx event listeners.
    // Life is too short to track this down.
    engine.eval("puts 'Ruby Engine Initialized'")
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
      updateMessage("Executing ruby script...")

      Bindings bindings = engine.getBindings(ScriptContext.ENGINE_SCOPE)
      bindings.put("dex", state.dexData)
      bindings.put("data", state.dexData.data)
      bindings.put("header", state.dexData.header)
      String script = rubyCode.getValue()
      //println "Executing Ruby Script: '${script}'"
      engine.eval(script, bindings);
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
      loadButton.setOnAction(new ReflectiveActionEventHandler(this, "load"))
      
      Button saveButton = new Button("Save")
      saveButton.setOnAction(new ReflectiveActionEventHandler(this, "save"))
      
      configPane.add(NodeFactory.createTitle("Ruby Script"), "grow,span")
      configPane.add(wv, "align left,span,grow")
      
      def bindings = [
        'mode'     : 'ruby',
        'mime'     : 'text/x-ruby',
        'theme'    : 'eclipse'
      ]
      
      editor = new CodeMirrorEditor(we, bindings, rubyCode)

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
      File loadFile = rubyChooser.load(evt)
      
      if (loadFile != null)
      {
        // Automatically updates rubyCode via shared StringProperty
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
      File saveFile = rubyChooser.save(evt)
      
      if (saveFile != null)
      {
        FileUtils.writeStringToFile(saveFile, rubyCode.getValue())
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
}
