package com.dexvis.dex.task.prg

import javafx.beans.property.SimpleStringProperty
import javafx.beans.property.StringProperty
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView
import javafx.stage.FileChooser
import javafx.stage.FileChooser.ExtensionFilter

import org.apache.commons.io.FileUtils
import org.python.core.PyList
import org.python.core.PyObject
import org.python.util.PythonInterpreter
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor

@Root(name="jythonscript")
class JythonScript extends DexTask {
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private MigPane configPane = null
  @Element(required=false)
  private StringProperty jythonCode = new SimpleStringProperty(
  "print \"Hello, Jython!\"")
  
  private DexEnvironment env = DexEnvironment.getInstance()
  private CodeMirrorEditor editor = null;
  
  public JythonScript() {
    super("Programming", "Jython Script", "programming/JythonScript.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
    updateMessage("Executing Jython Script")
    updateProgress(-1.0, -1.0)
    
    PythonInterpreter interp = new PythonInterpreter()
    
    interp.exec("import sys")
    
    interp.set("header", state.dexData.header)
    interp.set("data", state.dexData.data)
    interp.set("env", env)
    
    interp.exec(jythonCode.getValue())
    
    PyObject pyHeader = interp.get("header")
    PyObject pyData = interp.get("data")
    
    if (pyHeader instanceof PyList) {
      PyList jheader = (PyList) pyHeader
      state.dexData.header = (0..(jheader.size()-1)).collect
      { jheader.get(it).toString() }
    }
    
    if (pyData instanceof PyList) {
      PyList jdata = (PyList) pyData
      state.dexData.data = (0..(jdata.size()-1)).collect { ri ->
        PyList jrow = (PyList) jdata.get(ri)
        (0..(jrow.size()-1)).collect
        { ci -> jrow.get(ci).toString() }
      }
    }
    
    return state
  }
  
  public String toString() {
    return name
  }
  
  public Node getConfig() {
    
    if (configPane == null) {
      configPane = new MigPane("", "[][grow]", "[][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Jython Script"), "grow,span")
      configPane.add(wv, "align left,span,grow")
      
      def bindings = [
        'mode'     : 'python',
        'mime'     : 'text/x-python',
        'theme'    : 'eclipse'
      ]
      editor = new CodeMirrorEditor(we, bindings, jythonCode)
      
      Button loadButton = new Button("Load Jython Script")
      loadButton.setOnAction({ event -> load(event) })
      
      Button saveButton = new Button("Save Jython Script")
      saveButton.setOnAction({ event -> load(event) })
      
      configPane.add(loadButton)
      configPane.add(saveButton, "span")
    }
    
    return configPane
  }
  
  public load(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load Jython File")
      
      File startDir = new File(new File("scripts/jython").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("JYTHON", "*.py"))
      
      File loadFile = fc.showOpenDialog(null)
      
      if (loadFile != null) {
        editor.setEditorContent(FileUtils.readFileToString(loadFile))
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
  
  public save(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle("Save Jython File")
      
      File startDir = new File(new File("scripts/jython").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("JYTHON", "*.py"))
      
      File saveFile = fc.showSaveDialog(null)
      
      if (!saveFile.getCanonicalPath().endsWith(".py")) {
        saveFile = new File(saveFile.getCanonicalPath() + ".py");
      }
      
      if (saveFile != null) {
        FileUtils.writeStringToFile(saveFile, jythonCode.getValue())
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
  
  //@Commit
  //public void build() {
  //  jythonText.setText(jythonCode)
  //}
}
