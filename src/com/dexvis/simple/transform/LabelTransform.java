package com.dexvis.simple.transform;

import javafx.scene.control.Label;

import org.simpleframework.xml.transform.Transform;

public class LabelTransform implements Transform<Label>
{
  public Label read(String value) throws Exception
  {
    return new Label(value);
  }

  @Override
  public String write(Label value) throws Exception
  {
    return value.getText();
  }
}
