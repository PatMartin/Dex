package com.dexvis.exception;

/**
 * 
 * This class holds an element not found exception. This is used to indicate
 * that the element being referenced in the hashtable, property file, or
 * whatever, wasn't found.
 * 
 * @author Patrick E. Martin
 * @version 1.0
 * 
 */
public class ElementNotFoundException extends ContainerException
{
  
  // generated
  private static final long serialVersionUID = 6069060137605160516L;
  
  public ElementNotFoundException(String errorMessage)
  {
    super(errorMessage);
  }
  
  public ElementNotFoundException(String errorMessage, Exception ex)
  {
    super(errorMessage, ex);
  }
  
  public ElementNotFoundException(Exception ex)
  {
    super(ex);
  }
}
