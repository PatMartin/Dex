package com.dexvis.dex.task.tablemanipulation

import javafx.beans.property.SimpleStringProperty
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.collections.ObservableList
import javafx.event.EventHandler
import javafx.geometry.Orientation
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.SplitPane
import javafx.scene.control.TableColumn
import javafx.scene.control.TableView
import javafx.scene.control.TextField
import javafx.scene.control.TableColumn.CellDataFeatures
import javafx.scene.image.Image
import javafx.util.Callback

import org.controlsfx.control.ListSelectionView
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="select_columns")
class SelectColumns extends DexTask {
  public SelectColumns() {
    super("Table Manipulation", "Select Columns", "table_manipulation/SelectColumns.html")
  }

  private MigPane configPane = null

  private TableView tableView = new TableView()

  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();

  private Button clearButton = new Button("Clear")

  public DexTaskState execute(DexTaskState state) throws DexException {

    def selected = state.dexData;

    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
    }

    if (columnListView.getTargetItems().size() > 0)
    {
      selected = state.dexData.select(columnListView.getTargetItems())
    }

    //println "SELECTING: ${columnListView.getTargetItems()}"
    //println "FROM:      ${state.dexData}"
    //println "SELECTED:  ${selected}"
    
    // Update the table:
    ObservableList<ObservableList<String>> data = FXCollections.observableArrayList()

    tableView.getColumns().clear()
    tableView.getItems().clear()

    Collection cols = []

    for (int i = 0; i < selected.header.size(); i++)
    {
      final int j = i

      TableColumn col = new TableColumn(selected.header.get(i))
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
      col.setPrefWidth(selected.header.get(i).length() * 16)
      cols.add(col)
    }

    tableView.getColumns().addAll(cols)
    for (List<String> row : selected.data)
    {
      ObservableList<String> oRow = FXCollections.observableArrayList(row)
      data.add(oRow)
    }

    tableView.setItems(data)

    state.dexData = selected;

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

      def groupConfigPane = new MigPane("", "[grow]", "[grow][][]")

      groupConfigPane.add(columnListView, "span, grow")
      groupConfigPane.add(clearButton, "grow,span")

      SplitPane hSplitPane = new SplitPane()
      hSplitPane.setOrientation(Orientation.HORIZONTAL)

      hSplitPane.getItems().addAll(groupConfigPane, tableView)
      hSplitPane.setDividerPositions(0.25)

      configPane.add(NodeFactory.createTitle("Select Columns"), "grow,span")
      configPane.add(hSplitPane, "grow,span")

      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
      } as EventHandler);
    }
    return configPane
  }
}
