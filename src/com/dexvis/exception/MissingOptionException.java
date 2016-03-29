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
public class MissingOptionException extends ContainerException
{

  /**
   * 
   */
  private static final long serialVersionUID = -4636569787500850826L;

  public MissingOptionException(String errorMessage)
  {
    super(errorMessage);
  }

  public MissingOptionException(String errorMessage, Exception ex)
  {
    super(errorMessage, ex);
  }

  public MissingOptionException(Exception ex)
  {
    super(ex);
  }
}
