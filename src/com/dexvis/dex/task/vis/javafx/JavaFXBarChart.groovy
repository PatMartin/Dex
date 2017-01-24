package com.dexvis.dex.task.vis.javafx

import javafx.beans.value.ChangeListener
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.event.ActionEvent
import javafx.event.EventHandler
import javafx.geometry.Insets
import javafx.geometry.Orientation
import javafx.geometry.Side
import javafx.scene.chart.BarChart
import javafx.scene.chart.CategoryAxis
import javafx.scene.chart.NumberAxis
import javafx.scene.chart.XYChart
import javafx.scene.chart.XYChart.Data
import javafx.scene.chart.XYChart.Series
import javafx.scene.control.CheckBox;
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.ListView
import javafx.scene.control.SelectionMode
import javafx.scene.control.SplitPane
import javafx.scene.control.TextField
import javafx.scene.control.Tooltip
import javafx.scene.image.Image
import javafx.scene.text.Text

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.DataFilter
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class JavaFXBarChart extends DexTask {
  public JavaFXBarChart() {
    super()
    setCategory("Visualization : JavaFX")
    setName("Bar Chart")
    setHelpFile("visualization/javafx/BarChart.html")
  }

  private MigPane configPane = null

  private ListView<String> chartTypesListView = new ListView<String>()

  @Element(name="xlist", required=false)
  private ListView<String> xListView = new ListView<String>()

  @Element(name="ylist", required=false)
  private ListView<String> yListView = new ListView<String>()

  @Element(name="lowerbound",required=false)
  private TextField lowerBoundText = new TextField("")
  @Element(name="upperbound",required=false)
  private TextField upperBoundText = new TextField("")

  @Element(name="tickunit",required=false)
  private TextField tickUnitText = new TextField("")

  private MigPane dynamicChartPane = null

  private BarChart<String,Number> chart = null

  private CategoryAxis xAxis = new CategoryAxis()
  private NumberAxis   yAxis = new NumberAxis()

  // Labels
  private Label chartTitleLabel = new Label("Chart Title:")
  private Label xTitleLabel = new Label("X Title:")
  private Label yTitleLabel = new Label("Y Title:")

  @Element(required=false)
  private TextField chartTitleText = new TextField("")

  @Element(required=false)
  private TextField xTitleText = new TextField("")

  @Element(required=false)
  private TextField yTitleText = new TextField("")

  @Element(required=false)
  private ChoiceBox legendSideCB = new ChoiceBox(FXCollections.observableArrayList(
  "Bottom", "Top", "Left", "Right"))

  @Element(required=false)
  private ChoiceBox titleSideCB = new ChoiceBox(FXCollections.observableArrayList(
  "Bottom", "Top", "Left", "Right"))

  @Element(name="accumulate",required=false)
  private CheckBox accumulateCB = new CheckBox("Accumulate:")

  private List<String> header = new ArrayList()
  private List<List<String>> data = new ArrayList<List<String>>()

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    println "Running: $name"

    // Making deep copies of the header and data.
    header = state.dexData.header.collect { it }
    data = state.dexData.data.collect { row -> row.collect { it } }

    xListView.setItems(FXCollections.observableArrayList(header))
    yListView.setItems(FXCollections.observableArrayList(state.dexData.getNumericColumns()))

    chart()

    return state
  }

  public chart()
  {
    List<XYChart.Series> chartData = new ArrayList<XYChart.Data>()
    List<XYChart.Series> chartSeries = new ArrayList<XYChart.Series>()
    int yIndex

    xListView.getSelectionModel().getSelectedIndices().each
    { xIndex ->
      yListView.getSelectionModel().getSelectedItems().each
      { yItem ->
        yIndex = header.findIndexOf { it == yItem.toString() }
        println "header: ${header}, xIndex: ${xIndex}, yItem: ${yItem}, yIndex: ${yIndex}"
        if (yIndex >= 0)
        {
          chartData = new ArrayList<XYChart.Data>()
          if (accumulateCB.selected)
          {
            def accumulator = [:];

            // Accumulate values for each xIndex.
            data.each
            { row ->
              Double rowValue = 0.0
              try
              {
                rowValue = Double.parseDouble(row[yIndex])
              }
              catch (Exception ex)
              {
                // Suppress - keep 0 value.  Consider logging.
              }

              if (accumulator[row[xIndex]])
              {
                accumulator["${row[xIndex]}"] += rowValue
              }
              else
              {
                accumulator["${row[xIndex]}"] = rowValue
              }
            }

            data.each { row ->
              chartData.add(new XYChart.Data(row[xIndex], accumulator["${row[xIndex]}"]))
            }
          }
          else
          {
            data.each
            { row ->
              try
              {
                chartData.add(new XYChart.Data(row[xIndex], Double.parseDouble(row[yIndex])))
              }
              catch (Exception ex)
              {
                ex.printStackTrace();
              }
            }
          }
          chartSeries.add(new XYChart.Series(header[yIndex], FXCollections
              .observableArrayList(chartData)))
        }
      }
    }

    chart = new BarChart<String, Number>(xAxis, yAxis)
    chart.getData().addAll(chartSeries)
    chart.setBarGap(1)
    chart.setCategoryGap(1)

    // Tooltips!
    for (Series<Object, Object> series : chart.getData())
    {
      for (Data<Object, Object> data : series.getData())
      {
        Tooltip tip = new Tooltip()
        tip.setText("SERIES: " + series.getName() + ": [ X=" + data.getXValue() + ", Y=" + data.getYValue().toString() + " ]")
        Tooltip.install(data.getNode(), tip)
      }
    }

    chart.setPadding(new Insets(0, 0, 0, 0))

    dynamicChartPane?.getChildren()?.clear()
    dynamicChartPane?.add(chart, "grow")
  }

  public javafx.scene.Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("debug", "[grow]", "[grow]")

      legendSideCB.getSelectionModel().setSelectedItem("Bottom")
      titleSideCB.getSelectionModel().setSelectedItem("Top")

      SplitPane vSplitPane = new SplitPane()
      vSplitPane.setOrientation(Orientation.VERTICAL)

      SplitPane hSplitPane = new SplitPane()
      hSplitPane.setOrientation(Orientation.HORIZONTAL)

      MigPane chartConfigPane = new MigPane("", "[grow]","[grow]")

      // Config pane
      MigPane dynamicConfigPane = new MigPane("", "[][grow]", "[][][][][][][]")

      dynamicConfigPane.add(NodeFactory.createTitle("Bar Chart Configuration"), "grow,span")

      dynamicConfigPane.add(new Text("Chart Options"), "span, growx, alignx center")
      dynamicConfigPane.add(xTitleLabel)
      dynamicConfigPane.add(xTitleText, "grow,span")
      dynamicConfigPane.add(yTitleLabel)
      dynamicConfigPane.add(yTitleText, "grow,span")
      dynamicConfigPane.add(chartTitleLabel)
      dynamicConfigPane.add(chartTitleText, "grow,span")
      dynamicConfigPane.add(new Label("Title Side:"))
      dynamicConfigPane.add(titleSideCB, "span")
      dynamicConfigPane.add(new Label("Legend Side:"))
      dynamicConfigPane.add(legendSideCB, "span")
      dynamicConfigPane.add(new Label("Lower Bound:"))
      dynamicConfigPane.add(lowerBoundText, "span,grow")

      dynamicConfigPane.add(new Label("Upper Bound:"))
      dynamicConfigPane.add(upperBoundText, "span,grow")

      dynamicConfigPane.add(new Label("Tick Unit:"))
      dynamicConfigPane.add(tickUnitText, "span,grow")

      dynamicConfigPane.add(new Label("Accumulate:"))
      dynamicConfigPane.add(accumulateCB, "span,grow")

      tickUnitText.setOnAction({ setTickUnit(it) } as EventHandler);
      upperBoundText.setOnAction({ setUpperBound(it) } as EventHandler);
      lowerBoundText.setOnAction({ setLowerBound(it) } as EventHandler);
      //tickUnitText.setOnAction(new ReflectiveActionEventHandler(this, "setTickUnit"))
      //upperBoundText.setOnAction(new ReflectiveActionEventHandler(this, "setUpperBound"))
      //lowerBoundText.setOnAction(new ReflectiveActionEventHandler(this, "setLowerBound"))

      dynamicChartPane = new MigPane("", "[grow]","[grow]")

      vSplitPane.getItems().addAll(xListView, yListView, dynamicConfigPane)
      vSplitPane.setDividerPositions(0.30, 0.60, 0.80)

      chartConfigPane.add(vSplitPane, "span,grow")

      hSplitPane.getItems().addAll(chartConfigPane, dynamicChartPane)
      hSplitPane.setDividerPositions(0.20)

      configPane.add(hSplitPane, "span,grow")

      xListView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE)
      yListView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE)

      chartTypesListView.getSelectionModel().selectedItemProperty().addListener(
          { value, objOld, objNew -> updateChart(value, objOld, objNew)} as ChangeListener)
      xListView.getSelectionModel().selectedItemProperty().addListener(
          { value, objOld, objNew -> updateChart(value, objOld, objNew)} as ChangeListener)
      yListView.getSelectionModel().selectedItemProperty().addListener(
          { value, objOld, objNew -> updateChart(value, objOld, objNew)} as ChangeListener)

      legendSideCB.getSelectionModel().selectedItemProperty().addListener(
          { value, objOld, objNew -> legendSide(value, objOld, objNew)} as ChangeListener)
      titleSideCB.getSelectionModel().selectedItemProperty().addListener(
          { value, objOld, objNew -> titleSide(value, objOld, objNew)} as ChangeListener)

      chartTitleText.setOnAction({ setTitle(it)} as EventHandler)
      xTitleText.setOnAction({setXTitle(it)} as EventHandler)
      yTitleText.setOnAction({setYTitle(it)} as EventHandler)
    }

    return configPane
  }

  public void updateChart(ObservableValue<? extends DataFilter> ov,
      Object objOld, Object objNew)
  {
    //println "selectX: ov=$ov old=$objOld new=$objNew"
    chart()
  }

  public void legendSide(ObservableValue<? extends DataFilter> ov,
      Object objOld, Object objNew)
  {
    //println "selectX: ov=$ov old=$objOld new=$objNew"
    if (objNew.toString() == "Top")
    {
      chart.setLegendSide(Side.TOP)
    }
    else if (objNew.toString() == "Left")
    {
      chart.setLegendSide(Side.LEFT)
    }
    else if (objNew.toString() == "Right")
    {
      chart.setLegendSide(Side.RIGHT)
    }
    else
    {
      chart.setLegendSide(Side.BOTTOM)
    }
  }

  public void titleSide(ObservableValue<? extends DataFilter> ov,
      Object objOld, Object objNew)
  {
    println "selectX: ov=$ov old=$objOld new=$objNew"
    if (objNew.toString() == "Top")
    {
      chart.setTitleSide(Side.TOP)
    }
    else if (objNew.toString() == "Left")
    {
      chart.setTitleSide(Side.LEFT)
    }
    else if (objNew.toString() == "Right")
    {
      chart.setTitleSide(Side.RIGHT)
    }
    else
    {
      chart.setTitleSide(Side.BOTTOM)
    }
  }

  public void setTitle(ActionEvent evt)
  {
    chart.setTitle(chartTitleText.getText())
  }

  public void setXTitle(ActionEvent evt)
  {
    xAxis.setLabel(xTitleText.getText())
  }

  public void setYTitle(ActionEvent evt)
  {
    yAxis.setLabel(yTitleText.getText())
  }



  public void setUpperBound(ActionEvent evt)
  {
    yAxis.setAutoRanging(false)
    yAxis.setUpperBound(Double.parseDouble(upperBoundText.getText()))
  }

  public void setTickUnit(ActionEvent evt)
  {
    yAxis.setTickUnit(Double.parseDouble(tickUnitText.getText()))
    chart.layout()
  }

  public void setLowerBound(ActionEvent evt)
  {
    yAxis.setAutoRanging(false)
    yAxis.setLowerBound(Double.parseDouble(lowerBoundText.getText()))
  }
}
