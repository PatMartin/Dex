package com.dexvis.javafx.scene.control;

import java.util.ArrayList;
import java.util.List;

import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.scene.Scene;
import javafx.scene.control.ContextMenu;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.control.MenuItem;
import javafx.scene.control.SelectionMode;
import javafx.scene.image.ImageView;
import javafx.scene.input.ClipboardContent;
import javafx.scene.input.DragEvent;
import javafx.scene.input.Dragboard;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.input.TransferMode;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import javafx.util.Callback;

import org.tbee.javafx.scene.layout.MigPane;

import com.dexvis.dex.DexConstants;
import com.dexvis.dex.wf.DexTask;
import com.dexvis.util.DexUtil;
import com.thoughtworks.xstream.annotations.XStreamOmitField;

public class DexTaskList extends ListView<DexTaskItem> implements DexConstants
{
  @XStreamOmitField
  private int insertionPoint = -1;
  @XStreamOmitField
  private ModalText modalText;
  @XStreamOmitField
  private Stage stage = null;
  @XStreamOmitField
  private List<DexTaskItem> copyTasks = new ArrayList<DexTaskItem>();
  
  public DexTaskList()
  {
    super();
    setCellFactory(new Callback<ListView<DexTaskItem>, ListCell<DexTaskItem>>()
    {
      @Override
      public ListCell<DexTaskItem> call(ListView<DexTaskItem> list)
      {
        return new DexTaskItemCell();
      }
    });
    
    getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);
    
    setOnKeyPressed(event -> keyPress(event));
    setOnDragOver(event -> onDragOver(event));
    setOnDragDropped(event -> onDragDropped(event));
    
    ContextMenu ctxMenu = new ContextMenu();
    MenuItem disableTask = new MenuItem("Disable");
    MenuItem enableTask = new MenuItem("Enable");
    MenuItem renameTask = new MenuItem("Rename");
    MenuItem configTask = new MenuItem("Configure");
    
    disableTask.setOnAction(action -> disableTask(action));
    enableTask.setOnAction(action -> enableTask(action));
    renameTask.setOnAction(action -> renameTask(action));
    configTask.setOnAction(action -> configTask(action));
    
    ctxMenu.getItems().addAll(disableTask, enableTask, renameTask, configTask);
    setOnDragDetected(event -> onDragDetected(event));
    setContextMenu(ctxMenu);
  }
  
  public void setStage(Stage stage)
  {
    this.stage = stage;
  }
  
  public class DexTaskItemCell extends ListCell<DexTaskItem>
  {
    private HBox hbox = new HBox();
    private ImageView imageView = new ImageView();
    private Label label = new Label("UNNAMED");
    
    public DexTaskItemCell()
    {
      this.hbox.getChildren().addAll(imageView, label);
      
      DexTaskItem item = getItem();
      if (item != null)
      {
        imageView.setImage(getItem().getImage());
        hbox.opacityProperty().bind(item.getOpacity());
        label.textProperty().bind(item.getName());
        setLabelColor(label, item);
      }
      
      setOnDragEntered(event -> onDragEntered(event));
      setOnDragExited(event -> onDragExited(event));
    }
    
    private void setLabelColor(Label label, DexTaskItem item)
    {
      if (item != null && item.getActive() != null && item.getActive().get())
      {
        label.setTextFill(Color.BLACK);
      }
      else
      {
        label.setTextFill(Color.RED);
      }
    }
    
    @Override
    public void updateItem(DexTaskItem item, boolean empty)
    {
      super.updateItem(item, empty);
      if (empty)
      {
        setText(null);
        setGraphic(null);
      }
      else
      {
        if (item != null)
        {
          imageView.setImage(item.getImage());
          label.textProperty().bind(item.getName());
          setLabelColor(label, item);
          hbox.opacityProperty().bind(item.getOpacity());
        }
        setGraphic(hbox);
      }
    }
    
    public void onDragEntered(DragEvent evt)
    {
      System.out.println("On Cell Drag Entered");
      /* the drag-and-drop gesture entered the target */
      /* show to the user that it is an actual gesture target */
      
      int index = getIndex();
      insertionPoint = index;
      
      label.setTextFill(Color.RED);
      evt.consume();
    }
    
    public void onDragExited(DragEvent evt)
    {
      System.out.println("On Cell Drag Exited");
      
      int index = getIndex();
      insertionPoint = index;
      setLabelColor(label, getItem());
      
      evt.consume();
    }
  }
  
  public void renameTask(ActionEvent evt)
  {
    // TODO: Replaced the actioneventhandler with an expression, weirdly, it
    // worked.
    // I am actually not sure why, how, or if it truly did work or introduced
    // some
    // subtle bug that it will take me hours to find later. Hence the TODO.
    modalText = new ModalText(stage, "Change Name", "Enter New Name:",
        getSelectionModel().getSelectedItem().getName().get(),
        event -> changeName(event));
  }
  
  public void configTask(ActionEvent evt)
  {
    try
    {
      Stage configStage = new Stage();
      MigPane rootLayout = new MigPane("", "[grow]", "[grow]");
      
      DexTask task = getSelectionModel().getSelectedItem().getTask().getValue();
      
      DexPropertySheet dps = task.getPropertySheet();
      
      System.out.println("Dex Property Sheet: " + dps);
      
      dps.setOnKeyPressed((event) -> {
        System.out.println("DEX Prop Sheet Event: '" + event + "'");
      });
      rootLayout.add(dps, "grow");
      
      Scene configScene = new Scene(rootLayout, 800, 600);
      configStage.setScene(configScene);
      configStage.show();
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
    
  }
  
  public void changeName(ActionEvent evt)
  {
    getSelectionModel().getSelectedItem().setName(modalText.getText());
  }
  
  public void enableTask(ActionEvent evt)
  {
    System.out.println("ENABLE EVENT: " + evt);
    ObservableList<Integer> selected = getSelectionModel().getSelectedIndices();
    ObservableList<DexTaskItem> items = getItems();
    
    for (int i : selected)
    {
      DexTaskItem task = items.get(i);
      task.setActive(true);
    }
    
    forcedRefresh();
  }
  
  public void disableTask(ActionEvent evt)
  {
    System.out.println("DISABLE EVENT: " + evt);
    ObservableList<Integer> selected = getSelectionModel().getSelectedIndices();
    ObservableList<DexTaskItem> items = getItems();
    for (int i : selected)
    {
      DexTaskItem task = items.get(i);
      task.setActive(false);
    }
    
    forcedRefresh();
  }
  
  public void enableAll()
  {
    for (DexTaskItem item : getItems())
    {
      item.setActive(true);
    }
    forcedRefresh();
  }
  
  public void disableAll()
  {
    for (DexTaskItem item : getItems())
    {
      item.setActive(false);
    }
    forcedRefresh();
  }
  
  private void forcedRefresh()
  {
    ObservableList<DexTaskItem> items = getItems();
    setItems(null);
    setItems(items);
  }
  
  public void keyPress(KeyEvent evt)
  {
    System.out.println("*** keypress: " + evt);
    
    if (evt.getCode().equals(KeyCode.DELETE))
    {
      int delIndex = getSelectionModel().getSelectedIndex();
      int size = getItems().size();
      
      if (delIndex >= 0 && delIndex < size)
      {
        System.out.println("Deleting Task: " + (delIndex + 1) + " of " + size);
        getItems().remove(delIndex);
      }
    }
    else if (evt.getCode().equals(KeyCode.C) && evt.isControlDown())
    {
      System.out.println("Control-C");
      
      copyTasks.clear();
      ObservableList<Integer> selected = getSelectionModel()
          .getSelectedIndices();
      ObservableList<DexTaskItem> items = getItems();
      for (int selectedIndex : selected)
      {
        copyTasks.add(items.get(selectedIndex).clone());
      }
    }
    else if (evt.getCode().equals(KeyCode.V) && evt.isControlDown())
    {
      if (copyTasks == null)
      {
        return;
      }
      
      int insertionIndex = getSelectionModel().getSelectedIndex();
      
      // Need to clone the entire list.
      List<DexTaskItem> copiedTasks = new ArrayList<DexTaskItem>();
      for (DexTaskItem task : copyTasks)
      {
        copiedTasks.add((DexTaskItem) (task.clone()));
      }
      
      getItems().addAll(insertionIndex, copiedTasks);
    }
    else
    {
      // System.out.println("Ignoring keypress");
    }
  }
  
  public List<DexTaskItem> getCopyTasks()
  {
    return copyTasks;
  }

  public void setCopyTasks(List<DexTaskItem> copyTasks)
  {
    this.copyTasks = copyTasks;
  }

  public void clearCopyTasks()
  {
    this.copyTasks.clear();
  }
  
  public void onDragOver(DragEvent evt)
  {
    evt.acceptTransferModes(TransferMode.ANY);
    evt.consume();
  }
  
  public void onDragDropped(DragEvent evt)
  {
    // System.out.println("On Drag Dropped");
    Dragboard db = evt.getDragboard();
    boolean success = false;
    
    try
    {
      if (db.hasContent(DEX_TASK_CREATE))
      {
        System.out.println("DND-RECEIVING: '" + db.getContent(DEX_TASK_CREATE) + "'");
        Class clazz = (Class) db.getContent(DEX_TASK_CREATE);
        DexTask task = (DexTask) clazz.newInstance();
        DexTaskItem item = new DexTaskItem(task);
        
        int insertionPoint = getInsertionPoint();
        System.out.println("Inserting at: " + insertionPoint + ", list size: "
            + getItems().size());
        
        if (insertionPoint >= 0 && insertionPoint <= getItems().size())
        {
          getItems().add(insertionPoint - 1, item);
        }
        else
        {
          getItems().add(item);
        }
        
        success = true;
      }
      else if (db.hasContent(DEX_TASK_LIST_MOVE))
      {
        int movingTo = getInsertionPoint();
        if (movingTo < 0)
        {
          movingTo = 0;
        }
        
        int movingFrom = (int) db.getContent(DEX_TASK_LIST_MOVE);
        
        if (movingFrom < movingTo)
        {
          DexTaskItem movingItem = getItems().remove(movingFrom);
          getItems().add(movingTo - 1, movingItem);
        }
        else if (movingFrom > movingTo)
        {
          DexTaskItem movingItem = getItems().remove(movingFrom);
          getItems().add(movingTo, movingItem);
        }
        
        System.out.println("MOVING: " + movingFrom + "->" + movingTo);
      }
      
      // Kludgey, but resets all items to active/inactive default opacity.
      List<DexTaskItem> items = getItems();
      for (DexTaskItem item : items)
      {
        System.out.println("Setting item: " + item.getName() + " opacity="
            + (item.getActive().get() ? "1.0" : "0.5"));
        item.getOpacity().set(item.getActive().get() ? 1.0 : .5);
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
    evt.setDropCompleted(success);
    evt.consume();
  }
  
  public void onDragDetected(MouseEvent evt)
  {
    System.out.println("On Drag Detected");
    DexTaskList source = (DexTaskList) evt.getSource();
    /* drag was detected, start a drag-and-drop gesture */
    /* allow any transfer mode */
    int movingFrom = source.getSelectionModel().getSelectedIndex();
    DexTaskItem item = source.getSelectionModel().getSelectedItem();
    Dragboard db = source.startDragAndDrop(TransferMode.COPY_OR_MOVE);
    
    /* Put a string on a dragboard */
    ClipboardContent content = new ClipboardContent();
    
    if (content != null && item != null && item.getTask() != null
        && item.getTask().get() != null)
    {
      content.put(DEX_TASK_LIST_MOVE, movingFrom);
      db.setContent(content);
    }
    
    evt.consume();
  }
  
  public int getInsertionPoint()
  {
    return insertionPoint;
  }
}
