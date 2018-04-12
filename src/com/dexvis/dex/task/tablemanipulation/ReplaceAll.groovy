package com.dexvis.dex.task.tablemanipulation

import javafx.application.Platform
import javafx.beans.value.ChangeListener
import javafx.beans.value.ObservableValue
import javafx.event.ActionEvent;
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
import com.thoughtworks.xstream.annotations.XStreamOmitField

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class ReplaceAll extends DexTask {
  @XStreamOmitField
  private MigPane configPane = null
  
  @Element(name="replace", required=false)
  private TextField replaceText = new TextField()
  
  @Element(name="with", required=false)
  private TextField withText = new TextField()
  
  @Element(name="sort", required=false)
  private CheckBox sortCB = new CheckBox()
  
  @Element(name="replaceNull", required=false)
  private CheckBox replaceNullCB = new CheckBox()
  
  @Element(name="replaceNullWith", required=false)
  private TextField replaceNullWithText = new TextField()
  
  @Element(name="columnMap", required=false)
  private LinkedHashMap<String, String> columnMap = new LinkedHashMap<String, String>()
  
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
    
    if (columnMap.size() <= 0) {
      state.dexData.header.each { columnMap[it] = "true" }
      Platform.runLater({ renderColumns(columnMap) })
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
        if (columnMap.containsKey(hdr) && columnMap[hdr] == "true") {
          if (state.dexData.data[ri][hi] == null) {
            if (replaceNullCB.isSelected()) {
              state.dexData.data[ri][hi] = replaceNullWithText.getText()
            }
          }
          else {
            state.dexData.data[ri][hi] = state.dexData.data[ri][hi]?.replaceAll(replaceStr, withStr)
          }
        }
      }
    }
    
    updateMessage("Replaced All: '${replaceStr}' with '${withStr}'")
    
    return state
  }
  
  private void renderColumns(Map<String, Boolean> columnMap) {
    columnPane.getChildren().clear()
    
    if (sortCB.isSelected()) {
      columnMap.keySet().sort().each { key ->
        CheckBox cb = new CheckBox(key)
        cb.setSelected(columnMap.get(key) == "true")
        columnPane.add(cb, "span")
      }
    }
    else {
      columnMap.each { key, value ->
        CheckBox cb = new CheckBox(key)
        cb.setSelected(value == "true")
        cb.setOnAction({ ActionEvent actionEvent ->
          columnMap[key] = (((CheckBox) actionEvent.getSource()).isSelected()) ?
              "true" : "false"
        } as EventHandler);
        columnPane.add(cb, "span")
      }
    }
  }
  
  public Node getConfig() {
    
    if (configPane == null) {
      configPane = new MigPane("", "[][grow]", "[][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Replace All"), "grow,span")
      configPane.add(new Label("Replacement Regular Expression:"))
      configPane.add(replaceText, "grow, span")
      configPane.add(new Label("Replacement Text:"))
      configPane.add(withText, "grow, span")
      configPane.add(new Label("Replace Nulls"))
      configPane.add(replaceNullWithText, "grow")
      configPane.add(replaceNullCB, "span")
      configPane.add(new Label("Sort"))
      configPane.add(sortCB, "span")
      // Figure out how to initialize at first given list of cb and no map.
      
      ScrollPane scrollPane = new ScrollPane()
      renderColumns(columnMap);
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
        columnMap.clear()
      } as EventHandler);
      
      clearButton.setOnAction({ actionEvent ->
        columnPane.getChildren().clear()
        columnMap.clear()
      } as EventHandler);
      
      selectAllButton.setOnAction({ actionEvent ->
        columnPane.getChildren().each { cb ->
          ((CheckBox)cb).setSelected(true)
        }
        columnMap.each { key, value -> columnMap[key] = "true" }
      } as EventHandler)
      
      unselectAllButton.setOnAction({ actionEvent ->
        columnPane.getChildren().each { cb ->
          ((CheckBox)cb).setSelected(false)
        }
        columnMap.each { key, value -> columnMap[key] = "false" }
      } as EventHandler)
    }
    
    return configPane
  }
}
