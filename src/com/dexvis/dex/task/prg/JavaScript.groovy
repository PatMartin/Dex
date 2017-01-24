package com.dexvis.dex.task.prg

import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Separator
import javafx.scene.control.TextArea
import javafx.scene.effect.DropShadow
import javafx.scene.image.Image
import javafx.scene.paint.Color
import javafx.scene.text.Font
import javafx.scene.text.FontWeight
import javafx.scene.text.Text
import javafx.stage.FileChooser
import javafx.stage.FileChooser.ExtensionFilter

import javax.script.Invocable
import javax.script.ScriptEngine
import javax.script.ScriptEngineManager

import org.apache.commons.io.FileUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.simpleframework.xml.core.Commit
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler

@Root(name="javascript")
class JavaScript extends DexTask {
  public JavaScript() {
    super("Programming", "Javascript", "programming/Javascript.html")
  }
  
  private MigPane configPane = null

  @Element(required=false)
  private String javascriptCode = "print('Hello Javascript');";
  
  private TextArea javascriptText = new TextArea(javascriptCode)
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    javascriptCode = javascriptText.getText()
    String javascriptScript = "function dexScript(header, data) {\n" +
     javascriptCode + "\n}"
    
    ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
    engine.eval(javascriptScript);
    
    Invocable invocable = (Invocable) engine;

    println "HEADER: ${state.dexData.header}, DATA: ${state.dexData.data}"
    Object result = invocable.invokeFunction("dexScript", state.dexData.header,
      state.dexData.data);
    System.out.println("RESULT:       " + result);
    System.out.println("RESULT-CLASS: " + result.getClass());
    
    return state
  }
  
  public String toString() {
    return name
  }
  
  public Node getConfig() {
    
    if (configPane == null) {
      configPane = new MigPane("", "[][grow]", "[][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      DropShadow ds = new DropShadow()
      ds.setOffsetY(3.0f)
      ds.setColor(Color.color(0.4f, 0.4f, 0.4f))
      
      Text t = new Text()
      t.setEffect(ds)
      t.setCache(true)
      t.setX(10.0f)
      t.setY(270.0f)
      t.setFill(Color.DARKBLUE)
      t.setText("Enter Javascript Code Below")
      t.setFont(Font.font(null, FontWeight.BOLD, 24))
      
      Separator sep = new Separator()
      sep.setStyle("-fx-background-color: #e79423;-fx-background-radius: 2;")
      
      javascriptText = new TextArea(javascriptCode)
      
      Button loadButton = new Button("Load javascript Script")
      
      loadButton.setOnAction(new ReflectiveActionEventHandler(this, "load"))
      
      Button saveButton = new Button("Save javascript Script")
      
      saveButton.setOnAction(new ReflectiveActionEventHandler(this, "save"))
      
      configPane.add(t, "cell 0 0, span, grow")
      configPane.add(sep, "cell 0 1, span, grow")
      
      configPane.add(javascriptText, "cell 0 2, span, grow")
      
      configPane.add(loadButton, "cell 0 3")
      configPane.add(saveButton, "cell 1 3")
    }
    
    return configPane
  }
  
  public load(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load javascript File")
      
      File startDir = new File(new File("scripts/javascript").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("javascript", "*.js"))
      
      File loadFile = fc.showOpenDialog(null)
      
      if (loadFile != null) {
        javascriptCode = FileUtils.readFileToString(loadFile)
        javascriptText.setText(javascriptCode)
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
  
  public save(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle("Save Javascript File")
      
      File startDir = new File(new File("scripts/javascript").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("javascript", "*.js"))
      
      File saveFile = fc.showSaveDialog(null)
      
      if (!saveFile.getCanonicalPath().endsWith(".js")) {
        saveFile = new File(saveFile.getCanonicalPath() + ".js");
      }
      
      if (saveFile != null) {
        FileUtils.writeStringToFile(saveFile, javascriptCode)
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
  
  @Commit
  public void build() {
    javascriptText.setText(javascriptCode)
  }
}
