package com.dexvis.dex.task.info

import javafx.beans.property.SimpleStringProperty
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.collections.ObservableList
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TableColumn
import javafx.scene.control.TableView
import javafx.scene.control.TableColumn.CellDataFeatures
import javafx.scene.input.KeyCode
import javafx.scene.input.KeyEvent
import javafx.util.Callback

import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState

@Root
class DescribeData extends DexTask {
  public DescribeData() {
    super("Info", "Describe Data", "info/DescribeData.html")
  }
  
  private MigPane configPane = null
  private TableView tableView = new TableView()
  private Label headerLabel = new Label("0 Rows of 0 Columns")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    ObservableList<ObservableList<String>> data = FXCollections.observableArrayList()
    
    tableView.getColumns().clear()
    tableView.getItems().clear()
    
    tableView.setOnKeyPressed({ event -> keyPress(event) })
    
    //    final Clipboard clipboard = Clipboard.getSystemClipboard();
    //    final ClipboardContent content = new ClipboardContent();
    //    content.putString("Some text");
    //    content.putHtml("<b>Some</b> text");
    //    clipboard.setContent(content);
    
    Collection cols = []
    
    //println "Viewing: ${state.dexData}"
    
    List<String> dheader = ["Column", "Column Name", "Distinct", "Trimmed Distinct", "String", "Double", "Integer"]
    List<String, List<String>> ddata = new ArrayList<String, List<String>> ()
    
    for (int i=0; i<state.dexData.header.size(); i++)
    {
      def valMap = [:]
      def trimValMap = [:]
      def possibleStrings = 0
      def possibleDoubles = 0
      def possibleIntegers = 0
      def possibleDates = 0
      def tmp
      
      for (int j=0; j<state.dexData.data.size(); j++)
      {
        valMap[state.dexData.data[j][i]] = 1
        trimValMap[state.dexData.data[j][i].trim()] = 1
        possibleStrings++
        try
        {
          tmp = state.dexData.data[j][i] as Double
          possibleDoubles++
        }
        catch (Exception ex)
        {
        }
        try
        {
          tmp = state.dexData.data[j][i] as Integer
          possibleIntegers++
        }
        catch (Exception ex)
        {
        }
      }
      
      ddata << ["$i", state.dexData.header[i], "${valMap.keySet().size()}",
        "${trimValMap.keySet().size()}", "$possibleStrings", "$possibleDoubles", "$possibleIntegers", "$possibleDates"]
    }
    
    println "DHEADER $dheader, DDATA: $ddata"
    
    for (int i = 0; i < dheader.size(); i++)
    {
      final int j = i
      
      TableColumn col = new TableColumn(dheader.get(i))
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
      
      // TODO: More comprehensive tool for determining column widths.
      int totalLength = 0;
      ddata.eachWithIndex { row, ri ->
        //println "VIEWING-ROW: '${row}'"
        totalLength += (row[i] ? (row[i] as String).length() : 0);
      }
      //println "totalLength: ${totalLength}, size=${state.dexData.data.size()}"
      long avgLength =
          (ddata) ? totalLength / ddata.size() : 0;
      
      long headerLength = dheader.get(i).length();
      col.setPrefWidth(Math.max(avgLength, headerLength) * 14)
      cols.add(col)
    }
    
    headerLabel.setText(ddata.size() + " Rows of " +
        dheader.size() + " Columns");
    
    tableView.getColumns().addAll(cols)
    
    for (List<String> row : ddata)
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
      configPane = new MigPane("", "[grow]", "[][grow][]")
      
      Button clearButton = new Button("Clear")
      configPane.add(headerLabel, "grow, span")
      configPane.add(tableView, "grow, span")
      configPane.add(clearButton, "grow, span")
      
      clearButton.setOnAction({ event -> clear(event)})
    }
    
    return configPane
  }
  
  public void keyPress(KeyEvent evt)
  {
    System.out.println("*** keypress: " + evt)
    
    if (evt.getCode().equals(KeyCode.DELETE))
    {
      System.out.println("DELETING...")
    }
    else
    {
      System.out.println("Ignoring keypress")
    }
  }
  
  public clear(ActionEvent evt)
  {
    try
    {
      tableView.getColumns().clear()
      tableView.getItems().clear()
      headerLabel.setText("0 Rows of 0 Columns")
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
}
