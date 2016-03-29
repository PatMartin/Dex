package com.dexvis.dex.task.utilities

import javafx.beans.property.SimpleStringProperty
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.collections.ObservableList
import javafx.geometry.Orientation
import javafx.scene.Node
import javafx.scene.control.ChoiceBox
import javafx.scene.control.SplitPane
import javafx.scene.control.TableColumn
import javafx.scene.control.TableView
import javafx.scene.control.TextArea
import javafx.scene.control.TableColumn.CellDataFeatures
import javafx.scene.image.Image
import javafx.util.Callback

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException;
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="groovyfilter")
class GroovyFilter extends DexTask
{
  public GroovyFilter()
  {
    super("Utilities", "Groovy Filter", "utilities/GroovyFilter.html")
  }

  private MigPane configPane = null

  @Element(required=false)
  private ChoiceBox operationCB= new ChoiceBox(FXCollections.observableArrayList(
  "INCLUDE", "EXCLUDE"))

  @Element(required=false)
  private ChoiceBox conditionCB= new ChoiceBox(FXCollections.observableArrayList(
  "IF", "UNLESS"))

  @Element(name="groovyExpText", required=false)
  private TextArea groovyExpText = new TextArea("true")

  private TableView tableView = new TableView()

  private String groovyPreamble = """

def newData = []
def rowMaps = []

data.eachWithIndex
{
  row, ri ->
  def map = [:]
  row.eachWithIndex
  {
    rcol, ci ->
    map[header[ci]] = rcol
  }
  rowMaps << map
}

rowMaps.eachWithIndex
{
  col, ri ->
  if ("""

  private String groovyProlog = """)
  {
    newData << data[ri]
  }
}

  data = newData
"""

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    String groovyScript = groovyPreamble
    String op = operationCB.getValue()
    String cond = conditionCB.getValue()
    
    String regexFilter = "(?://.*)|(/\\*(?:.|[\\n\\r])*?\\*/)";
    String expression = groovyExpText.getText().replaceAll(regexFilter, "");
    
    if ((cond == "IF" && op == "EXCLUDE") || (cond == "UNLESS" && op == "INCLUDE"))
    {
      groovyScript += "!(" + expression + ")" + groovyProlog
    }
    else
    {
      groovyScript += expression + groovyProlog
    }
    println "SCRIPT: '$groovyScript'"

    // Run the script
    Binding binding = new Binding()

    binding.setVariable("dex", state.dexData)
    binding.setVariable("header", state.dexData.header)
    binding.setVariable("data", state.dexData.data)

    GroovyShell shell = new GroovyShell(binding)

    shell.evaluate(groovyScript)

    def groovyData = binding.getVariable("data")

    // Ensure all contents are strings
    groovyData.eachWithIndex { row, rowNum -> row.eachWithIndex { col, colNum -> groovyData[rowNum][colNum] = groovyData[rowNum][colNum].toString() } }

    state.dexData.header = binding.getVariable("header")
    state.dexData.data = groovyData

    // Update the table:
    ObservableList<ObservableList<String>> data = FXCollections.observableArrayList()

    tableView.getColumns().clear()
    tableView.getItems().clear()

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
      conditionCB.setValue("IF")
      operationCB.setValue("INCLUDE")

      configPane = new MigPane("", "[][grow]", "[][][grow]")
      configPane.setStyle("-fx-background-color: white;")

      SplitPane hSplitPane = new SplitPane()
      hSplitPane.setOrientation(Orientation.HORIZONTAL)

      hSplitPane.getItems().addAll(groovyExpText, tableView)
      hSplitPane.setDividerPositions(0.50)

      configPane.add(NodeFactory.createTitle("Groovy Filter Configuration"), "grow,span")
      configPane.add(operationCB)
      configPane.add(conditionCB, "span")

      configPane.add(hSplitPane, "grow,span")
    }

    return configPane
  }
}
