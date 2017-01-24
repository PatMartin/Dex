package com.dexvis.dex;

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.DoubleProperty;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Root;

@Root
public class DexItem implements Comparable, Cloneable
{
  @Attribute(name = "name")
  private StringProperty  name    = new SimpleStringProperty("UNNAMED");

  @Attribute(name = "active")
  private BooleanProperty active  = new SimpleBooleanProperty(false);

  private DexItem         parent;

  private DoubleProperty  opacity = new SimpleDoubleProperty(0.5);

  public DexItem()
  {
    this("none", true);
  }

  public DexItem(String name)
  {
    this(name, true);
  }

  public DexItem(String name, boolean active)
  {
    setName(name);
    setActive(active);
  }

  public DexItem(@Attribute(name = "name") StringProperty name,
      @Attribute(name = "active") BooleanProperty active)
  {
    this(name.get(), active.get());
  }

  public StringProperty getName()
  {
    return name;
  }

  public BooleanProperty getActive()
  {
    return active;
  }

  public void setName(String name)
  {
    this.name.set(name);
  }

  public void setName(StringProperty name)
  {
    setName(name.get());
  }

  public void setActive(boolean active)
  {
    this.active.set(active);
    this.opacity.set(active ? 1.0 : 0.5);
  }

  public void setActive(BooleanProperty active)
  {
    setActive(active.get());
  }

  public DoubleProperty getOpacity()
  {
    return opacity;
  }

  public void setOpacity(double opacity)
  {
    this.opacity.set(opacity);
  }

  public void setOpacity(DoubleProperty opacity)
  {
    setOpacity(opacity.get());
  }

  public DexItem getParent()
  {
    return parent;
  }

  public void setParent(DexItem parent)
  {
    this.parent = parent;
  }

  public Object clone()
  {
    try
    {
      return super.clone();
    }
    catch(Exception ex)
    {
      return null;
    }
  }

  @Override
  public int compareTo(Object cmp)
  {
    if (cmp instanceof DexItem)
    {
      return name.get().compareTo(((DexItem) cmp).getName().get());
    }
    return -1;
  }
}
