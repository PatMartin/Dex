package com.dexvis.dex.task.prg

import groovy.text.StreamingTemplateEngine
import javafx.beans.property.SimpleStringProperty
import javafx.beans.property.StringProperty
import javafx.event.ActionEvent
import javafx.geometry.Orientation
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.SplitPane
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor

@Root(name="p5script")
class P5Script extends DexTask {
  private WebView editorWV = new WebView()
  private WebEngine editorWE = editorWV.getEngine()

  private WebView outputWV = new WebView()
  private WebEngine outputWE = outputWV.getEngine()

  private CodeMirrorEditor editor = null;

  private DexFileChooser p5Chooser = new DexFileChooser("p5",
  "Load P5 Script", "Save P5 Script", "P5", "p5")

  public P5Script() {
    super("Programming", "P5 Script", "programming/P5Script.html")
  }

  private MigPane configPane = null

  @Element(name="p5Code", required=false)
  private StringProperty p5Code = new SimpleStringProperty("")

  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    println "Config: ${config}"
    long start = System.currentTimeMillis()
    updateProgress(0, 100);

    String templatePath = "web/p5/P5.gtmpl"

    updateMessage("Parsing Template")
    String template = FileUtils.readFileToString(new File(templatePath))

    def templateBindings = [
      "data"    : state.dexData.data,
      "header"  : state.dexData.header,
      "p5Code"  : p5Code.getValue()
    ]

    def engine = new StreamingTemplateEngine()
    String output = engine.createTemplate(template)
        .make(templateBindings).toString()

    // TODO: Configure options for processing scripts?
    //    outputWE.getLoadWorker().stateProperty().addListener(
    //        new ChangeListener<State>() {
    //          public void changed(ObservableValue ov, State oldState, State newState) {
    //            if (newState == Worker.State.SUCCEEDED) {
    //              outputWE.executeScript(getConfigScript());
    //            }
    //          }
    //        });

    FileUtils.writeStringToFile(new File("output.html"), output)

    updateMessage("Loading Template")
    outputWE?.loadContent(output)
    updateMessage("Loaded Template")

    return state
  }

  public Node getConfig() {
    if (configPane == null) {
      configPane = new MigPane("", "[][grow]", "[][grow][]")
      configPane.setStyle("-fx-background-color: white;")

      Button loadButton = new Button("Load")
      loadButton.setOnAction({ event -> load(event) })

      Button saveButton = new Button("Save")
      saveButton.setOnAction({ event -> save(event) })

      def bindings = [
        'mode'     : 'javascript',
        'mime'     : 'text/x-javascript',
        'theme'    : 'eclipse'
      ]
      editor = new CodeMirrorEditor(editorWE, bindings, p5Code)

      configPane.add(NodeFactory.createTitle("P5 Script"), "grow,span")

      SplitPane splitter = new SplitPane();
      splitter.setOrientation(Orientation.HORIZONTAL);
      splitter.getItems().addAll(editorWV, outputWV);
      splitter.setDividerPositions(0.5f);

      configPane.add(splitter, "grow,span")

      configPane.add(loadButton)
      configPane.add(saveButton, "span")
    }

    return configPane
  }

  public load(ActionEvent evt) {
    try {
      File loadFile = p5Chooser.load(evt)

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
      File saveFile = p5Chooser.save(evt)

      if (saveFile != null) {
        FileUtils.writeStringToFile(saveFile, p5Code.getValue())
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
}
