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
  private String target = null;
  private String value = null;
  
  JsonGuiEventPayload(String target, String value)
  {
    this.target = target;
    this.value = value;
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
  public String getValue()
  {
    return value;
  }
}
