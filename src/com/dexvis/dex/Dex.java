package com.dexvis.dex;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Modifier;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletionService;
import java.util.concurrent.ExecutorCompletionService;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.beans.value.ChangeListener;
import javafx.collections.FXCollections;
import javafx.event.ActionEvent;
import javafx.geometry.Orientation;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Menu;
import javafx.scene.control.MenuBar;
import javafx.scene.control.MenuItem;
import javafx.scene.control.SplitPane;
import javafx.scene.control.TreeItem;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.text.Text;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

import org.apache.commons.lang3.concurrent.BasicThreadFactory;
import org.tbee.javafx.scene.layout.MigPane;

import com.dexvis.dex.collections.HierarchicalMap;
import com.dexvis.dex.wf.DexJob;
import com.dexvis.dex.wf.DexJobScheduler;
import com.dexvis.dex.wf.DexTask;
import com.dexvis.dex.wf.SerialJob;
import com.dexvis.javafx.scene.control.DexFileChooser;
import com.dexvis.javafx.scene.control.DexOptions;
import com.dexvis.javafx.scene.control.DexTaskItem;
import com.dexvis.javafx.scene.control.DexTaskList;
import com.dexvis.javafx.scene.control.DexTaskTree;
import com.dexvis.javafx.scene.control.ModalDialog;
import com.dexvis.util.ClassPathUtil;
import com.dexvis.util.SortedList;

/**
 * 
 * This is the main class for Dex.
 * 
 * @author Patrick Martin
 *
 */
public class Dex extends Application
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
  
  static
  {
    // Output this just to make sure the system properly identifies the
    // available core.
    System.out.println("Available Processors: "
        + Runtime.getRuntime().availableProcessors());
  }
  
  // GUI component housing our project name. Defaults to UnsavedProject.dex
  private StringProperty curProjectStringProp = new SimpleStringProperty(
      "UnsavedProject.dex");
  
  // The list of task to be executed.
  private DexTaskList taskList = null;
  
  // Pane containing our available tasks.
  private MigPane palettePane = new MigPane("insets 1", "[grow]", "[grow][]");
  
  // The workflow tasks pane.
  private MigPane workflowPane = new MigPane("insets 1", "[grow]", "[grow]");
  
  // Main stage.
  private Stage stage = null;
  
  // Holds our current project.
  private DexProject project = null;
  
  // Main scene.
  private Scene scene;
  
  // Allows us to load projects from disk.
  private DexFileChooser projectChooser = new DexFileChooser("project",
      "Load Project", "Save Project", "DEX", "dex");
  
  // Handles task selection within the palette by displaying the help screen for
  // that task within the workflow pane.
  ChangeListener<Object> taskChange = (ov, objOld, objNew) -> {
    // System.out.println("*** Task Change: ov='" + ov + "', old='" + objOld
    // + "', new='" + objNew + "'");
    if (objNew == null)
    {
      return;
    }
    DexTaskItem item = ((TreeItem<DexTaskItem>) objNew).getValue();
    if (item != null && item.getTask() != null && item.getTask().get() != null)
    {
      workflowPane.getChildren().clear();
      Node helpNode = item.getTask().get().getHelp();
      workflowPane.add(helpNode, "grow");
    }
  };
  
  // Handles task selection within the workflow by displaying their config
  // and/or output.
  ChangeListener<Object> activeTaskChange = (ov, objOld, objNew) -> {
    // System.out.println("*** Active Task Change: " + objNew);
    
    // Defensive coding, ensure something is selected.
    if (objNew == null)
    {
      return;
    }
    
    // Get the number of selected task.
    int numSelected = taskList.getSelectionModel().getSelectedIndices().size();
    
    // Determine when to wrap to the next row.
    int wrapNum = (int) Math.ceil(Math.sqrt(numSelected));
    
    // Main container for displayed task.
    MigPane taskContainer = new MigPane("", "[grow]", "[grow]");
    
    // Clear out the old workflow view.
    workflowPane.getChildren().clear();
    
    // System.out.println("WRAPPING: " + numSelected + "->" + wrapNum);
    int itemNum = 0;
    for (DexTaskItem item : taskList.getSelectionModel().getSelectedItems())
    {
      if (item != null)
      {
        itemNum++;
        Node configNode = item.getTask().get().getConfig();
        // If the last, grow as much as we can.
        if (itemNum == taskList.getSelectionModel().getSelectedItems().size())
        {
          taskContainer.add(configNode, "growx,growy,span");
        }
        // If on a row border, grow and span.
        else if (itemNum % wrapNum == 0)
        {
          taskContainer.add(configNode, "growx,growy,span");
        }
        else
        {
          taskContainer.add(configNode, "growx,growy");
        }
      }
    }
    workflowPane.add(taskContainer, "grow,span");
  };
  
  private void init(Stage stage)
  {
    try
    {
      this.stage = stage;
      stage.setTitle("Data Explorer");
      
      MigPane rootLayout = new MigPane("", "[grow]", "[][grow]");
      MigPane topMenuPane = new MigPane("", "[][][grow]", "[]");
      MenuBar menubar = new MenuBar();
      menubar.setId("dex-main-menubar");
      
      Menu fileMenu = new Menu("File");
      MenuItem newMenuItem = new MenuItem("New Project");
      MenuItem openMenuItem = new MenuItem("Open Project");
      MenuItem appendMenuItem = new MenuItem("Append Project");
      MenuItem prependMenuItem = new MenuItem("Prepend Project");
      MenuItem saveMenuItem = new MenuItem("Save Project");
      MenuItem exitMenuItem = new MenuItem("Exit");
      Menu optionsMenu = new Menu("Options");
      MenuItem generalOptionsMenuItem = new MenuItem("General Options");
      generalOptionsMenuItem.setOnAction(action -> options(action));
      generalOptionsMenuItem.setOnAction(action -> options(action));
      MenuItem reloadStylesheetsMenuItem = new MenuItem("Reload Stylesheets");
      reloadStylesheetsMenuItem.setOnAction(action -> reloadStylesheets());
      optionsMenu.getItems().addAll(generalOptionsMenuItem,
          reloadStylesheetsMenuItem);
      newMenuItem.setOnAction(action -> newProject(action));
      openMenuItem.setOnAction(action -> open(action));
      appendMenuItem.setOnAction(action -> append(action));
      prependMenuItem.setOnAction(action -> prepend(action));
      saveMenuItem.setOnAction(action -> save(action));
      exitMenuItem.setOnAction(action -> exit(action));
      fileMenu.getItems().addAll(newMenuItem, openMenuItem, appendMenuItem,
          prependMenuItem, saveMenuItem, exitMenuItem);
      Menu helpMenu = new Menu("Help");
      MenuItem aboutMenuItem = new MenuItem("About Data Explorer");
      aboutMenuItem.setOnAction(action -> about(action));
      MenuItem userGuideMenuItem = new MenuItem("User Guide");
      userGuideMenuItem.setOnAction(action -> userguide(action));
      helpMenu.getItems().addAll(aboutMenuItem, userGuideMenuItem);
      menubar.getMenus().addAll(fileMenu, optionsMenu, helpMenu);
      // Text infoLabel = TextUtil.DropShadow("Info:");
      
      Label curFileLabel = new Label("Filename:");
      curFileLabel.setId("dex-curfile-label");
      Text curFileText = new Text();
      curFileText.textProperty().bind(curProjectStringProp);
      
      topMenuPane.add(menubar);
      topMenuPane.add(curFileLabel);
      topMenuPane.add(curFileText, "span");
      // topMenuPane.add(getTaskManager(), "span");
      // /////////////////////////////////////////////////////////////////////
      // Workflow
      // /////////////////////////////////////////////////////////////////////
      taskList = new DexTaskList();
      taskList.setStage(stage);
      taskList.getSelectionModel().selectedItemProperty()
          .addListener(activeTaskChange);
      DexTaskTree taskTree = new DexTaskTree(getTasks());
      taskTree.getSelectionModel().selectedItemProperty()
          .addListener(taskChange);
      taskTree.setOnMouseClicked(event -> onMouseClick(event));
      // Button initWfButton = new Button("Initialize");
      Button executeWfButton = new Button("Execute");
      // initWfButton.setOnAction(action -> initializeWorkflow(action));
      executeWfButton.setOnAction(action -> executeWorkflow(action));
      workflowPane.setStyle("-fx-background-color: grey;");
      
      Button enableAllButton = new Button("Enable All");
      enableAllButton.setOnAction(action -> taskList.enableAll());
      
      Button disableAllButton = new Button("Disable All");
      disableAllButton.setOnAction(action -> taskList.disableAll());
      
      MigPane taskPane = new MigPane("", "[grow][grow]", "[grow][]");
      
      taskPane.add(taskList, "grow, span");
      taskPane.add(enableAllButton, "growx");
      taskPane.add(disableAllButton, "growx, span");
      
      SplitPane paletteAndWFSplitPane = new SplitPane();
      paletteAndWFSplitPane.setOrientation(Orientation.HORIZONTAL);
      paletteAndWFSplitPane.getItems().addAll(taskTree, taskPane);
      paletteAndWFSplitPane.setDividerPositions(.50f);
      
      palettePane.add(paletteAndWFSplitPane, "grow, span");
      palettePane.add(executeWfButton, "growx, span");
      
      SplitPane wfAndDisplaySplitPane = new SplitPane();
      wfAndDisplaySplitPane.setOrientation(Orientation.HORIZONTAL);
      wfAndDisplaySplitPane.getItems().addAll(palettePane, workflowPane);
      wfAndDisplaySplitPane.setDividerPositions(0.25f);
      rootLayout.add(topMenuPane, "growx,span");
      rootLayout.add(wfAndDisplaySplitPane, "grow");
      rootLayout.setOnKeyPressed(action -> keyPress(action));
      rootLayout.getStyleClass().add("root");
      scene = new Scene(rootLayout, 1600, 900);
      // AquaFx.style();
      scene.getStylesheets().add("Dex.css");
      // scene.getStylesheets().add("/win7glass.css");
      stage.setScene(scene);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
  }
  
  public void exit(ActionEvent evt)
  {
    System.exit(0);
  }
  
  public void newProject(ActionEvent evt)
  {
    curProjectStringProp.set("UnsavedProject.dex");
    taskList.getItems().clear();
  }
  
  // TODO: Make sure we clear out everything else we care about too.
  public void open(ActionEvent evt)
  {
    try
    {
      File projectFile = projectChooser.load(evt);
      if (projectFile != null)
      {
        project = DexProject.readProject(stage, projectFile);
        clearOldProject();
        taskList.setItems(FXCollections.observableArrayList(project
            .getTaskItems()));
        curProjectStringProp.set(projectFile.toString());
      }
    }
    catch(Exception ex)
    {
      StringWriter sw = new StringWriter();
      ex.printStackTrace(new PrintWriter(sw));
      ModalDialog dialog = new ModalDialog(stage, "Open Status", sw.toString(),
          "Ok");
      ex.printStackTrace();
    }
  }
  
  private void clearOldProject()
  {
    // Clear the task list.
    taskList.getItems().clear();
    // Reset the project name.
    curProjectStringProp.set("UnnamedProject.dex");
    
    // Clear the copy buffer?
    // taskList.clearCopyTasks();
  }
  
  public void append(ActionEvent evt)
  {
    try
    {
      File projectFile = projectChooser.load(evt);
      if (projectFile != null)
      {
        DexProject project = DexProject.readProject(stage, projectFile);
        taskList.getItems().addAll(project.getTaskItems());
      }
    }
    catch(Exception ex)
    {
      StringWriter sw = new StringWriter();
      ex.printStackTrace(new PrintWriter(sw));
      ModalDialog dialog = new ModalDialog(stage, "Open Status", sw.toString(),
          "Ok");
      ex.printStackTrace();
    }
  }
  
  public void prepend(ActionEvent evt)
  {
    try
    {
      File projectFile = projectChooser.load(evt);
      if (projectFile != null)
      {
        DexProject project = DexProject.readProject(stage, projectFile);
        taskList.getItems().addAll(0, project.getTaskItems());
      }
    }
    catch(Exception ex)
    {
      StringWriter sw = new StringWriter();
      ex.printStackTrace(new PrintWriter(sw));
      ModalDialog dialog = new ModalDialog(stage, "Open Status", sw.toString(),
          "Ok");
      ex.printStackTrace();
    }
  }
  
  public void save(ActionEvent evt)
  {
    try
    {
      File saveFile = projectChooser.save(evt);
      if (saveFile != null)
      {
        DexProject project = new DexProject();
        for (DexTaskItem task : taskList.getItems())
        {
          project.addDataFilter(task);
        }
        project.writeProject(saveFile);
        curProjectStringProp.set(saveFile.toString());
      }
    }
    catch(Exception ex)
    {
      StringWriter sw = new StringWriter();
      ex.printStackTrace(new PrintWriter(sw));
      ModalDialog dialog = new ModalDialog(stage, "Save Status", sw.toString(),
          "Ok");
      ex.printStackTrace();
    }
  }
  
  public void keyPress(KeyEvent keyEvent)
  {
    // System.out.println("EVENT: " + evt);
    if (keyEvent.isControlDown() && keyEvent.getCode() == KeyCode.S)
    {
      System.out.println("Saving: '" + curProjectStringProp.get() + "'");
      try
      {
        File saveFile = new File(curProjectStringProp.get());
        if (saveFile != null)
        {
          DexProject project = new DexProject();
          for (DexTaskItem task : taskList.getItems())
          {
            project.addDataFilter(task);
          }
          project.writeProject(saveFile);
        }
      }
      catch(Exception ex)
      {
        StringWriter sw = new StringWriter();
        ex.printStackTrace(new PrintWriter(sw));
        ModalDialog dialog = new ModalDialog(stage, "Save Status",
            sw.toString(), "Ok");
        ex.printStackTrace();
      }
    }
    // Control-O : Open project
    else if (keyEvent.isControlDown() && keyEvent.getCode() == KeyCode.O)
    {
      System.out.println("Opening: '" + curProjectStringProp.get() + "'");
      open(new ActionEvent());
    }
    // Run:
    else if (keyEvent.isControlDown() && keyEvent.getCode() == KeyCode.R)
    {
      executeWorkflow(new ActionEvent());
    }
  }
  
  public void executeWorkflow(ActionEvent evt)
  {
    System.out.println("Execute Workflow: ");
    DexJobScheduler scheduler = new DexJobScheduler();
    DexJob job = new SerialJob(taskList.getItems());
    try
    {
      job.setStage(stage);
    }
    catch(Exception ex)
    {
      // Harmless, no progress bar.
    }
    try
    {
      scheduler.execute(job);
    }
    catch(Exception ex)
    {
      StringWriter sw = new StringWriter();
      ex.printStackTrace(new PrintWriter(sw));
      ModalDialog dialog = new ModalDialog(stage, "Execution Status",
          sw.toString(), "Ok");
      ex.printStackTrace();
    }
  }
  
  public void onMouseClick(MouseEvent evt)
  {
    System.out.println("Mouse Click Detected: " + evt.getClickCount());
    if (evt.getClickCount() > 1)
    {
      DexTaskTree source = (DexTaskTree) evt.getSource();
      if (source != null && source.getSelectionModel() != null
          && source.getSelectionModel().getSelectedItem() != null)
      {
        DexTaskItem item = source.getSelectionModel().getSelectedItem()
            .getValue();
        DexTask task = item.getTask().get();
        try
        {
          if (task != null)
          {
            DexTask newTask = task.getClass().newInstance();
            newTask.setStage(stage);
            DexTaskItem newItem = new DexTaskItem(item);
            taskList.getItems().add(newItem);
          }
        }
        catch(Exception ex)
        {
          ex.printStackTrace();
        }
      }
    }
    else
    {
      try
      {
        Thread.sleep(300);
      }
      catch(InterruptedException iEx)
      {
      }
    }
    evt.consume();
  }
  
  // Find task classes which:
  //
  // 1) Have the pattern "task" in the name.
  // 2) Are assignment compatible with the DexTask interface.
  // 3) Are not abstract or an interface.
  final static Predicate<String> isDexTask = (final String className) -> {
    if (className == null || className.indexOf("task") <= 0)
    {
      return false;
    }
    try
    {
      Class clazz = Class.forName(className);
      boolean matches = clazz != null && DexTask.class.isAssignableFrom(clazz)
          && !Modifier.isAbstract(clazz.getModifiers())
          && !Modifier.isInterface(clazz.getModifiers());
      // System.out.println("Class " + className + ": " + matches);
      return matches;
    }
    catch(Exception ex)
    {
      return false;
    }
  };
  
  private Map<String, Object> getTasks()
  {
    Map<String, Object> taskMap = new HierarchicalMap<String, Object>();
    List<DexTask> subList;
    try
    {
      System.out.println("*** Searching for Dex Task inside your classpath...");
      List<String> classNameList = ClassPathUtil.getClasses().stream()
          // Remove the .class suffix
          .map(path -> path.substring(0, path.length() - 6)).filter(isDexTask)
          .collect(Collectors.toList());
      for (String taskName : classNameList)
      {
        System.out.println("Found Task: '" + taskName + "'");
        try
        {
          DexTask task = (DexTask) Class.forName(taskName).newInstance();
          // System.out.println("-- TASK: " + task);
          task.setStage(stage);
          String category = task.getCategory();
          if (taskMap.containsKey(category))
          {
            subList = (List<DexTask>) taskMap.get(category);
          }
          else
          {
            System.out.println("  ** NEW CATEGORY: '" + category + "'");
            subList = new SortedList<DexTask>();
            taskMap.put(task.getCategory(), subList);
          }
          subList.add(task);
        }
        catch(Exception ex)
        {
          // Abstract classes which can't be instantiated.
          if (!taskName.equals("com.dexvis.dex.task.base.WebTask")
              && !taskName.equals("com.dexvis.dex.wf.DexTask"))
          {
            ex.printStackTrace();
          }
        }
      }
    }
    catch(Exception ex)
    {
      // REM: Handle abstract classes.
      // Report and skip for now.
      ex.printStackTrace();
    }
    return taskMap;
  }
  
  public void about(ActionEvent evt)
  {
    try
    {
      Stage helpStage = new Stage();
      MigPane rootLayout = new MigPane("", "[grow]", "[grow]");
      WebView wv = new WebView();
      WebEngine we = wv.getEngine();
      String PAGE = "https://patmartin.gitbooks.io/dex-docs/content/about.html";
      
      we.load(PAGE);
      rootLayout.add(wv, "grow");
      Scene helpScene = new Scene(rootLayout, 800, 600);
      helpStage.setScene(helpScene);
      helpStage.show();
    }
    catch(Exception ex)
    {
      // ex.printStackTrace();
    }
  }
  
  public void options(ActionEvent evt)
  {
    try
    {
      DexOptions options = DexOptions.readOptions();
      options.initialize(stage, this);
    }
    catch(Exception ex)
    {
      DexOptions options = new DexOptions();
      options.initialize(stage, this);
      // ex.printStackTrace();
    }
  }
  
  public void reloadStylesheets()
  {
    try
    {
      System.out.println("Reloading stylesheet: Dex.css");
      // scene.getStylesheets().clear();
      scene.getStylesheets().add("Dex.css");
    }
    catch(Exception ex)
    {
      // ex.printStackTrace();
    }
  }
  
  public void userguide(ActionEvent evt)
  {
    try
    {
      Stage helpStage = new Stage();
      MigPane rootLayout = new MigPane("", "[grow]", "[grow]");
      WebView wv = new WebView();
      WebEngine we = wv.getEngine();
      String PAGE = "https://patmartin.gitbooks.io/dex-docs/content/index.html";
      // File helpFile = new File(PAGE);
      // URL helpURL = helpFile.toURL();
      we.load(PAGE);
      rootLayout.add(wv, "grow");
      Scene helpScene = new Scene(rootLayout, 800, 600);
      helpStage.setScene(helpScene);
      helpStage.show();
    }
    catch(Exception ex)
    {
      // ex.printStackTrace();
    }
  }
  
  // Might be nice.
  public Node getTaskManager()
  {
    return new Button("Cancel");
  }
  
  @Override
  public void start(Stage stage) throws Exception
  {
    init(stage);
    stage.sizeToScene();
    stage.show();
  }
  
  public static void main(String[] args)
  {
    // ProxySelector.setDefault(ProxySelector.getDefault());
    Platform.setImplicitExit(false);
    launch(args);
  }
}
