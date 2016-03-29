package com.dexvis.javafx.observable;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;

@Root
public class SingleString
{
  @Element(name = "value", type = String.class, required = false)
  private StringProperty value = new SimpleStringProperty();

  public SingleString()
  {
  }

  public SingleString(String value)
  {
    setValue(value);
  }

  public String getValue()
  {
    return value.get();
  }

  public void setValue(String value)
  {
    this.value.set(value);
  }
}
