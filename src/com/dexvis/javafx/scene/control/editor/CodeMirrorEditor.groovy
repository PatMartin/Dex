package com.dexvis.javafx.scene.control.editor

import groovy.text.StreamingTemplateEngine
import javafx.beans.property.StringProperty
import javafx.beans.value.ChangeListener
import javafx.beans.value.ObservableValue
import javafx.concurrent.Worker
import javafx.concurrent.Worker.State
import javafx.scene.web.WebEngine
import netscape.javascript.JSObject

import org.apache.commons.io.FileUtils

public class CodeMirrorEditor {
  private WebEngine we = null;
  private StringProperty content = null;

  /**
   * 
   * CodeMirrorEditor is an object which provides convenient access to
   * a WebView side CodeView editor.
   * 
   * @param bindings Groovy variable bindings to be passed to the editor
   * template. 
   *
   */
  public CodeMirrorEditor(WebEngine we, Map<String, String> bindings, StringProperty content) {
    String templateCode = FileUtils.readFileToString(
        new File("web/editors/CodeMirror.gtmpl"))

    //def binding = [
    //  'mode'     : 'sql',
    //  'mime'     : 'text/x-mysql',
    //  'theme'    : 'eclipse',
    //  'content'  : sqlScript
    // ]

    this.we = we;
    this.content = content;
    JavaApp japp = new JavaApp(this);
    
    def effectiveBindings = bindings.clone()
    effectiveBindings.content = content.getValue()

    def engine = new StreamingTemplateEngine()
    String template = engine.createTemplate(templateCode).make(effectiveBindings)

    String finalTemplate = template.toString()
    //println "FINAL-TEMPLATE: '${finalTemplate}'"

    we.getLoadWorker().stateProperty().addListener(
        new ChangeListener<Worker.State>() {
          @Override
          public void changed(ObservableValue<? extends State> ov, State t, State t1) {
            if (t1 == Worker.State.SUCCEEDED) {
              JSObject window = (JSObject) we.executeScript("window");
              println "BINDING JAVASCRIPT javaApp='$this' to '$window'"
              // TODO: Figure out direct way of doing this.  Also restore hierarchy of:
              //
              // Editor -> JSEditor -> CodeMirrorEditor
              //                    -> AceEditor
              //
              // So that clients work with JSEditor for pluggable WebView editors and
              // Editor for pluggable editors of all types.
              window.setMember("javaApp", japp)
            }
          }
        });

    // Useful for debugging.
    //FileUtils.writeStringToFile(new File("output.html"), finalTemplate)

    we?.loadContent(finalTemplate)
  }

  public class JavaApp
  {
    def editor;
    def JavaApp(editor)
    {
      this.editor = editor
    }

    public void log(msg)
    {
      editor.log(msg);
    }

    public void setContent(String content)
    {
      println "Setting content from Dex: '${content}'"
      editor.setContent(content);
    }

    public String getContent()
    {
      println "Getting content from Dex: '${editor.getContent()}'"
      return editor.getContent();
    }
  }

  public String getContent()
  {
    return content.getValue()
  }

  public void setContent(String content)
  {
    this.content.setValue(content)
    //println "Editor Content: '${getContent()}'"
  }

  public void setEditorContent(String content)
  {
    this.content.setValue(content)
    we.executeScript("loadContent();")
  }
  
  public void log(String msg)
  {
    println "JS-MSG: ${msg}"
  }

  public void debug()
  {
    we.executeScript("if (!document.getElementById('FirebugLite'))" +
        "{E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;" +
        "E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']" +
        "('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', " +
        "'../javascript/firebug/latest/firebug-lite.min.js#startOpened');" +
        "E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']" +
        "('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);" +
        "E = new Image;E['setAttribute']('src', '../javascript/firebug/latest/" +
        "firebug-lite.min.js#startOpened');}");
  }
}
