package com.dexvis.javafx.scene.control;

import java.io.InputStream;

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.DoubleProperty;
import javafx.beans.property.ObjectProperty;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.scene.image.Image;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;

import com.dexvis.dex.wf.DexTask;
import com.dexvis.util.DexUtil;

@Root(name = "task-item")
public class DexTaskItem implements Cloneable
{
  @Element(name = "task", required = false)
  private DexTask taskObj;
  
  private ObjectProperty<DexTask> task = new SimpleObjectProperty<DexTask>();
  
  @Attribute(name = "name", required = false)
  private StringProperty name = new SimpleStringProperty("NONE");
  private Image image = null;
  @Attribute(name = "active", required = false)
  private BooleanProperty active = new SimpleBooleanProperty(true);
  private DoubleProperty opacity = new SimpleDoubleProperty(1.0);
  private String ICONDIR = "/icons/";
  private String missingIcon = ICONDIR + "missing_icon.png";
  private String iconResource = missingIcon;
  
  public DexTaskItem(String name)
  {
    setName(name);
    setActive(true);
    iconResource = ICONDIR
        + name.replaceAll("\\s*\\-\\>\\s*", "2").replaceAll("\\s+", "_")
            .toLowerCase() + ".png";
    task.set(null);
  }
  
  /**
   * 
   * This constructor is used by Simple XML to serialize to and from disk.
   * 
   * @param name
   *          The name of the item.
   * @param active
   *          Whether or not this item is active.
   * @param task
   *          The underlying task this item represents.
   * 
   */
  public DexTaskItem(@Attribute(name = "name") StringProperty name,
      @Attribute(name = "active") BooleanProperty active,
      @Element(name = "task") DexTask task)
  {
    this(name.get());
    setTask(task);
    setName(name.get());
    setActive(active.get());
    if (task != null)
    {
      setImage(task.getImage());
    }
  }
  
  public DexTaskItem(DexTask task)
  {
    this(task.getName());
    setTask(task);
  }
  
  public DexTaskItem(DexTaskItem item)
  {
    this(item.getName().get());
    setTask(item.getTask().get());
  }
  
  public ObjectProperty<DexTask> getTask()
  {
    return task;
  }
  
  public void setImage(Image image)
  {
    if (image != null)
    {
      this.image = image;
    }
  }
  
  public Image getImage()
  {
    if (image != null)
    {
      return image;
    }
    
    // No image has been set, so attempt to get an image based
    // on the name of this task item.
    try
    {
      InputStream is = getClass().getResourceAsStream(iconResource);
      image = new Image(is);
      return image;
    }
    catch(Exception ex)
    {
    }
    
    // Display the missing icon instead.
    try
    {
      InputStream is = getClass().getResourceAsStream(missingIcon);
      image = new Image(is);
      return image;
    }
    catch(Exception ex)
    {
    }
    
    return image;
  }
  
  public void setTask(DexTask task)
  {
    if (task != null)
    {
      DexTask clonedTask = (DexTask) task.clone();
      
      this.taskObj = clonedTask;
      this.task.set(clonedTask);
      setName(clonedTask.getName());
      setActive(clonedTask.getActive());
      setImage(clonedTask.getImage());
    }
  }
  
  public StringProperty getName()
  {
    return name;
  }
  
  public void setName(String name)
  {
    this.name.set(name);
    if (taskObj != null)
    {
      taskObj.setName(name);
    }
  }
  
  public BooleanProperty getActive()
  {
    return active;
  }
  
  public void setActive(boolean active)
  {
    this.active.set(active);
    if (this.taskObj != null)
    {
      this.taskObj.setActive(active);
    }
    this.opacity.set(active ? 1.0 : 0.5);
  }
  
  public DoubleProperty getOpacity()
  {
    return opacity;
  }
  
  public DexTaskItem clone()
  {
    DexTaskItem clone = null;

    if (this.name != null)
    {
      String cloneName = this.name.get();
      if (cloneName != null && cloneName.length() > 0)
      {
        clone = new DexTaskItem(cloneName);
      }
      
      try
      {
        if (getTask() != null && getTask().get() != null)
        {
          clone.setTask(DexUtil.dexTaskFromString(getTask().get().getClass(), DexUtil.dexTaskToString(getTask().get())));
        }
      }
      catch(Exception ex)
      {
        ex.printStackTrace();
      }
    }
    
    System.out.println("CLONING: '" + this + "' = '" + clone + "'");
    return clone;
  }
  
  public String toString()
  {
    String retStr = "DexTaskItem(";
    retStr += "NAME='" + getName() + "', TASK-NAME='" + getTask().getName()
        + "')";
    return retStr;
  }
}
