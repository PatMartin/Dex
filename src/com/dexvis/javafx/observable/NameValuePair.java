package com.dexvis.javafx.observable;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;

@Root
public class NameValuePair
{
  @Element(name = "name", type = String.class, required = false)
  private StringProperty name = new SimpleStringProperty();
  @Element(name = "value", type = String.class, required = false)
  private StringProperty value = new SimpleStringProperty();

  public NameValuePair()
  {
  }
  
  public NameValuePair(String name, String value)
  {
    setName(name);
    setValue(value);
  }

  public String getName()
  {
    return name.get();
  }

  public void setName(String name)
  {
    this.name.set(name);
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
