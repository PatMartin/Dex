package com.dexvis.simple.transform;

import javafx.scene.web.HTMLEditor;

import org.simpleframework.xml.transform.Transform;

public class HTMLEditorTransform implements Transform<HTMLEditor>
{
  public HTMLEditor read(String value) throws Exception
  {
    HTMLEditor editor = new HTMLEditor();
    editor.setHtmlText(value);
    return editor;
  }

  @Override
  public String write(HTMLEditor value) throws Exception
  {
    return value.getHtmlText();
  }
}
