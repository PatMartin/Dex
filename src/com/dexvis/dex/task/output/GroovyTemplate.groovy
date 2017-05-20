package com.dexvis.dex.task.output

import groovy.text.SimpleTemplateEngine
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.ModalDialog
import com.dexvis.javafx.scene.control.NodeFactory

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
    "Choose HTML", "Save HTML", "HTML", "html", outputFileText)
  private DexFileChooser templateChooser = new DexFileChooser("web",
    "Load Template", "Save Groovy Template", "GTMPL", "gtmpl", templateText)
  
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
      def templateCode = new File(templateText.getText()).text
      def binding = [ "state":state, "dexData":state.dexData, "data":state.dexData.data, "header":state.dexData.header]
      
      def engine = new SimpleTemplateEngine()
      def template = engine.createTemplate(templateCode).make(binding)
      output = template.toString()
      
      String outputPath = outputFileText.getText()
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
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[][grow][]", "[][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      Button chooseTemplateButton = new Button("Choose Template")
      chooseTemplateButton.setOnAction({ action -> templateChooser.setTextPath(action)})
      Button chooseOutputFileButton = new Button("Choose Output File")
      chooseOutputFileButton.setOnAction({ action -> htmlChooser.setTextPath(action)})
      
      configPane.add(NodeFactory.createTitle("Groovy Template"), "grow,span")
      configPane.add(templateLabel)
      configPane.add(templateText, "grow")
      configPane.add(chooseTemplateButton, "span")
      configPane.add(outputLabel)
      configPane.add(outputFileText, "grow")
      configPane.add(chooseOutputFileButton, "span")
    }
    
    return configPane
  }
}
