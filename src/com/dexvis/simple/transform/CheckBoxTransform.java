package com.dexvis.simple.transform;

import javafx.scene.control.CheckBox;

import org.simpleframework.xml.transform.Transform;

public class CheckBoxTransform implements Transform<CheckBox>
{
  public CheckBox read(String value) throws Exception
  {
    boolean selected = Boolean.parseBoolean(value);
    CheckBox cb = new CheckBox();
    cb.selectedProperty().set(selected);
    return cb;
  }

  @Override
  public String write(CheckBox value) throws Exception
  {
    return Boolean.toString(value.isSelected());
  }
}
