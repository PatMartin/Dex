package com.dexvis.simple.transform;

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;

import org.simpleframework.xml.transform.Transform;

public class BooleanPropertyTransform implements Transform<BooleanProperty>
{
  public BooleanProperty read(String value) throws Exception
  {
    return new SimpleBooleanProperty(Boolean.valueOf(value));
  }

  @Override
  public String write(BooleanProperty value) throws Exception
  {
    return "" + value.get();
  }

}
