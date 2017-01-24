package com.dexvis.simple.transform;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

import org.simpleframework.xml.transform.Transform;

public class StringPropertyTransform implements Transform<StringProperty>
{
  public StringProperty read(String value) throws Exception
  {
    return new SimpleStringProperty(value);
  }

  @Override
  public String write(StringProperty value) throws Exception
  {
    return value.get();
  }

}
