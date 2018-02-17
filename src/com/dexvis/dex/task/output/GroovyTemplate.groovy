package com.dexvis.dex.task.output

import groovy.text.SimpleTemplateEngine
import javafx.beans.property.SimpleStringProperty
import javafx.beans.property.StringProperty
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField
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
import com.dexvis.javafx.scene.control.ModalDialog
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class GroovyTemplate extends DexTask {
  // Used to store our configuration pane.
  private MigPane configPane = null
  
  private Label templateLabel = new Label("Input Template:")
  
  @Element(required=false)
  private TextField templateText = new TextField()
  
  private Label outputLabel = new Label("Output File:")
  
  @Element(required=false)
  private TextField outputFileText = new TextField()
  
  private String output = ""
  private DexFileChooser htmlChooser = new DexFileChooser("output",
    "Choose HTML", "Save HTML", "HTML", "html")
  private DexFileChooser templateChooser = new DexFileChooser("web",
    "Load Template", "Save Groovy Template", "GTMPL", "gtmpl")
  private DexFileChooser groovyChooser = new DexFileChooser("scripts/groovy",
    "Load Groovy Script", "Save Groovy Script", "GROOVY", "groovy")
  
  @Element(name="groovyCode", required=false)
  private StringProperty groovyCode = new SimpleStringProperty(
  "// Enter groovy code here...");
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  private CodeMirrorEditor editor = null;

  /**
   * 
   * Override the default constructor to provide this component's name, category and help file.
   * Report that it has been constructed.
   * 
   */
  public GroovyTemplate()
  {
    super("Output", "Groovy Template", "output/GroovyTemplate.html")
  }
  
  public DexTaskState execute(DexTaskState state) throws DexException
  {
    try
    {
      DexEnvironment env = DexEnvironment.getInstance()
      
      Binding shellBinding = new Binding();
      def options = [:]
      shellBinding.setVariable("options", options);

      GroovyShell shell = new GroovyShell(shellBinding)
      shell.evaluate(groovyCode.getValue())
      options = shellBinding.getVariable("options")
      
      def templateCode = new File(env.interpolate(templateText.getText())).text
      
      def binding = getBinding(state)
      binding["options"] = options;
      
      def engine = new SimpleTemplateEngine()
      def template = engine.createTemplate(templateCode).make(binding)
      output = template.toString()
      
      String outputPath = env.interpolate(outputFileText.getText())
      if (outputPath == null || outputPath.length() <= 0)
      {
        outputPath = "output.html"
      }
      
      FileUtils.writeStringToFile(new File(outputPath), output)
    }
    catch(Exception ex)
    {
      StringWriter sw = new StringWriter()
      ex.printStackTrace(new PrintWriter(sw))
      ModalDialog dialog = new ModalDialog(stage, "Error", sw.toString(), "Ok")
      ex.printStackTrace()
    }
    
    return state
  }
  
  public Map getBinding(DexTaskState state)
  {
    def curDir = new File(".")
    
    return [
      "state":state,
      "dexData":state.dexData,
      "data":state.dexData.data,
      "header":state.dexData.header,
      "basedir" : curDir.toURI().toURL().toExternalForm()
    ]
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[][grow][]", "[][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      templateChooser.setFileText(templateText);
      htmlChooser.setFileText(outputFileText);
      
      Button chooseTemplateButton = new Button("Choose Template")
      chooseTemplateButton.setOnAction({ action -> templateChooser.setTextPath(action)})
      Button chooseOutputFileButton = new Button("Choose Output File")
      chooseOutputFileButton.setOnAction({ action -> htmlChooser.setTextPath(action)})
      
      Button loadGroovyScriptButton = new Button("Load")
      loadGroovyScriptButton.setOnAction({ event -> load(event)})

      Button saveGroovyScriptButton = new Button("Save")
      saveGroovyScriptButton.setOnAction({ event -> save(event) })
      
      def bindings = [
        'mode'     : 'groovy',
        'mime'     : 'text/x-groovy',
        'theme'    : 'eclipse'
      ]

      editor = new CodeMirrorEditor(we, bindings, groovyCode)
      
      configPane.add(NodeFactory.createTitle("Groovy Template"), "grow,span")
      configPane.add(templateLabel)
      configPane.add(templateText, "grow")
      configPane.add(chooseTemplateButton, "span")
      configPane.add(outputLabel)
      configPane.add(outputFileText, "grow")
      configPane.add(chooseOutputFileButton, "span")
      configPane.add(wv, "align left,span,grow")
      configPane.add(loadGroovyScriptButton)
      configPane.add(saveGroovyScriptButton)
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
