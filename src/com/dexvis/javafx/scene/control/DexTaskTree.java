package com.dexvis.javafx.scene.control;

import java.util.List;
import java.util.Map;

import javafx.scene.control.Label;
import javafx.scene.control.TreeCell;
import javafx.scene.control.TreeItem;
import javafx.scene.control.TreeView;
import javafx.scene.image.ImageView;
import javafx.scene.input.ClipboardContent;
import javafx.scene.input.Dragboard;
import javafx.scene.input.MouseEvent;
import javafx.scene.input.TransferMode;
import javafx.scene.layout.HBox;
import javafx.util.Callback;

import com.dexvis.dex.DexConstants;
import com.dexvis.dex.wf.DexTask;
import com.dexvis.javafx.event.ReflectiveMouseEventHandler;
import com.dexvis.util.DexUtil;

public class DexTaskTree extends TreeView<DexTaskItem> implements DexConstants
{
  public DexTaskTree(Map<String, Object> taskMap)
  {
    super();
    
    TreeItem<DexTaskItem> rootItem = new TreeItem<DexTaskItem>(new DexTaskItem(
        "Root"));
    rootItem.setExpanded(true);
    
    // System.out.println("TASKMAP: " + taskMap);
    add(rootItem, taskMap);
    
    setCellFactory(new Callback<TreeView<DexTaskItem>, TreeCell<DexTaskItem>>()
    {
      @Override
      public TreeCell<DexTaskItem> call(TreeView<DexTaskItem> list)
      {
        return new DexTaskTreeItemCell();
      }
    });
    
    setRoot(rootItem);
    setShowRoot(false);
    setOnDragDetected((event) -> {
      onDragDetected(event);
    });
  }
  
  private void add(TreeItem<DexTaskItem> parent, Map<String, Object> taskMap)
  {
    for (String key : taskMap.keySet())
    {
      Object obj = taskMap.get(key);
      
      if (obj instanceof Map)
      {
        TreeItem<DexTaskItem> subtree = new TreeItem<DexTaskItem>(
            new DexTaskItem(key));
        parent.getChildren().add(subtree);
        add(subtree, (Map<String, Object>) obj);
      }
      else
      {
        TreeItem<DexTaskItem> subtree = new TreeItem<DexTaskItem>(
            new DexTaskItem(key));
        parent.getChildren().add(subtree);
        for (DexTask item : (List<DexTask>) obj)
        {
          subtree.getChildren().add(
              new TreeItem<DexTaskItem>(new DexTaskItem(item)));
        }
      }
    }
  }
  
  public class DexTaskTreeItemCell extends TreeCell<DexTaskItem>
  {
    private HBox hbox = new HBox();
    private ImageView imageView = new ImageView();
    private Label label = new Label("UNNAMED");
    
    public DexTaskTreeItemCell()
    {
      if (getItem() != null)
      {
        imageView.setImage(getItem().getImage());
      }
      this.hbox.getChildren().addAll(imageView, label);
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
        try
        {
          label.textProperty().bind(item.getName());
          hbox.opacityProperty().bind(item.getOpacity());
          imageView.setImage(item.getImage());
          setGraphic(hbox);
        }
        catch(Exception ex)
        {
          ex.printStackTrace();
        }
      }
    }
  }
  
  public void onDragDetected(MouseEvent evt)
  {
    // System.out.println("On Drag Detected");
    DexTaskTree source = (DexTaskTree) evt.getSource();
    /* drag was detected, start a drag-and-drop gesture */
    /* allow any transfer mode */
    DexTaskItem item = source.getSelectionModel().getSelectedItem().getValue();
    Dragboard db = source.startDragAndDrop(TransferMode.COPY_OR_MOVE);
    
    /* Put a string on a dragboard */
    ClipboardContent content = new ClipboardContent();
    
    if (content != null && item != null && item.getTask() != null
        && item.getTask().get() != null)
    {
      // System.out.println("DND-SENDING: '" +
      // DexUtil.dexTaskToString(item.getTask().get()) + "'");
      content.put(DEX_TASK_CREATE, item.getTask().get().getClass());
      db.setContent(content);
    }
    
    evt.consume();
  }
}
