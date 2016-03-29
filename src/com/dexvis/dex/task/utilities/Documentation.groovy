package com.dexvis.dex.task.utilities

import javafx.event.ActionEvent
import javafx.event.Event
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.Separator
import javafx.scene.control.Tab
import javafx.scene.control.TabPane
import javafx.scene.control.TextField
import javafx.scene.effect.DropShadow
import javafx.scene.paint.Color
import javafx.scene.text.Font
import javafx.scene.text.FontWeight
import javafx.scene.text.Text
import javafx.scene.web.HTMLEditor
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView
import javafx.stage.FileChooser

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.event.ReflectiveEventHandler

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class Documentation extends DexTask
{
  // Used to store our configuration pane.
  private MigPane configPane = null

  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()

  @Element(required=false)
  private HTMLEditor editor = new HTMLEditor()

  @Element(required=false)
  private TextField docFileText = new TextField()

  /**
   * 
   * Override the default constructor to provide this component's name, category and help file.
   * Report that it has been constructed.
   * 
   */
  public Documentation()
  {
    super("Utilities", "Documentation", "utilities/Documentation.html")
  }

  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[grow]", "[grow]")
      configPane.setStyle("-fx-background-color: white;")

      TabPane tabPane = new TabPane()
      Tab configTab = new Tab("Configuration")

      Text configText = new Text("Documentation")

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

      MigPane configTabPane = new MigPane("", "[][grow][]", "[][][][]")
      configTabPane.add(configText, "grow, span")
      configTabPane.add(sep, "grow, span")

      configTabPane.add(new Label("Documentation File:"))
      configTabPane.add(docFileText, "grow")

      Button loadDocButton = new Button("Load Documentation")
      loadDocButton.setOnAction(new ReflectiveActionEventHandler(this, "loadDoc"))

      configTabPane.add(loadDocButton, "span")

      configTab.setContent(configTabPane)

      Tab outputTab = new Tab("Editor")
      MigPane outputTabPane = new MigPane("", "[grow]", "[grow][]")
      outputTabPane.add(editor, "span, grow")

      Button saveOutputButton = new Button("Save Documentation")
      saveOutputButton.setOnAction(new ReflectiveActionEventHandler(this, "saveDoc"))

      outputTabPane.add(saveOutputButton)
      outputTab.setContent(outputTabPane)

      Tab htmlTab = new Tab("HTML")
      MigPane htmlTabPane = new MigPane("", "[grow]", "[grow]")
      htmlTabPane.add(wv, "grow")

      htmlTab.setContent(htmlTabPane)

      htmlTab.setOnSelectionChanged(new ReflectiveEventHandler(this, "tabChange"))

      htmlTab.setClosable(false)
      configTab.setClosable(false)
      outputTab.setClosable(false)
      
      tabPane.getTabs().addAll(htmlTab, configTab, outputTab)

      configPane.add(tabPane, "grow")
    }

    return configPane
  }

  public saveDoc(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Save Documentation")

      File startDir = new File(new File("project/docs").getCanonicalPath())
      fc.setInitialDirectory(startDir)

      File saveFile = fc.showSaveDialog(null)

      if (saveFile != null)
      {
        FileUtils.writeStringToFile(saveFile, editor.getHtmlText())
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public loadDoc(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load Documentation")

      File startDir = new File(new File("project/docs").getCanonicalPath())
      fc.setInitialDirectory(startDir)

      File loadFile = fc.showOpenDialog(null)

      if (loadFile != null)
      {
        String docHTML = FileUtils.readFileToString(loadFile)
        editor.setHtmlText(docHTML)
        we?.loadContent(docHTML)
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public tabChange(Event evt)
  {
    we?.loadContent(editor.getHtmlText())
  }

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    return state
  }
}
