package com.dexvis.dex.exception;

public class ProjectNotFoundException extends DexException
{
  /**
   * 
   */
  private static final long serialVersionUID = -4636569787500850826L;

  public ProjectNotFoundException(String errorMessage)
  {
    super(errorMessage);
  }

  public ProjectNotFoundException(String errorMessage, Exception ex)
  {
    super(errorMessage, ex);
  }

  public ProjectNotFoundException(Exception ex)
  {
    super(ex);
  }
}