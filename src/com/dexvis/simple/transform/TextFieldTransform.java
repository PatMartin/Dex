package com.dexvis.simple.transform;

import javafx.scene.control.TextField;

import org.simpleframework.xml.transform.Transform;

public class TextFieldTransform implements Transform<TextField>
{
  public TextField read(String value) throws Exception
  {
    return new TextField(value);
  }

  @Override
  public String write(TextField value) throws Exception
  {
    return value.getText();
  }
}
