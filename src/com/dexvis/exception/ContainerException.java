package com.dexvis.exception;

import java.io.PrintStream;

public class ContainerException extends Exception
{
  // generated
  private static final long serialVersionUID = -5240903664743533452L;
  private Exception ex = null;

  public ContainerException()
  {
    super();
  }

  public ContainerException(String errorMessage)
  {
    super(errorMessage);
  }

  public ContainerException(String errorMessage, Exception ex)
  {
    super(errorMessage);
    this.ex = ex;
  }

  public ContainerException(Exception ex)
  {
    super();
    this.ex = ex;
  }

  public boolean containsException()
  {
    return ex != null;
  }

  public Exception getException()
  {
    return ex;
  }

  public void printStackTrace()
  {
    printStackTrace(System.out);
  }

  public void printStackTrace(PrintStream out)
  {
    super.printStackTrace(out);
    if (containsException())
    {
      out.println("This exception contains another exception:");
      out.println("------------------------------------------");
      getException().printStackTrace(out);
    }
  }
}
