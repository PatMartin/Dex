package com.dexvis.dex.task.tablemanipulation

import javafx.application.Platform
import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.CheckBox
import javafx.scene.control.Label
import javafx.scene.control.ScrollPane
import javafx.scene.control.TextField

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class ReplaceAll extends DexTask {
  private MigPane configPane = null
  
  @Element(name="replace", required=false)
  private TextField replaceText = new TextField()
  
  @Element(name="with", required=false)
  private TextField withText = new TextField()
  
  @Element(name="columnList", required=false)
  private List<CheckBox> columnList = new ArrayList<CheckBox>()
  private MigPane columnPane = new MigPane("", "[][]")
  
  /**
   * 
   * Override the default constructor to provide this component's name, category and help file.
   * Report that it has been constructed.
   * 
   */
  public ReplaceAll() {
    super("Table Manipulation", "Replace All", "table_manipulation/ReplaceAll.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    DexEnvironment env = DexEnvironment.getInstance()
    def selectedColumns = [:];
    
    if (columnList.size() <= 0) {
      state.dexData.header.each { selectedColumns[it] = true }
      Platform.runLater({ renderColumns(selectedColumns) })
    }
    else {
      columnList.each { cb ->
        selectedColumns[cb.getText()] = cb.isSelected()
      }
    }
    
    int numRows = state.dexData.data?.size();
    def replaceStr = env.interpolate(replaceText.getText())
    def withStr = env.interpolate(withText.getText())
    
    updateProgress(0, 100);
    updateMessage("Replacing All: '${replaceStr}' with '${withStr}'")
    
    state.dexData.data?.eachWithIndex { row, ri ->
      if (ri % 100000 == 0) {
        updateProgress(ri/numRows * 100.0)
      }
      
      state.dexData.header.eachWithIndex { hdr, hi ->
        if (selectedColumns.containsKey(hdr) && selectedColumns[hdr] == true) {
          state.dexData.data[ri][hi] = state.dexData.data[ri][hi].replaceAll(replaceStr, withStr)
        }
      }
    }
    
    updateMessage("Replaced All: '${replaceStr}' with '${withStr}'")
    
    return state
  }
  
  private void renderColumns(Map<String, Boolean> columnMap) {
    columnPane.getChildren().clear()
    columnList.clear()
    
    columnMap.keySet().sort().each { key ->
      CheckBox cb = new CheckBox(key)
      cb.setSelected(columnMap.get(key))
      columnList.add(cb)
      columnPane.add(cb, "span")
    }
  }
  
  public Node getConfig() {
    
    if (configPane == null) {
      configPane = new MigPane("", "[][grow]", "[][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Replace All"), "grow,span")
      configPane.add(new Label("Replacement Regular Expression:"))
      configPane.add(replaceText, "grow, span")
      configPane.add(new Label("Replacement Text:"))
      configPane.add(withText, "grow, span")
      
      // Figure out how to initialize at first given list of cb and no map.
      
      ScrollPane scrollPane = new ScrollPane()
      scrollPane.setContent(columnPane)
      
      configPane.add(scrollPane, "grow, span")
      Button selectAllButton = new Button("Select All")
      Button unselectAllButton = new Button("Unselect All")
      Button clearButton = new Button("Clear")
      configPane.add(selectAllButton, "grow")
      configPane.add(unselectAllButton, "grow")
      configPane.add(clearButton, "grow,span")
      
      clearButton.setOnAction({ actionEvent ->
        columnPane.getChildren().clear()
        columnList.clear()
      } as EventHandler);
      
      selectAllButton.setOnAction({ actionEvent ->
        columnList.each { it.setSelected(true) }
      } as EventHandler);
      
      unselectAllButton.setOnAction({ actionEvent ->
        columnList.each { it.setSelected(false) }
      } as EventHandler);
    }
    
    return configPane
  }
}
