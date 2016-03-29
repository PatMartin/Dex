package com.dexvis.dex.task.tablemanipulation

import javafx.beans.property.SimpleStringProperty
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.collections.ObservableList
import javafx.geometry.Orientation
import javafx.scene.Node
import javafx.scene.control.Label
import javafx.scene.control.ListView
import javafx.scene.control.SelectionMode
import javafx.scene.control.SplitPane
import javafx.scene.control.TableColumn
import javafx.scene.control.TableView
import javafx.scene.control.TextField
import javafx.scene.control.TableColumn.CellDataFeatures
import javafx.scene.image.Image
import javafx.util.Callback

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="splitcolumns")
class SplitColumns extends DexTask
{
  public SplitColumns()
  {
    super("Table Manipulation", "Split Columns", "table_manipulation/SplitColumns.html")
  }

  private MigPane configPane = null

  @Element(name="splitExpression", required=false)
  private TextField splitExpressionText = new TextField(",")

  private TableView tableView = new TableView()

  @Element(name="columnList", required=false)
  private ListView<String> columnListView = new ListView<String>()
  
  public DexTaskState execute(DexTaskState state) throws DexException
  {
    def splitExpression = splitExpressionText.getText()
    println "SPLIT: '$splitExpression'"

    columnListView.setItems(FXCollections.observableArrayList(state.getDexData().getHeader()))
    
    // Update the table:
    ObservableList<ObservableList<String>> data = FXCollections.observableArrayList()

    tableView.getColumns().clear()
    tableView.getItems().clear()

    List<List<String>> tmpData = state.getDexData().getData().collect()

    // Update the columns with the splits.
    columnListView.getSelectionModel().getSelectedIndices().each
    {
      i ->
      def newData = []
      println "SELECTED INDEX: $i"
      tmpData.eachWithIndex
      {
        row, ri ->
        def splitData = row[i].split(splitExpression)
        
        if (splitData.length <= 1)
        {
          newData << row
        }
        else
        {
          splitData.each
          {
            it ->
            def newRow = row.collect()
            newRow[i] = it
            newData << newRow
          }
        }
      }

      tmpData = newData.collect()
    }

    println "SETTING DATA"
    state.getDexData().setData(tmpData)
    println "DATA SET"
    
    Collection cols = []

    for (int i = 0; i < state.dexData.header.size(); i++)
    {
      final int j = i

      TableColumn col = new TableColumn(state.dexData.header.get(i))
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
      col.setPrefWidth(state.dexData.header.get(i).length() * 16)
      cols.add(col)
    }

    tableView.getColumns().addAll(cols)

    for (List<String> row : state.dexData.data)
    {
      ObservableList<String> oRow = FXCollections.observableArrayList(row)
      data.add(oRow)
    }

    tableView.setItems(data)

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

      columnListView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);
      
      def regexPane = new MigPane("", "[grow]", "[grow][][]")

      regexPane.add(columnListView, "span, grow")
      regexPane.add(new Label("Split Regular Expression:"), "span")
      regexPane.add(splitExpressionText, "grow, span")
      
      SplitPane hSplitPane = new SplitPane()
      hSplitPane.setOrientation(Orientation.HORIZONTAL)

      hSplitPane.getItems().addAll(regexPane, tableView)
      hSplitPane.setDividerPositions(0.25)

      configPane.add(NodeFactory.createTitle("Split Columns Configuration"), "grow,span")
      configPane.add(hSplitPane, "grow,span")
    }

    return configPane
  }
}
