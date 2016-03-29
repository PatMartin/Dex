package com.dexvis.dex.task.tablemanipulation

import javafx.collections.FXCollections
import javafx.event.ActionEvent
import javafx.geometry.Insets
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.CheckBox
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.ScrollPane
import javafx.scene.image.Image
import javafx.scene.layout.HBox

import org.simpleframework.xml.Element
import org.simpleframework.xml.ElementList
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.scene.control.NodeFactory
import com.thoughtworks.xstream.annotations.XStreamOmitField;

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class ColumnFilter extends DexTask {
  @XStreamOmitField
  private MigPane configPane = null

  @XStreamOmitField
  private Label filterTypeLabel = new Label("Filter Type:")

  @XStreamOmitField
  ScrollPane scrollPane = new ScrollPane()

  @Element(required=false)
  @XStreamOmitField
  private ChoiceBox filterTypeCB = new ChoiceBox(FXCollections.observableArrayList(
  "Exclude", "Include"))

  @ElementList(required=false)
  @XStreamOmitField
  private List<CheckBox> colCbList = new ArrayList<CheckBox>()
  @ElementList(required=false)
  @XStreamOmitField
  private List<Label> colLabelList = new ArrayList<Label>()

  @XStreamOmitField
  private MigPane flowPane = new MigPane("wrap 10")

  /**
   * 
   * Override the default constructor to provide this component's name, category and help file.
   * Report that it has been constructed.
   * 
   */
  public ColumnFilter() {
    super("Table Manipulation", "Column Filter",
      "table_manipulation/ColumnFilter.html")
  }

  public DexTaskState initialize(DexTaskState state) throws DexException {
    colCbList.clear()
    colLabelList.clear()

    state.dexData.header.each { h ->
      colCbList
      colLabelList.add(new Label("$h:"))
      colCbList.add(new CheckBox())
    }

    layoutColumns()
    return state
  }

  public DexTaskState execute(DexTaskState state) throws DexException {
    boolean exclude = (filterTypeCB.getValue() == "Exclude")

    if (colCbList.size() == 0) {
      state.dexData.header.each { h ->
        colCbList
        colLabelList.add(new Label("$h:"))
        colCbList.add(new CheckBox())
      }

      layoutColumns()
    }

    def selectedCols = [:]

    // Create list of columns to include or exclude
    colCbList.eachWithIndex
    { cb, i ->
      if (cb.isSelected())
      {
        Label label = colLabelList.get(i)
        String colName = label.getText().substring(0, label.getText().length() - 1)
        selectedCols[colName] = 1
      }
    }

    def headerMap = [:]

    def newHeader = []

    state.dexData.header.each
    { h ->
      println "******* $h ${h.getClass()}"
      if (selectedCols.containsKey(h))
      {
        if (!exclude)
        {
          headerMap[h] = 1
          newHeader << h
        }
      }
      else
      {
        if (exclude)
        {
          headerMap[h] = 1
          newHeader << h
        }
      }
    }

    println "NEW HEADER: $newHeader"

    def newData = []

    state.dexData.data.eachWithIndex
    { row, ri ->
      def newRow = []
      row.eachWithIndex
      { col, ci ->
        if (headerMap.containsKey(state.dexData.header[ci]))
        {
          newRow << col
        }
      }
      newData << newRow
    }

    state.dexData.header = newHeader
    state.dexData.data = newData

    return state
  }

  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[][grow]", "[][][grow]")
      configPane.setStyle("-fx-background-color: white;")
      configPane.add(NodeFactory.createTitle("Column Filter"), "grow,span")

      HBox hbox = new HBox()
      hbox.setPadding(new Insets(15, 12, 15, 12))
      hbox.setSpacing(10)

      Button selectAllButton = new Button("Select All")
      Button deselectAllButton = new Button("Deselect All")
      Button clearButton = new Button("Clear Columns")

      selectAllButton.setOnAction(new ReflectiveActionEventHandler(this, "selectAll"))
      deselectAllButton.setOnAction(new ReflectiveActionEventHandler(this, "deselectAll"))
      clearButton.setOnAction(new ReflectiveActionEventHandler(this, "clear"))

      hbox.getChildren().addAll(filterTypeLabel, filterTypeCB, selectAllButton, deselectAllButton, clearButton)
      configPane.add(hbox, "grow, span")

      scrollPane.setContent(flowPane)
      configPane.add(scrollPane, "grow, span")

      if (filterTypeCB.getValue() == null)
      {
        filterTypeCB.setValue(filterTypeCB.getItems().get(0))
      }

      layoutColumns()
    }

    return configPane
  }

  private void layoutColumns()
  {
    flowPane.getChildren().clear()

    //scrollPane.setPrefHeight(500)

    for (int i; i < colCbList.size() && i < colLabelList.size(); i++)
    {
      flowPane.add(colLabelList.get(i), "align right")
      flowPane.add(colCbList.get(i))
    }
  }

  public clear(ActionEvent evt)
  {
    try
    {
      colCbList.clear()
      colLabelList.clear()
      layoutColumns()
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public selectAll(ActionEvent evt)
  {
    try
    {
      colCbList.each { cb -> cb.setSelected(true) }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public deselectAll(ActionEvent evt)
  {
    try
    {
      colCbList.each { cb -> cb.setSelected(false) }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
}
