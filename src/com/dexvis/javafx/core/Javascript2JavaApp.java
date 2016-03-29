package com.dexvis.javafx.core;

import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor;

public class Javascript2JavaApp
{
  private CodeMirrorEditor editor = null;
  
  public Javascript2JavaApp(CodeMirrorEditor editor)
  {
    this.editor = editor;
  }
  
  public String getContent()
  {
    return editor.getContent();
  }

  public void setContent(String content)
  {
    editor.setContent(content);
  }

  public void debug()
  {
    editor.debug();
  }

  public void log(String msg)
  {
    editor.log(msg);
  }
}
