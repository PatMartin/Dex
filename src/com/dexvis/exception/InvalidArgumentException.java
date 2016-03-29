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
public class InvalidArgumentException extends ContainerException
{

  /**
   * 
   */
  private static final long serialVersionUID = -4636569787500850826L;

  public InvalidArgumentException(String errorMessage)
  {
    super(errorMessage);
  }

  public InvalidArgumentException(String errorMessage, Exception ex)
  {
    super(errorMessage, ex);
  }

  public InvalidArgumentException(Exception ex)
  {
    super(ex);
  }
}
