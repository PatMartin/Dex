package com.dexvis.dex.task.output

import groovy.text.SimpleTemplateEngine
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Separator
import javafx.scene.control.Tab
import javafx.scene.control.TabPane
import javafx.scene.control.TextArea
import javafx.scene.effect.DropShadow
import javafx.scene.paint.Color
import javafx.scene.text.Font
import javafx.scene.text.FontWeight
import javafx.scene.text.Text
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView
import javafx.stage.FileChooser
import javafx.stage.FileChooser.ExtensionFilter

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class GroovyTemplateEditor extends DexTask {
  @Element(name="templateCode", required=false)
  private String templateCode = "Insert template code here..."
  
  private String startDir = "template"
  
  private TextArea templateText
  private TextArea outputText = new TextArea("")
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  /**
   * 
   * Override the default constructor to provide this component's name, category and help file.
   * Report that it has been constructed.
   * 
   */
  public GroovyTemplateEditor() {
    super("Output", "Groovy Template Editor", "output/GroovyTemplateEditor.html")
  }
  
  // Used to store our configuration pane.
  private MigPane configPane = null
  
  public DexTaskState execute(DexTaskState state) throws DexException
  {
    println "Running: $name"
    
    def text = templateText.getText()
    
    def binding = [ "state":state, "dexData":state.dexData, "data":state.dexData.data, "header":state.dexData.header]
    
    def engine = new SimpleTemplateEngine()
    def template = engine.createTemplate(text).make(binding)
    
    outputText.setText(template.toString())
    we?.loadContent(template.toString())
    
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[grow]", "[grow]")
      configPane.setStyle("-fx-background-color: white;")
      
      TabPane tabPane = new TabPane()
      Tab configTab = new Tab("Configuration")
      
      Text configText = new Text("Groovy Output Template Configuration")
      
      DropShadow ds = new DropShadow()
      ds.setOffsetY(3.0f)
      ds.setColor(Color.color(0.4f, 0.4f, 0.4f))
      
      configText.setEffect(ds)
      configText.setCache(true)
      configText.setX(10.0f)
      configText.setY(270.0f)
      configText.setFill(Color.DARKBLUE)
      configText.setFont(Font.font(null, FontWeight.BOLD, 24))
      
      Separator sep = new Separator()
      sep.setStyle("-fx-background-color: darkblue;-fx-background-radius: 2;")
      templateText = new TextArea(templateCode)
      
      Button loadButton = new Button("Load Template")
      loadButton.setOnAction({ event -> loadTemplate(event)})
      
      Button saveButton = new Button("Save Template")
      saveButton.setOnAction({ event -> saveTemplate(event)})
      
      Tab outputTab = new Tab("Output")
      
      MigPane configTabPane = new MigPane("", "[][grow]", "[][][grow][]")
      configTabPane.add(configText, "grow, span")
      configTabPane.add(sep, "grow, span")
      configTabPane.add(templateText, "grow, span")
      configTabPane.add(loadButton)
      configTabPane.add(saveButton)
      configTab.setContent(configTabPane)
      
      MigPane outputTabPane = new MigPane("", "[grow]", "[grow][]")
      outputTabPane.add(outputText, "grow, span")
      
      Button saveOutputButton = new Button("Save Output")
      saveOutputButton.setOnAction({ event -> saveOutput(event)})
      outputTabPane.add(saveOutputButton)
      
      outputTab.setContent(outputTabPane)
      
      Tab htmlTab = new Tab("HTML")
      MigPane htmlTabPane = new MigPane("", "[grow]", "[grow]")
      htmlTabPane.add(wv, "grow")
      
      htmlTab.setContent(htmlTabPane)
      
      tabPane.getTabs().addAll(configTab, outputTab, htmlTab)
      
      configPane.add(tabPane, "grow")
    }
    
    return configPane
  }
  
  public loadTemplate(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load Groovy Template")
      
      File startDirFile = new File(startDir)
      fc.setInitialDirectory(startDirFile)
      fc.getExtensionFilters().addAll(new ExtensionFilter("GTMPL", "*.gtmpl"))
      
      File loadFile = fc.showOpenDialog(null)
      
      if (loadFile != null)
      {
        templateCode = FileUtils.readFileToString(loadFile)
        templateText.setText(templateCode)
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
  
  public saveTemplate(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Save Template File")
      
      File startDir = new File(new File("template").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("GTMPL", "*.gtmpl"))
      
      File loadFile = fc.showSaveDialog(null)
      
      if (loadFile != null)
      {
        templateCode = templateText.getText()
        FileUtils.writeStringToFile(loadFile, templateCode)
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
  
  public saveOutput(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Save Output File")
      
      File startDir = new File(new File("output").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      
      File saveFile = fc.showSaveDialog(null)
      
      if (saveFile != null)
      {
        FileUtils.writeStringToFile(saveFile, outputText.getText())
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
}
