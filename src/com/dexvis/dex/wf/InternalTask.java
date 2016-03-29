package com.dexvis.dex.wf;

import java.util.concurrent.Callable;
import java.util.function.Supplier;

/**
 * 
 * Tasks derived from me are considered internal.
 *
 */
public class InternalTask implements Callable<Object>
{
  private String taskName = null;
  private Supplier<Object> task = null;

  public InternalTask(String taskName, Supplier<Object> task)
  {
    this.taskName = taskName;
    this.task = task;
  }

  @Override
  public Object call() throws Exception
  {
    return task.get();
  }
}
