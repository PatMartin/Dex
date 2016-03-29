package com.dexvis.dex.wf;

/**
 * 
 * This class provides information about the nature of a task.
 * 
 * @author Patrick E. Martin
 * 
 */
public class DexTaskMetaData
{
  private boolean taskRequiresInitialization = false;
  private boolean taskIsComposite = false;
  // Be pessimistic, must be explicitly set to be eligible to run within a non
  // JavaFX Application thread.
  private boolean taskExecutionUpdatesUI = true;
  private boolean taskInitializationUpdatesUI = true;
  private boolean taskIsHeadless = false;
  private boolean taskIsDatasource = false;
  private boolean taskIsInternal = false;

  // There is an opportunity here for describing task which can be
  // run in parallel. Think about the metaphor with types for more
  // sophisticated scheduling models.
  //
  // taskCanRunInParallel
  // taskCanRunInParallelWithinExtendedBasicBlock
  //
  // taskType = parallel | serial

  public DexTaskMetaData()
  {
  }

  public static DexTaskMetaData metaData()
  {
    return new DexTaskMetaData();
  }

  public boolean getTaskRequiresInitialization()
  {
    return taskRequiresInitialization;
  }

  public void setTaskRequiresInitialization(boolean taskRequiresInitialization)
  {
    this.taskRequiresInitialization = taskRequiresInitialization;
  }

  public boolean getTaskIsComposite()
  {
    return taskIsComposite;
  }

  public void setTaskIsComposite(boolean taskIsComposite)
  {
    this.taskIsComposite = taskIsComposite;
  }

  public boolean getTaskExecutionUpdatesUI()
  {
    return taskExecutionUpdatesUI;
  }

  public void setTaskExecutionUpdatesUI(boolean taskExecutionUpdatesUI)
  {
    this.taskExecutionUpdatesUI = taskExecutionUpdatesUI;
  }

  public boolean getTaskInitializationUpdatesUI()
  {
    return taskInitializationUpdatesUI;
  }

  public void setTaskInitializationUpdatesUI(boolean taskInitializationUpdatesUI)
  {
    this.taskInitializationUpdatesUI = taskInitializationUpdatesUI;
  }

  public boolean getTaskIsHeadless()
  {
    return taskIsHeadless;
  }

  public void setTaskIsHeadless(boolean taskIsHeadless)
  {
    this.taskIsHeadless = taskIsHeadless;
  }

  public boolean getTaskIsDatasource()
  {
    return taskIsDatasource;
  }

  public void setTaskIsDatasource(boolean taskIsDatasource)
  {
    this.taskIsDatasource = taskIsDatasource;
  }
  
  public boolean getTaskIsInternal()
  {
    return taskIsInternal;
  }

  public void setTaskIsInternal(boolean taskIsInternal)
  {
    this.taskIsInternal = taskIsInternal;
  }
}
