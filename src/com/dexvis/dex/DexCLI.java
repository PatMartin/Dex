package com.dexvis.dex;

import java.io.File;
import java.util.List;
import java.util.concurrent.CompletionService;
import java.util.concurrent.ExecutorCompletionService;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Options;
import org.apache.commons.lang3.concurrent.BasicThreadFactory;
import org.tbee.javafx.scene.layout.MigPane;

import com.dexvis.dex.exception.DexException;
import com.dexvis.dex.wf.DexJob;
import com.dexvis.dex.wf.DexJobScheduler;
import com.dexvis.dex.wf.DexTaskState;
import com.dexvis.dex.wf.SerialJob;
import com.dexvis.javafx.scene.control.DexTaskItem;
import com.dexvis.util.ThreadUtil;

public class DexCLI extends Application
{
  // Thread factory for executing task serially.
  private final static BasicThreadFactory serialThreadFactory = new BasicThreadFactory.Builder()
      .namingPattern("Dex-Serial-Task-%d").daemon(true)
      .priority(Thread.MAX_PRIORITY).build();
  
  // Executor for executing task serially.
  public final static ExecutorService serialExecutor = Executors
      .newSingleThreadExecutor(serialThreadFactory);
  
  // Thread factory for concurrent task execution. Such task may not update the
  // UI.
  private final static BasicThreadFactory concurrentThreadFactory = new BasicThreadFactory.Builder()
      .namingPattern("Dex-Concurrent-Task-%d").daemon(true)
      .priority(Thread.MAX_PRIORITY).build();
  
  // Executor for parallel task execution.
  public final static ExecutorService concurrentExecutor = Executors
      .newFixedThreadPool(
          Math.max(1, Runtime.getRuntime().availableProcessors() - 1),
          concurrentThreadFactory);
  
  // Service for task completion notification.
  public final static CompletionService<Object> CCS = new ExecutorCompletionService(
      concurrentExecutor);
  
  // Main stage
  private Stage stage = null;
  // Main scene.
  private Scene scene;
  private static String[] arguments;
  
  private void init(Stage stage)
  {
    try
    {
      this.stage = stage;
      stage.setTitle("Data Explorer");
      MigPane rootLayout = new MigPane("", "[grow]", "[][grow]");
      scene = new Scene(rootLayout, 1600, 900);
      stage.setScene(scene);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
  }
  
  public void start(Stage stage) throws Exception
  {
    init(stage);
    stage.show();
    Options options = new Options();
    options.addOption("p", "project", true, "The project to be run.");
    CommandLineParser parser = new DefaultParser();
    CommandLine cmd = parser.parse(options, arguments);
    System.out.println("Running: " + cmd.getOptionValue("project"));
    DexProject project = DexProject.readProject(stage,
        new File(cmd.getOptionValue("project")));
    List<DexTaskItem> tasks = project.getTaskItems();
    
    int taskNum = 1;
    DexTaskState state = new DexTaskState();
    long projectStartTime = System.currentTimeMillis();
    long taskStartTime;
    for (DexTaskItem task : tasks)
    {
      taskStartTime = System.currentTimeMillis();
      System.out.println("  TASK[" + taskNum + "]: '"
          + task.getName().getValue() + "'");
      //long startTime = System.currentTimeMillis();
      if (task.getActive().getValue())
      {
        state = task.getTask().getValue().execute(state);
      }
      System.out.println("    " + (System.currentTimeMillis() - taskStartTime) + " ms");
      taskNum++;
    }
    serialExecutor.shutdown();
    concurrentExecutor.shutdown();
    if (!serialExecutor.awaitTermination(3600, TimeUnit.SECONDS))
    {
      serialExecutor.shutdownNow();
    }
    if (!concurrentExecutor.awaitTermination(3600, TimeUnit.SECONDS))
    {
      concurrentExecutor.shutdownNow();
    }
    System.out.println("Excecution Completed In: " + (System.currentTimeMillis() - projectStartTime) + " ms");

    Platform.exit();
  }
  
  public void exit(ActionEvent evt)
  {
    System.exit(0);
  }
  
  private static void setDefault(String propertyName, String propertyValue)
  {
    if (!System.getProperties().containsKey(propertyName))
    {
      System.setProperty(propertyName, propertyValue);
    }
  }
  
  public static void main(String[] args)
  {
    arguments = args;
    Platform.setImplicitExit(false);
    
    // Headless params, overridable from command line.
    setDefault("glass.platform", "Monocle");
    setDefault("monocle.platform", "Headless");
    setDefault("prism.order", "sw");
    setDefault("prism.text", "t2k");
    setDefault("headless.geometry", "1600x1200-32");
    
    launch(args);
  }
}
