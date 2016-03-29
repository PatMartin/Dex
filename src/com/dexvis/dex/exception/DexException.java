package com.dexvis.dex.exception;

import com.dexvis.exception.ContainerException;

public class DexException extends ContainerException
{

  /**
   * 
   */
  private static final long serialVersionUID = -4636569787500850826L;

  public DexException(String errorMessage)
  {
    super(errorMessage);
  }

  public DexException(String errorMessage, Exception ex)
  {
    super(errorMessage, ex);
  }

  public DexException(Exception ex)
  {
    super(ex);
  }

  public String toString()
  {
    String exStr = super.toString();

    if (containsException())
    {
      exStr += "\nContains Another Exception:\n--------------------------\n"
          + getException();
    }

    return exStr;
  }
}