package com.dexvis.dex;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javafx.stage.Stage;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import com.dexvis.javafx.scene.control.DexTaskItem;
import com.thoughtworks.xstream.annotations.XStreamOmitField;

@Root(name = "dex-project")
public class DexProject implements Serializable
{
  @XStreamOmitField
  private static final long serialVersionUID = 6741812628232068933L;
  
  @Attribute(name = "version", required = false)
  private String version = "0.8";
  
  @ElementList(name = "tasks")
  private List<DexTaskItem> taskItems = new ArrayList<DexTaskItem>();
  
  public List<DexTaskItem> getTaskItems()
  {
    return taskItems;
  }
  
  public void setTaskItems(List<DexTaskItem> taskItems)
  {
    this.taskItems = taskItems;
  }
  
  public void addDataFilter(DexTaskItem task)
  {
    if (task != null)
    {
      taskItems.add(task);
    }
  }
  
  public static DexProject readProject(Stage stage, File projectFile)
      throws Exception
  {
    DexProject project = readProject(projectFile);
    
    for (DexTaskItem item : project.getTaskItems())
    {
      item.getTask().getValue().setStage(stage);
    }
    
    return project;
  }
  
  public static DexProject readProject(File projectFile) throws Exception
  {
    Serializer serializer = new Persister(new DexMatcher());
    
    return serializer.read(DexProject.class, projectFile);
  }
  
  public void writeProject(File projectFile) throws Exception
  {
    Serializer serializer = new Persister(new DexMatcher());
    serializer.write(this, projectFile);
  }
  
  public String getVersion()
  {
    return version;
  }
  
  public void setVersion(String version)
  {
    this.version = version;
  }
}
