package com.dexvis.javafx.event;

import java.lang.reflect.Method;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.event.ActionEvent;

/**
 * 
 * This is a general purpose action listener. It invokes the supplied routine in
 * the supplied target class when invoked.
 * 
 * @author Patrick E. Martin
 * 
 */
public class ReflectiveChangeListener implements ChangeListener<Object>
{
  // The target object.
  private Object target            = null;
  // The name of the handler
  private String handlerMethodName = null;
  // The reflective Method of the handler.
  private Method handlerMethod     = null;

  /**
   * 
   * Constructs a new reflection action event handler given the supplied target
   * class and method name within the class. Target methods are assumed to be of
   * the form: public void someMethod(ActionEvent evt)
   * 
   * @param target
   *          The target object.
   * @param handlerMethodName
   *          The target method within the class.
   */
  public ReflectiveChangeListener(Object target, String handlerMethodName)
  {
    this.target = target;
    this.handlerMethodName = handlerMethodName;

    try
    {
      // Try to get the handler method:
      this.handlerMethod = target.getClass().getMethod(this.handlerMethodName,
          ObservableValue.class, Object.class, Object.class);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
      this.target = this;
      this.handlerMethodName = "changedError";

      try
      {
        this.handlerMethod = this.getClass().getMethod(this.handlerMethodName,
            ObservableValue.class, Object.class, Object.class);
      }
      catch(Exception iex)
      {
        iex.printStackTrace();
      }
    }
  }

  public void changedError(ObservableValue<? extends Object> obj0, Object obj1,
      Object obj2)
  {
    System.err.println("Invalid ReflectiveChangeListener: TARGET='" + target
        + "', TARGET-CLASS='" + target.getClass() + ", METHOD='"
        + handlerMethodName + "'");
  }

  public void changed(ObservableValue<? extends Object> obj0, Object obj1,
      Object obj2)
  {
    try
    {
      // System.out.println("EVENT: '" + event + "'");
      // System.out.println("EVENT-TARGET: '" + this.target + "'");
      // System.out.println("EVENT-METHOD: '" + this.handlerMethod + "'");

      this.handlerMethod.invoke(target, obj0, obj1, obj2);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
  }
}
