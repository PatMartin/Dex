package com.dexvis.javafx.scene.control;

/**
 * 
 * An event payload consisting of a target and a value.
 * 
 * @author Patrick Martin
 *
 */
public class JsonGuiEventPayload
{
  private String component = null;
  private String target = null;
  private Object value = null;
  
  JsonGuiEventPayload(String component, String target, Object value)
  {
    this.component = component;
    this.target = target;
    this.value = value;
  }
  
  /**
   * 
   * Get the JSON component.
   * 
   * @return The component.
   * 
   */
  public String getComponent()
  {
    return component;
  }
  
  /**
   * 
   * Get the JSON target; ie: name.
   * 
   * @return The JSON target.
   * 
   */
  public String getTarget()
  {
    return target;
  }
  
  /**
   * 
   * The JSON value.
   * 
   * @return The JSON value.
   * 
   */
  public Object getValue()
  {
    return value;
  }
}
