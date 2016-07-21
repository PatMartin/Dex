package com.dexvis.dex.wf;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javafx.concurrent.Task;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.ImageView;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import javafx.stage.StageBuilder;
import javafx.util.Callback;

import org.controlsfx.control.TaskProgressView;
import org.tbee.javafx.scene.layout.MigPane;

import com.dexvis.dex.Dex;
import com.dexvis.dex.exception.DexException;
import com.dexvis.javafx.scene.control.DexTaskItem;
import com.dexvis.javafx.scene.control.ModalDialog;
import com.dexvis.util.ThreadUtil;

public class SerialJob implements DexJob
{
  private List<DexTask> taskList = new ArrayList<DexTask>();
  private TaskProgressView<DexTask> progress = new TaskProgressView<DexTask>();
  private Stage stage = null;
  
  private Callback<DexTask, Node> factory = null;
  
  public SerialJob(List<DexTaskItem> itemList)
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
    
    factory = (task) -> {
      return new ImageView(task.getImage());
    };
    
    progress.setGraphicFactory(factory);
  }
  
  private class JobTask extends Task<SerialJob>
  {
    private SerialJob job = null;
    
    public JobTask(SerialJob job)
    {
      this.job = job;
    }
    
    @Override
    protected SerialJob call() throws Exception
    {
      long jobStartTime = System.currentTimeMillis();
      long startTime = jobStartTime;
      DexTaskState state = new DexTaskState();
      boolean ERROR = false;
      
      for (DexTask task : job.getTaskList())
      {
        if (task.getActive())
        {
          try
          {
            if (ERROR)
            {
              task.updateMessage("Aborted due to previous error.");
              task.progressAborted();
            }
            else if (isCancelled())
            {
              task.updateMessage("Execution terminated by users.");
              task.progressAborted();
            }
            else
            {
              startTime = System.currentTimeMillis();
              task.updateMessage("Executing: " + task.getName());
              task.updateProgress(0);
              
              if (task.getMetaData().getTaskExecutionUpdatesUI())
              {
                task.setDexTaskState(state);
                ThreadUtil.runAndWait(() -> {
                  try
                  {
                    task.setDexTaskState(task.execute(task.getDexTaskState()));
                  }
                  catch(DexException dEx)
                  {
                    dEx.printStackTrace();
                  }
                });
                
                state = task.getDexTaskState();
              }
              else
              {
                state = task.execute(state);
              }
              task.updateMessage("Completed: "
                  + (System.currentTimeMillis() - startTime) + " ms");
              task.updateProgress(100);
              task.done();
            }
          }
          catch(Exception ex)
          {
            if(ex instanceof InterruptedException){
              if(isCancelled()) {
                task.updateMessage("Execution terminated by users.");
                task.progressAborted();
              }
            }
            ERROR = true;
            task.updateMessage("Error: " + task.getName() + " after "
                + (System.currentTimeMillis() - startTime) + " ms");
            task.progressAborted();
            
            ThreadUtil.runAndWait(() -> {
              StringWriter sw = new StringWriter();
              ex.printStackTrace(new PrintWriter(sw));
              
              // Can't do this here, must pass the error back to JFX App Thread
                ModalDialog dialog = new ModalDialog(stage, "Error", sw
                    .toString(), "Ok");
              });
            
            ex.printStackTrace();
          }
        }
      }
      return job;
    }
  }
  
  @Override
  public DexJobState initialize() throws DexException
  {
    DexJobState status = DexJobState.startState();
    DexTaskState state = new DexTaskState();
    
    for (DexTask task : taskList)
    {
      if (task.getActive())
      {
        state = task.initialize(state);
      }
    }
    
    return status;
  }
  
  @Override
  public DexJobState execute() throws DexException
  {
    DexJobState status = DexJobState.startState();
    DexTaskState state = new DexTaskState();
    
    progress.getTasks().clear();
    
    final Stage stage = StageBuilder.create().focused(true)
        .title("Job Execution").height(500).width(600).resizable(true).build();
    
    // Initialize the Stage with type of modal
    // stage.initModality(Modality.APPLICATION_MODAL);
    // Set the owner of the Stage
    stage.initOwner(getStage());
    
    MigPane progressPane = new MigPane("", "[grow]", "[grow][]");
    
    JobTask jobTask = new JobTask(this);
    
    // Launch a progress view.
    for (DexTask task : taskList)
    {
      if (task.getActive())
      {
        task.updateTitle(task.getName());
        task.updateMessage("Waiting to execute");
        task.updateProgress(0);
        progress.getTasks().add(task);
      }
    }
    
    Button cancelButton = new Button("Cancel");
    cancelButton.setOnAction((action) -> {
      // TODO: Figure out how to cancel task on a daemon.
        jobTask.cancel(true);
        //Dex.serialExecutor.shutdownNow();
        //Dex.concurrentExecutor.shutdownNow();
        stage.hide();
      });
    
    Button dismissButton = new Button("Dismiss");
    dismissButton.setOnAction((action) -> {
      // TODO: Figure out thread control.
      // executorService.shutdownNow();
      // executorService = Executors.newSingleThreadExecutor(threadFactory);
      // progress.getTasks().clear();
        stage.hide();
      });
    
    Button bgButton = new Button("Run in Background");
    bgButton.setOnAction((action) -> {
      // executorService.shutdownNow();
      // progress.getTasks().clear();
        stage.hide();
        // executorService.shutdown();
      });
    
    progressPane.add(progress, "grow,span");
    progressPane.add(cancelButton);
    progressPane.add(dismissButton);
    progressPane.add(bgButton, "span");
    
    Scene scene = new Scene(progressPane, Color.LIGHTBLUE);
    stage.setScene(scene);
    stage.show();
    
    // Executor.
    Dex.serialExecutor.submit(jobTask);
    return status;
  }
  
  @Override
  public DexJobState terminate() throws DexException
  {
    DexJobState status = DexJobState.startState();
    DexTaskState state = new DexTaskState();
    
    for (DexTask task : taskList)
    {
      if (task.getActive())
      {
        state = task.terminate(state);
      }
    }
    
    return status;
  }
  
  @Override
  public DexJobState suspend() throws DexException
  {
    DexJobState status = DexJobState.startState();
    DexTaskState state = new DexTaskState();
    
    for (DexTask task : taskList)
    {
      if (task.getActive())
      {
        state = task.suspend(state);
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
      if (task.getActive())
      {
        state = task.start(state);
      }
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
  
  public List<DexTask> getTaskList()
  {
    return taskList;
  }
  
  public void setTaskList(List<DexTask> taskList)
  {
    this.taskList = taskList;
  }
}
