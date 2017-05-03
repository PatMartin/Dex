package com.dexvis.javafx.event;

import java.lang.reflect.Method;

import javafx.event.EventHandler;
import javafx.scene.input.MouseEvent;

/**
 * 
 * This is a general purpose action listener. It invokes the supplied routine in
 * the supplied target class when invoked.
 * 
 * @author Patrick E. Martin
 * 
 */
public class ReflectiveMouseEventHandler implements EventHandler<MouseEvent>
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
  public ReflectiveMouseEventHandler(Object target, String handlerMethodName)
  {
    this.target = target;
    this.handlerMethodName = handlerMethodName;

    try
    {
      // Try to get the handler method:
      this.handlerMethod = target.getClass().getMethod(this.handlerMethodName,
          MouseEvent.class);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
      this.target = this;
      this.handlerMethodName = "handleError";

      try
      {
        this.handlerMethod = this.getClass().getMethod(this.handlerMethodName,
            MouseEvent.class);
      }
      catch(Exception iex)
      {
        iex.printStackTrace();
      }
    }
  }

  /**
   * 
   * Handle the event by invoking the target method. Pass the event on through.
   * 
   * @param event
   *          The event to be handled.
   */
  public void handle(MouseEvent event)
  {
    try
    {
      // System.out.println("EVENT: '" + event + "'");
      // System.out.println("EVENT-TARGET: '" + this.target + "'");
      // System.out.println("EVENT-METHOD: '" + this.handlerMethod + "'");

      this.handlerMethod.invoke(target, event);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
  }

  /**
   * 
   * If there is no handler, this is invoked instead. That way missing method
   * handlers are easily identified.
   * 
   * @param event
   *          The event that we could not handle.
   */
  public void handleError(MouseEvent event)
  {
    System.err.println("Invalid ReflectiveMouseEventHandler: TARGET='" + target
        + "', TARGET-CLASS='" + target.getClass() + ", METHOD='"
        + handlerMethodName + "'");
  }

}
