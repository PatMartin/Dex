package com.dexvis.javafx.observable;

import javafx.beans.property.SimpleStringProperty;

import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;

@Root
public class DataMonitor
{
  @Element(name = "mbeanName", type = String.class, required = false)
  private SimpleStringProperty mbeanName       = new SimpleStringProperty();
  @Element(name = "operationName", type = String.class, required = false)
  private SimpleStringProperty operationName   = new SimpleStringProperty();
  @Element(name = "destinationName", type = String.class, required = false)
  private SimpleStringProperty destinationName = new SimpleStringProperty();

  public DataMonitor()
  {
  }

  public DataMonitor(String mbeanName, String operationName)
  {
    this(mbeanName, operationName, "");
  }

  public DataMonitor(String mbeanName, String operationName,
      String destinationName)
  {
    setMbeanName(mbeanName);
    setOperationName(operationName);
    setDestinationName(destinationName);
  }

  public String getMbeanName()
  {
    return mbeanName.get();
  }

  public String getOperationName()
  {
    return operationName.get();
  }

  public String getDestinationName()
  {
    return destinationName.get();
  }

  public void setMbeanName(String mbeanName)
  {
    this.mbeanName.set(mbeanName);
  }

  public void setOperationName(String operationName)
  {
    this.operationName.set(operationName);
  }

  public void setDestinationName(String destinationName)
  {
    this.destinationName.set(destinationName);
  }
}