package com.dexvis.datastruct;

public class NVP
{
  private String name = null;
  private String value = null;
  
  public NVP(String name, String value)
  {
    setName(name);
    setValue(value);
  }
  
  public String getName()
  {
    return name;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }
  
  public String getValue()
  {
    return value;
  }
  
  public void setValue(String value)
  {
    this.value = value;
  }
  
  public String toString()
  {
    return "NVP(name='" + getName() + "', value='" + getValue() + "')";
  }
}
