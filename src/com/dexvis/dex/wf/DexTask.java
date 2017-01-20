package com.dexvis.dex.wf;

import java.io.InputStream;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javafx.concurrent.Task;
import javafx.scene.Node;
import javafx.scene.image.Image;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.core.Commit;
import org.tbee.javafx.scene.layout.MigPane;

import com.dexvis.dex.DexConstants;
import com.dexvis.dex.exception.DexException;
import com.dexvis.javafx.scene.control.DexPropertySheet;
import com.dexvis.javafx.scene.control.DexTaskProperty;
import com.dexvis.util.DexUtil;
import com.thoughtworks.xstream.annotations.XStreamOmitField;

@Root
public class DexTask extends Task<DexTask> implements Comparable<DexTask>,
    Serializable, Cloneable, DexConstants
{
  /**
   * 
   */
  private static final long serialVersionUID = -3296675819537504912L;
  // Base directory for all task help files.
  @XStreamOmitField
  public final String HELPDIR = "http://patmartin.gitbooks.io/dex-docs/content/tasks/";
  // State of this task, initialize to start.
  @XStreamOmitField
  private DexTaskState dexTaskState = new DexTaskState();
  // Metadata for this task, initially empty.
  @XStreamOmitField
  private DexTaskMetaData metaData = DexTaskMetaData.metaData();
  // Used to categorize task within the palette tree
  private String category = "NONE";
  // Default name of this component.
  private String name = "NONE";
  // Default helpfile, NONE
  private String helpFile = "NONE";

  private String ICONDIR = "/icons/";
  private String missingIconResource = "missing_icon.png";
  private String iconResource = missingIconResource;
  
  // Useful if your task requires the JavaFX stage.
  @XStreamOmitField
  private Stage stage = null;
  // Defaults to an active component.
  private boolean active = true;
  
  @Element(name = "prop-sheet", required = false)
  private DexPropertySheet properties = new DexPropertySheet();
  
  // @ElementMap(entry = "property", key = "name", required = false)
  // private Map<String, DexTaskProperty> properties = new HashMap<String,
  // DexTaskProperty>();
  
  public DexTask()
  {
    super();
    // System.out.println("CREATING() : " + getName());
    // for (DexTaskProperty property : properties.values())
    // {
    // System.out.println(
    // "************* SETTING TASK: " + property.getName() + " to " + this);
    // property.setTask(this);
    // }
  }
  
  public DexTask(String category, String name, String helpFile)
  {
    // System.out.println("CREATING(S, S, S) : " + getName());
    setCategory(category);
    setName(name);
    setHelpFile(helpFile);
  }
  
  /**
   * 
   * Default implementation for task initialization is to do nothing except
   * return the state unchanged. Some components might want to read data and
   * dynamically configure a GUI, others may wish to do nothing.
   * 
   * @param state
   *          The task state.
   * 
   * @return The resultant state of the task.
   * 
   */
  public DexTaskState initialize(DexTaskState state) throws DexException
  {
    updateMessage("Initializing: " + getTitle());
    return state;
  }
  
  /**
   * 
   * Default implementation for task execution is to do nothing except return
   * the state unchanged. This routine is called when the task is executed.
   * 
   * @param state
   *          The task state.
   * 
   * @return The resultant state of the task.
   * 
   */
  public DexTaskState execute(DexTaskState state) throws DexException
  {
    updateMessage("Executing: " + getTitle());
    return state;
  }
  
  /**
   * 
   * Default implementation for task termination is to do nothing except return
   * the state unchanged.
   * 
   * @param state
   *          The task state.
   * 
   * @return The resultant state of the task.
   * 
   */
  public DexTaskState terminate(DexTaskState state) throws DexException
  {
    updateMessage("Terminating: " + getTitle());
    return state;
  }
  
  /**
   * 
   * Default implementation for task start is to do nothing except return the
   * state unchanged.
   * 
   * @param state
   *          The task state.
   * 
   * @return The resultant state of the task.
   * 
   */
  public DexTaskState start(DexTaskState state) throws DexException
  {
    updateMessage("Started: " + getTitle());
    return state;
  }
  
  /**
   * 
   * Default implementation for task suspend is to do nothing except return the
   * state unchanged.
   * 
   * @param state
   *          The task state.
   * 
   * @return The resultant state of the task.
   * 
   */
  public DexTaskState suspend(DexTaskState state) throws DexException
  {
    updateMessage("Suspended: " + getTitle());
    return state;
    
  }
  
  /**
   * 
   * Return the current state of this task.
   * 
   * @return The current state of this task.
   * 
   */
  public DexTaskState getDexTaskState() throws DexException
  {
    return dexTaskState;
  }
  
  /**
   * 
   * Return the category of this task.
   * 
   * @return The category of this task.
   * 
   */
  public String getCategory()
  {
    return category;
  }
  
  /**
   * 
   * Set the category of this task.
   * 
   * @param This
   *          task's category.
   * 
   */
  public void setCategory(String category)
  {
    if (category != null)
    {
      this.category = category.trim().replaceAll("\\s*:\\s*", ":");
    }
    else
    {
      this.category = category;
    }
  }
  
  /**
   * 
   * Get the name of this task.
   * 
   * @return The name of this task.
   * 
   */
  public String getName()
  {
    return name;
  }
  
  /**
   * 
   * Set the name of this task.
   * 
   * @param name
   *          The name of this task.
   * 
   */
  public void setName(String name)
  {
    this.name = name;
    setIconResource(ICONDIR
        + name.replaceAll("\\s*\\-\\>\\s*", "2").replaceAll("\\s+", "_")
        .replaceAll("-+",  "_")
            .toLowerCase() + ".png");
  }
  
  /**
   * 
   * Return the relative path to the helpfile for this task.
   * 
   * @return The relative path to the helpfile for this task.
   * 
   */
  public String getHelpFile()
  {
    return helpFile;
  }
  
  /**
   * 
   * Set the relative path to the helpfile of this task.
   * 
   * @param helpFile
   *          The relative path to the helpfile of this task.
   * 
   */
  public void setHelpFile(String helpFile)
  {
    this.helpFile = helpFile;
  }
  
  /**
   * 
   * Return the path relative to the icon directory for the icon which is to be
   * used to represent this task.
   * 
   * @return The relative path to icon for this task.
   * 
   */
  public String getIconResource()
  {
    return iconResource;
  }
  
  /**
   * 
   * Set the location of the icon resource for this task relative to the icon
   * directory.
   * 
   * @param iconResource
   *          The resource path relative to the icon directory for the icon
   *          which represents this task.
   * 
   */
  public void setIconResource(String iconResource)
  {
    this.iconResource = iconResource;
  }
  
  /**
   * 
   * Return the stage for this task. Useful for things like modal dialogs.
   * 
   * @return The stage for this task.
   * 
   */
  public Stage getStage()
  {
    return stage;
  }
  
  /**
   * 
   * Set the stage for this task.
   * 
   * @param stage
   *          The stage for this task.
   * 
   */
  public void setStage(Stage stage)
  {
    this.stage = stage;
  }
  
  /**
   * 
   * Return the metadata for this task.
   * 
   * @return The metadata for this task.
   * 
   */
  public DexTaskMetaData getMetaData() throws DexException
  {
    return metaData;
  }
  
  /**
   * 
   * Set the metadata for this task.
   * 
   * @param metaData
   *          The metadata for this task.
   * 
   */
  public void setMetaData(DexTaskMetaData metaData)
  {
    this.metaData = metaData;
  }
  
  /**
   * 
   * A comparison function for determining order in the task tree.
   * 
   * @param task
   *          The task we are being compared to.
   * 
   */
  public int compareTo(DexTask task)
  {
    if (getName() != null && task != null && task.getName() != null)
    {
      return getName().compareTo(task.getName());
    }
    
    return -1;
  }
  
  /**
   * 
   * Set this task to active or not.
   * 
   * @param active
   *          True if active, false if inactive.
   * 
   */
  public void setActive(boolean active)
  {
    this.active = active;
  }
  
  /**
   * 
   * Return whether or not this task is active or not.
   * 
   * @return True if active, false if inactive.
   * 
   */
  public boolean getActive()
  {
    return active;
  }
  
  /**
   * 
   * Returns the image for this component.
   * 
   * @return The image for this component.
   * 
   */
  public Image getImage()
  {
    try
    {
      InputStream is = getClass().getResourceAsStream(getIconResource());
      return new Image(is);
    }
    catch(Exception ex)
    {
      InputStream is = getClass().getResourceAsStream(
          ICONDIR + missingIconResource);
      return new Image(is);
    }
  }
  
  /**
   * 
   * Returns a node containing this task's configuration pane.
   * 
   * @return This task's configuration node.
   * 
   */
  public Node getConfig()
  {
    MigPane configPane = new MigPane("", "[grow]", "[grow]");
    WebView wv = new WebView();
    WebEngine we = wv.getEngine();
    we.load(getHelpFile());
    configPane.add(wv, "grow");
    return configPane;
  }
  
  /**
   * 
   * Returns this task's help window.
   * 
   * @return This task's help window.
   * 
   */
  public Node getHelp()
  {
    MigPane helpPane = new MigPane("insets 0", "[grow]", "[grow]");
    WebView wv = new WebView();
    WebEngine we = wv.getEngine();
    try
    {
      String helpStr = HELPDIR + getHelpFile();
      
      // int anchorLoc = helpStr.indexOf("#");
      //
      // // Handle links like: uri#anchor
      // if (anchorLoc >= 0)
      // {
      // File helpFile = new File(helpStr.substring(0, anchorLoc));
      // URL helpURL = helpFile.toURL();
      // we.load(helpURL.toString() + helpStr.substring(anchorLoc));
      // }
      // else
      // {
      // File helpFile = new File(getHelpFile());
      // URL helpURL = helpFile.toURL();
      // we.load(helpURL.toString());
      // }
      we.load(helpStr);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
    helpPane.add(wv, "grow");
    return helpPane;
  }
  
  /**
   * 
   * Used for drag and drop and cut and paste to copy the task to other
   * locations.
   * 
   * @return A new cloned DexTask based upon this one.
   * @throws CloneNotSupportedException
   * 
   */
  public DexTask clone()
  {
    return DexUtil.copyTask(this);
  }
  
  public void setPropertySheet(DexPropertySheet properties)
  {
    this.properties = properties;
  }
  
  public DexPropertySheet getPropertySheet()
  {
    // List<DexTaskProperty> propList = new ArrayList<DexTaskProperty>();
    // for (String propName : properties.keySet())
    // {
    // propList.add(properties.get(propName));
    // }
    //
    // ObservableList<DexTaskProperty> oPropList = FXCollections
    // .observableList(propList);
    //
    // DexPropertySheet propertySheet = new DexPropertySheet(oPropList);
    return properties;
  }
  
  public void update() throws DexException
  {
  }
  
  public void updateTitle(String title)
  {
    super.updateTitle(title);
  }
  
  public void updateMessage(String message)
  {
    super.updateMessage(message);
  }
  
  public void updateProgress(double percentCompleted, double max)
  {
    super.updateProgress(percentCompleted, max);
  }
  
  public void progressAborted()
  {
    updateProgress(0, 0);
  }
  
  public void updateProgress(double percentCompleted)
  {
    if (percentCompleted >= 0 && percentCompleted <= 100)
    {
      super.updateProgress(percentCompleted, 100);
    }
    else
    {
      super.updateProgress(0, 100);
    }
  }
  
  public void setDexTaskState(DexTaskState state)
  {
    this.dexTaskState = state;
  }
  
  public void done()
  {
    super.done();
  }
  
  public void fail()
  {
    super.failed();
  }
  
  public void succeeded()
  {
    super.succeeded();
  }
  
  public void cancelled()
  {
    super.cancelled();
  }
  
  // public Map<String, DexTaskProperty> getProperties()
  // {
  // return properties;
  // }
  
  @Commit
  public void build()
  {
    properties.setTask(this);
  }
  
  public void setProperties(Map<String, DexTaskProperty> properties)
  {
    this.properties = new DexPropertySheet(properties);
    this.properties.setTask(this);
  }
  
  public void setProperty(String category, String name, String target,
      Object value)
  {
    properties.setProperty(new DexTaskProperty(this, category, name, target,
        value, ""));
  }
  
  public void setProperty(String category, String name, String target,
      Object value, String description)
  {
    properties.setProperty(new DexTaskProperty(this, category, name, target,
        value, description));
  }
  
  public void addProperties(List<DexTaskProperty> props)
  {
    for (DexTaskProperty prop : props)
    {
      prop.setTask(this);
      properties.setProperty(prop);
    }
  }
  
  @Override
  protected DexTask call() throws Exception
  {
    setDexTaskState(execute(getDexTaskState()));
    return this;
  }
}
