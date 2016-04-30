package com.dexvis.javafx.scene.control;

import java.util.List;
import java.util.Optional;

import javafx.beans.value.ObservableValue;

import org.controlsfx.control.PropertySheet.Item;
import org.controlsfx.property.editor.PropertyEditor;
import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;

import com.dexvis.dex.exception.DexException;
import com.dexvis.dex.wf.DexTask;
import com.dexvis.javafx.editors.ChoiceBoxEditor;

@Root(name = "property")
public class DexTaskProperty implements Item
{
  @Element(name = "name", required = false)
  private String name;
  
  @Element(name = "target", required = false)
  private String target;
  
  @Element(name = "category", required = false)
  private String category;

  @Element(name = "value", required = false)
  private Object value;
  
  private DexTask task;
  
  @Element(name = "desc", required = false)
  private String description;

  public DexTaskProperty(DexTask task,
      @Element(name = "category") String category,
      @Element(name = "name") String name,
      @Element(name = "target") String target,
      @Element(name = "value") Object value,
      @Element(name = "desc") String description)
  {
    this.task = task;
    this.category = category;
    this.name = name;
    this.target = target;
    this.value = value;
    this.description = description;
  }

  public DexTaskProperty(
      @Element(name = "category") String category,
      @Element(name = "name") String name,
      @Element(name = "target") String target,
      @Element(name = "value") Object value,
      @Element(name = "desc") String description)
  {
    this.category = category;
    this.name = name;
    this.target = target;
    this.value = value;
    this.description = description;
  }
  
  @Override
  public Class<?> getType()
  {
    if (value == null)
    {
      return "".getClass();
    }
    return value.getClass();
  }

  @Override
  public String getCategory()
  {
    return category;
  }

  @Override
  public String getName()
  {
    return name;
  }

  @Override
  public String getDescription()
  {
    return description;
  }

  @Override
  public Object getValue()
  {
    return value;
  }

  @Override
  public void setValue(Object value)
  {
    this.value = value;
    try
    {
      //System.out.println("DexPropertySheetItem:setValue():update");
      getTask().update();
    }
    catch(DexException ex)
    {
      ex.printStackTrace();
    }
  }

  public String getTarget()
  {
    return target;
  }

  public void setTarget(String target)
  {
    this.target = target;
  }

  public DexTask getTask()
  {
    return task;
  }

  public void setTask(DexTask task)
  {
    this.task = task;
  }
  
  public void set(DexTaskProperty property)
  {
    setTarget(property.getTarget());
    setTask(property.getTask());
    setValue(property.getValue());
  }
  
  @Override
  public Optional<Class<? extends PropertyEditor<?>>> getPropertyEditorClass()
  {
    if (getValue() instanceof List)
    {
      return Optional.of(ChoiceBoxEditor.class);
    }
    else
    {
      return Item.super.getPropertyEditorClass();
    }
  }

  @Override
  public Optional<ObservableValue<? extends Object>> getObservableValue()
  {
    // Returning null here results in NullPointerException
    return Optional.empty();
  }
}
