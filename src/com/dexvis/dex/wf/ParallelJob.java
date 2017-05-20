package com.dexvis.dex.wf;

import java.util.ArrayList;
import java.util.List;

import javafx.stage.Stage;

import com.dexvis.dex.exception.DexException;
import com.dexvis.javafx.scene.control.DexTaskItem;

public class ParallelJob implements DexJob
{
  private Stage stage = null;
  private List<DexTask> taskList = new ArrayList<DexTask>();
  private boolean terminated = false;

  public ParallelJob(List<DexTaskItem> itemList)
  {
    for (DexTaskItem item : itemList)
    {
      if (item != null)
      {
        if (item.getTask() != null)
        {
          DexTask task = item.getTask().get();
          if (task != null)
          {
            taskList.add(task);
          }
        }
      }
    }
  }
  
  public void terminate()
  {
    setTerminated(true);
  }
  
  public boolean isTerminated()
  {
    return terminated;
  }

  public void setTerminated(boolean terminated)
  {
    this.terminated = terminated;
  }

  @Override
  public DexJobState execute() throws DexException
  {
    DexJobState status = DexJobState.startState();
    DexTaskState state = new DexTaskState();
    
    // Need independent task state for each task.
    for (DexTask task : taskList)
    {
      if (!isTerminated())
      {
        state = task.execute(state);
      }
    }
    
    return status;
  }
  
  @Override
  public DexJobState start() throws DexException
  {
    DexJobState status = DexJobState.startState();
    DexTaskState state = new DexTaskState();
    
    for (DexTask task : taskList)
    {
      state = task.start(state);
    }
    
    return status;
  }
  
  @Override
  public void setStage(Stage stage) throws DexException
  {
    this.stage = stage;
  }
  
  @Override
  public Stage getStage() throws DexException
  {
    return stage;
  }
  
  @Override
  public List<DexTask> getTaskList()
  {
    return taskList;
  }
}
