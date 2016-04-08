package com.dexvis.javafx.scene.control;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import org.controlsfx.control.PropertySheet;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.core.Commit;

import com.dexvis.dex.exception.DexException;
import com.dexvis.dex.wf.DexTask;

@Root(name = "property-sheet")
public class DexPropertySheet extends PropertySheet implements Cloneable
{
  @ElementList(name="properties", required=false)
  private ObservableList<DexTaskProperty> properties = null;

  public DexPropertySheet()
  {
    super();
    System.out.println("--- Creating Property Sheet()");
    setMode(PropertySheet.Mode.CATEGORY);
    properties = FXCollections.observableArrayList(new ArrayList<DexTaskProperty>());
  }
  
  public DexPropertySheet(Map<String, DexTaskProperty> propMap)
  {
    super();
    System.out.println("--- Creating Property Sheet(propMap)");
    List<DexTaskProperty> propList = new ArrayList<DexTaskProperty>();
    
    for (DexTaskProperty current : propMap.values())
    {
      propList.add(current);
    }
    
    properties = FXCollections.observableArrayList(propList);
  }
  
  public DexPropertySheet(ObservableList<DexTaskProperty> properties)
  {
    super();
    System.out.println("--- Creating Property Sheet(observableProps)");
    this.properties = properties;
    // REM: Illogical, I think...
    for (DexTaskProperty item : properties)
    {
      this.getItems().add(item);
    }
  }

  @Commit
  public void build()
  {
    for (DexTaskProperty item : properties)
    {
      this.getItems().add(item);
    }
  }
  
  public void setTask(DexTask task)
  {
    for (DexTaskProperty property : properties)
    {
      property.setTask(task);
    }
  }
  
  public void update()
  {
    try
    {
      if (properties != null && properties.size() > 0)
      {
        properties.get(0).getTask().update();
      }
    }
    catch(DexException ex)
    {
      ex.printStackTrace();
    }
  }
  
  public void setProperty(DexTaskProperty property)
  {
    //System.out.println("Set Property: '" + property.getTarget() + "'='" + property.getValue() + "'");
    for (DexTaskProperty current : properties)
    {
      if (property.getTarget().equals(current.getTarget()))
      {
        current.set(property);
        return;
      }
    }

    properties.add(property);
    this.getItems().add(property);
  }
}
