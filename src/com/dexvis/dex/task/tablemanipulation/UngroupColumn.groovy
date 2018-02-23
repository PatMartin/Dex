package com.dexvis.dex.task.tablemanipulation

import javafx.beans.property.SimpleStringProperty
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.collections.ObservableList
import javafx.event.EventHandler
import javafx.geometry.Orientation
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.SplitPane
import javafx.scene.control.TableColumn
import javafx.scene.control.TableView
import javafx.scene.control.TableColumn.CellDataFeatures
import javafx.util.Callback

import org.controlsfx.control.ListSelectionView
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="ungroupColumn")
class UngroupColumn extends DexTask {
  public UngroupColumn() {
    super("Table Manipulation", "Ungroup Column",
    "table_manipulation/UngroupColumn.html")
  }
  
  private MigPane configPane = null
  
  private TableView tableView = new TableView()
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="categoryColumn", required=false)
  private ChoiceBox categoryColumnCB = new ChoiceBox()
  
  @Element(name="valueColumn", required=false)
  private ChoiceBox valueColumnCB = new ChoiceBox()
  
  private Button clearButton = new Button("Clear")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
    def newDexData = state.dexData;
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
    }
    
    if (categoryColumnCB.getSelectionModel().getSelectedIndex() < 0) {
      categoryColumnCB.getItems().clear()
      categoryColumnCB.getItems().addAll(state.getDexData().getHeader())
    }
    
    if (valueColumnCB.getSelectionModel().getSelectedIndex() < 0) {
      valueColumnCB.getItems().clear()
      valueColumnCB.getItems().addAll(state.getDexData().getHeader())
    }
    
    if (categoryColumnCB.getSelectionModel().getSelectedIndex() >= 0 &&
    valueColumnCB.getSelectionModel().getSelectedIndex() >= 0)
    {
      newDexData = state.dexData.ungroupColumn(columnListView.getTargetItems(),
          categoryColumnCB.getSelectionModel().getSelectedItem(),
          valueColumnCB.getSelectionModel().getSelectedItem())
    }
    
    
    // Update the table:
    ObservableList<ObservableList<String>> data = FXCollections.observableArrayList()
    
    tableView.getColumns().clear()
    tableView.getItems().clear()
    
    Collection cols = []
    
    updateMessage("Processing headers...")
    for (int i = 0; i < newDexData.header.size(); i++)
    {
      final int j = i
      
      TableColumn col = new TableColumn(newDexData.header.get(i))
      col.setCellValueFactory(new Callback<CellDataFeatures<ObservableList, String>, ObservableValue<String>>()
          {
            public ObservableValue<String> call(
                CellDataFeatures<ObservableList, String> param)
            {
              try
              {
                return new SimpleStringProperty(param.getValue().get(j).toString())
              }
              catch (Exception ex)
              {
                return new SimpleStringProperty(ex.toString())
              }
            }
          })
      
      // Estimate preferred width based on length of the header.  16 pixels per character.
      col.setPrefWidth(newDexData.header.get(i).length() * 16)
      cols.add(col)
    }
    
    updateMessage("Preparing view...")
    tableView.getColumns().addAll(cols)
    int rowCount = 0;
    for (List<String> row : newDexData.data)
    {
      rowCount++;
      if (rowCount > 1000) {
        break;
      }
      else {
        ObservableList<String> oRow = FXCollections.observableArrayList(row)
        data.add(oRow)
      }
    }
    
    updateMessage("Setting data...")
    tableView.setItems(data)
    
    state.dexData = newDexData;
    
    return state
  }
  
  public String toString()
  {
    return name
  }
  
  public Node getConfig()
  {
    
    if (configPane == null)
    {
      configPane = new MigPane("", "[][grow]", "[][grow]")
      configPane.setStyle("-fx-background-color: white;")
      
      def groupConfigPane = new MigPane("", "[grow]", "[grow][][][]")
      
      //groupConfigPane.add(new Label("Hierarchy:"), "span")
      groupConfigPane.add(columnListView, "span, grow")
      groupConfigPane.add(new Label("Category Column:"), "")
      groupConfigPane.add(categoryColumnCB, "span")
      groupConfigPane.add(new Label("Value Column:"), "")
      groupConfigPane.add(valueColumnCB, "span")
      groupConfigPane.add(clearButton, "grow,span")
      
      SplitPane hSplitPane = new SplitPane()
      hSplitPane.setOrientation(Orientation.HORIZONTAL)
      
      hSplitPane.getItems().addAll(groupConfigPane, tableView)
      hSplitPane.setDividerPositions(0.25)
      
      configPane.add(NodeFactory.createTitle("Ungroup Column Configuration"), "grow,span")
      configPane.add(hSplitPane, "grow,span")
      
      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
        categoryColumnCB.getItems().clear()
        valueColumnCB.getItems().clear()
      } as EventHandler);
    }
    return configPane
  }
}
