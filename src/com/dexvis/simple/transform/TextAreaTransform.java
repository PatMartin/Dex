package com.dexvis.simple.transform;

import javafx.scene.control.TextArea;

import org.simpleframework.xml.transform.Transform;

public class TextAreaTransform implements Transform<TextArea>
{
  public TextArea read(String value) throws Exception
  {
    return new TextArea(value);
  }

  @Override
  public String write(TextArea value) throws Exception
  {
    return value.getText();
  }
}
