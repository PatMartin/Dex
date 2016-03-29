package com.dexvis.dex.task.vis.javafx

import javafx.scene.chart.XYChart.Series
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.event.ActionEvent
import javafx.geometry.Orientation
import javafx.scene.chart.AreaChart
import javafx.scene.chart.Axis
import javafx.scene.chart.BarChart
import javafx.scene.chart.BubbleChart
import javafx.scene.chart.CategoryAxis
import javafx.scene.chart.LineChart
import javafx.scene.chart.NumberAxis
import javafx.scene.chart.ScatterChart
import javafx.scene.chart.StackedAreaChart
import javafx.scene.chart.StackedBarChart
import javafx.scene.chart.XYChart
import javafx.scene.chart.XYChart.Data
import javafx.scene.chart.XYChart.Series
import javafx.scene.control.CheckBox
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
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.event.ReflectiveChangeListener
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class JavaFXXYChart extends DexTask {
  public JavaFXXYChart() {
    super()
    setCategory("Visualization : JavaFX")
    setName("XY Chart")
    setHelpFile("visualization/javafx/XYChart.html")
  }

  private MigPane configPane = null

  private ListView<String> chartTypesListView = new ListView<String>()

  @Element(name="xlist", required=false)
  private ListView<String> xListView = new ListView<String>()
  @Element(name="ylist", required=false)
  private ListView<String> yListView = new ListView<String>()

  private MigPane dynamicChartPane = null
  private XYChart chart = null

  // Labels
  private Label xLowerBoundLabel = new Label("Lower Bound:")
  private Label xUpperBoundLabel = new Label("Upper Bound:")
  private Label xTickUnitLabel = new Label("Tick Unit:")
  private Label xTitleLabel = new Label("Axis Title:")

  private Label yLowerBoundLabel = new Label("Lower Bound:")
  private Label yUpperBoundLabel = new Label("Upper Bound:")
  private Label yTickUnitLabel = new Label("Tick Unit:")
  private Label yTitleLabel = new Label("Axis Title:")

  private Label chartTitleLabel = new Label("Chart Title:")

  // Text
  @Element(name="xlowerbound",required=false)
  private TextField xLowerBoundText = new TextField("")
  @Element(name="xupperbound",required=false)
  private TextField xUpperBoundText = new TextField("")
  @Element(name="xtickunit",required=false)
  private TextField xTickUnitText = new TextField("")
  @Element(name="xtitle",required=false)
  private TextField xTitleText = new TextField("")
  @Element(name="xautorange",required=false)
  private CheckBox xAutoRangeCB = new CheckBox("Auto Ranging:")

  @Element(name="ylowerbound",required=false)
  private TextField yLowerBoundText = new TextField("")

  @Element(name="yupperbound",required=false)
  private TextField yUpperBoundText = new TextField("")

  @Element(name="ytickunit",required=false)
  private TextField yTickUnitText = new TextField("")

  @Element(name="ytitle",required=false)
  private TextField yTitleText = new TextField("")

  @Element(name="yautorange",required=false)
  private CheckBox yAutoRangeCB = new CheckBox("Auto Ranging:")

  @Element(name="title",required=false)
  private TextField chartTitleText = new TextField("")

  @Element(name="points",required=false)
  private Label pointsLabel = new Label("Points On/Off")
  private CheckBox pointsCB = new CheckBox("Points On/Off")

  @Element(name="tooltips",required=false)
  private Label tooltipsLabel = new Label("Tooltips On/Off")
  private CheckBox tooltipsCB = new CheckBox("Tooltips On/Off")

  private Axis          xAxis           = new NumberAxis()
  private NumberAxis    yAxis           = new NumberAxis()

  private List<String> header = new ArrayList()
  private List<List<String>> data = new ArrayList<List<String>>()

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    println "Running: $name"

    // Making deep copies of the header and data.
    header = state.dexData.header.collect { it }
    data = state.dexData.data.collect { row -> row.collect { it } }

    xListView.setItems(FXCollections.observableArrayList(header))
    yListView.setItems(FXCollections.observableArrayList(header))

    chart()
    return state
  }

  public chart()
  {
    List<XYChart.Series> chartData = new ArrayList<XYChart.Data>()
    List<XYChart.Series> chartSeries = new ArrayList<XYChart.Series>()

    try
    {
      xListView.getSelectionModel().getSelectedIndices().each
      { xIndex ->
        yListView.getSelectionModel().getSelectedIndices().each
        { yIndex ->
          chartData = new ArrayList<XYChart.Data>()
          data.each
          { row ->
            if (row[xIndex] && row[yIndex] && row[xIndex].trim().length() > 0 && row[yIndex].trim().length() > 0)
            {
              try
              {
                XYChart.Data point = new XYChart.Data(Double.parseDouble(row[xIndex]), Double.parseDouble(row[yIndex]))
                chartData.add(point)
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
    catch (NumberFormatException nfEx)
    {
      chartData = new ArrayList<XYChart.Data>()
      chartSeries = new ArrayList<XYChart.Series>()

      xAxis = new CategoryAxis()
      xListView.getSelectionModel().getSelectedIndices().each
      { xIndex ->
        yListView.getSelectionModel().getSelectedIndices().each
        { yIndex ->
          chartData = new ArrayList<XYChart.Data>()
          data.each
          { row ->
            try
            {
              chartData.add(new XYChart.Data(row[xIndex], Double.parseDouble(row[yIndex])))
            }
            catch (NumberFormatException infEx)
            {
              infEx.printStackTrace();
            }
          }
          chartSeries.add(new XYChart.Series(header[yIndex], FXCollections
              .observableArrayList(chartData)))
        }
      }
    }

    if (chartTypesListView.getSelectionModel().getSelectedItem() == null ||
    chartTypesListView.getSelectionModel().getSelectedItem().equals("Line Chart"))
    {
      chart = new LineChart(xAxis, yAxis, FXCollections.observableArrayList(chartSeries))
    }
    else if (chartTypesListView.getSelectionModel().getSelectedItem().equals("Bubble Chart"))
    {
      chart = new BubbleChart(xAxis, yAxis, FXCollections.observableArrayList(chartSeries))
    }
    else if (chartTypesListView.getSelectionModel().getSelectedItem().equals("Bar Chart"))
    {
      chart = new BarChart(xAxis, yAxis, FXCollections.observableArrayList(chartSeries))
    }
    else if (chartTypesListView.getSelectionModel().getSelectedItem().equals("Stacked Bar Chart"))
    {
      chart = new StackedBarChart(xAxis, yAxis, FXCollections.observableArrayList(chartSeries))
    }
    else if (chartTypesListView.getSelectionModel().getSelectedItem().equals("Area Chart"))
    {
      chart = new AreaChart(xAxis, yAxis, FXCollections.observableArrayList(chartSeries))
    }
    else if (chartTypesListView.getSelectionModel().getSelectedItem().equals("Scatter Chart"))
    {
      chart = new ScatterChart(xAxis, yAxis, FXCollections.observableArrayList(chartSeries))
    }
    else if (chartTypesListView.getSelectionModel().getSelectedItem().equals("Stacked Area Chart"))
    {
      chart = new StackedAreaChart(xAxis, yAxis, FXCollections.observableArrayList(chartSeries))
    }
    else
    {
      chart = new LineChart(xAxis, yAxis, FXCollections.observableArrayList(chartSeries))
    }

    //    int ci = 0;
    //    for (Node node : chart.lookupAll(".chart-line-symbol")) {
    //      System.out.println("NODE: " + node);
    //    }

    switch (chartTypesListView.getSelectionModel().getSelectedItem())
    {
      case "Line Chart" :
        ((LineChart)chart).setCreateSymbols(pointsCB.isSelected());
        break;
      case "Area Chart" :
        ((AreaChart)chart).setCreateSymbols(pointsCB.isSelected());
        break;
      case "Stacked Area Chart" :
        ((StackedAreaChart)chart).setCreateSymbols(pointsCB.isSelected());
        break;
    }

    switch (chartTypesListView.getSelectionModel().getSelectedItem())
    {
      case "Line Chart" :
      case "Area Chart" :
      case "Stacked Area Chart" :
      // Tooltips!
        if (tooltipsCB.isSelected())
        {
          for (Series<Object, Object> series : chart.getData())
          {
            for (Data<Object, Object> data : series.getData())
            {
              Tooltip tip = new Tooltip()
              tip.setText("SERIES: " + series.getName() + ": [ X=" + data.getXValue() + ", Y=" + data.getYValue().toString() + " ]")
              Tooltip.install(data.getNode(), tip)
            }
          }
        }
        break;
    }

    chart.setStyle("-fx-font-size: 24px;")

    dynamicChartPane?.getChildren()?.clear()
    dynamicChartPane?.add(chart, "grow")
  }

  public javafx.scene.Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[grow]", "[grow]")

      xAutoRangeCB.setSelected(true)
      yAutoRangeCB.setSelected(true)
      pointsCB.setSelected(false)
      tooltipsCB.setSelected(false)

      SplitPane vSplitPane = new SplitPane()
      vSplitPane.setOrientation(Orientation.VERTICAL)

      SplitPane hSplitPane = new SplitPane()
      hSplitPane.setOrientation(Orientation.HORIZONTAL)

      MigPane chartConfigPane = new MigPane("", "[grow]","[grow]")

      // Config pane
      MigPane dynamicConfigPane = new MigPane("", "[][grow]", "[][][][][][][][][][][][][][][]")

      dynamicConfigPane.add(NodeFactory.createTitle("XY Chart Configuration"), "grow,span")
      dynamicConfigPane.add(new Text("X-Axis Options"), "span, growx, alignx center")
      dynamicConfigPane.add(xUpperBoundLabel)
      dynamicConfigPane.add(xUpperBoundText, "span,grow")
      dynamicConfigPane.add(xLowerBoundLabel)
      dynamicConfigPane.add(xLowerBoundText, "span,grow")
      dynamicConfigPane.add(xTickUnitLabel)
      dynamicConfigPane.add(xTickUnitText, "span,grow")
      dynamicConfigPane.add(xTitleLabel)
      dynamicConfigPane.add(xTitleText, "span,grow")
      dynamicConfigPane.add(new Label("Autorange:"))
      dynamicConfigPane.add(xAutoRangeCB, "span")
      dynamicConfigPane.add(new Text("Y-Axis Options"), "span, growx, alignx center")
      dynamicConfigPane.add(yUpperBoundLabel)
      dynamicConfigPane.add(yUpperBoundText, "span,grow")
      dynamicConfigPane.add(yLowerBoundLabel)
      dynamicConfigPane.add(yLowerBoundText, "span,grow")
      dynamicConfigPane.add(yTickUnitLabel)
      dynamicConfigPane.add(yTickUnitText, "span,grow")
      dynamicConfigPane.add(yTitleLabel)
      dynamicConfigPane.add(yTitleText, "span,grow")
      dynamicConfigPane.add(new Label("Autorange:"))
      dynamicConfigPane.add(yAutoRangeCB, "span")
      dynamicConfigPane.add(new Text("Chart Options"), "span, growx, alignx center")
      dynamicConfigPane.add(chartTitleLabel)
      dynamicConfigPane.add(chartTitleText, "span,grow")

      dynamicConfigPane.add(pointsCB, "span,grow")
      dynamicConfigPane.add(tooltipsCB, "span,grow");

      dynamicChartPane = new MigPane("", "[grow]","[grow]")

      chartTypesListView.setItems(FXCollections.observableArrayList([
        "Line Chart",
        "Area Chart",
        "Scatter Chart",
        "Stacked Area Chart",
        // Not ready yet...
        //"Bubble Chart",
        //"Bar Chart",
        //"Stacked Bar Chart"
      ]))

      vSplitPane.getItems().addAll(chartTypesListView, xListView, yListView, dynamicConfigPane)
      vSplitPane.setDividerPositions(0.15, 0.35, 0.50)

      chartConfigPane.add(vSplitPane, "grow,span")

      hSplitPane.getItems().addAll(chartConfigPane, dynamicChartPane)
      hSplitPane.setDividerPositions(0.20)

      configPane.add(hSplitPane, "grow,span")

      xListView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE)
      yListView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE)

      chartTypesListView.getSelectionModel().selectedItemProperty().addListener(new ReflectiveChangeListener(this, "updateChart"))
      xListView.getSelectionModel().selectedItemProperty().addListener(new ReflectiveChangeListener(this, "updateChart"))
      yListView.getSelectionModel().selectedItemProperty().addListener(new ReflectiveChangeListener(this, "updateChart"))

      xUpperBoundText.setOnAction(new ReflectiveActionEventHandler(this, "setXUpperBound"))
      xLowerBoundText.setOnAction(new ReflectiveActionEventHandler(this, "setXLowerBound"))
      xTickUnitText.setOnAction(new ReflectiveActionEventHandler(this, "setXTickUnit"))
      xTitleText.setOnAction(new ReflectiveActionEventHandler(this, "setXTitle"))
      xAutoRangeCB.setOnAction(new ReflectiveActionEventHandler(this, "setXAutoRanging"))

      yUpperBoundText.setOnAction(new ReflectiveActionEventHandler(this, "setYUpperBound"))
      yLowerBoundText.setOnAction(new ReflectiveActionEventHandler(this, "setYLowerBound"))
      yTickUnitText.setOnAction(new ReflectiveActionEventHandler(this, "setYTickUnit"))
      yTitleText.setOnAction(new ReflectiveActionEventHandler(this, "setYTitle"))
      yAutoRangeCB.setOnAction(new ReflectiveActionEventHandler(this, "setYAutoRanging"))

      chartTitleText.setOnAction(new ReflectiveActionEventHandler(this, "setTitle"))
      pointsCB.setOnAction(new ReflectiveActionEventHandler(this, "setPoints"))
    }

    return configPane
  }

  public void updateChart(ObservableValue<? extends DataFilter> ov,
      Object objOld, Object objNew)
  {
    println "selectX: ov=$ov old=$objOld new=$objNew"
    chart()
  }

  public void setXUpperBound(ActionEvent evt)
  {
    if (xAxis instanceof NumberAxis)
    {
      ((NumberAxis)xAxis).setUpperBound(Double.parseDouble(xUpperBoundText.getText()))
      chart.layout()
    }
  }

  public void setXLowerBound(ActionEvent evt)
  {
    if (xAxis instanceof NumberAxis)
    {
      ((NumberAxis)xAxis).setLowerBound(Double.parseDouble(xLowerBoundText.getText()))
      chart.layout()
    }
  }

  public void setXTickUnit(ActionEvent evt)
  {
    if (xAxis instanceof NumberAxis)
    {
      ((NumberAxis)xAxis).setTickUnit(Double.parseDouble(xTickUnitText.getText()))
      chart.layout()
    }
  }

  public void setXTitle(ActionEvent evt)
  {
    xAxis.setLabel(xTitleText.getText())
    chart.layout()
  }

  public void setYUpperBound(ActionEvent evt)
  {
    yAxis.setUpperBound(Double.parseDouble(yUpperBoundText.getText()))
    chart.layout()
  }

  public void setYLowerBound(ActionEvent evt)
  {
    yAxis.setLowerBound(Double.parseDouble(yLowerBoundText.getText()))
    chart.layout()
  }

  public void setYTickUnit(ActionEvent evt)
  {
    yAxis.setTickUnit(Double.parseDouble(yTickUnitText.getText()))
    chart.layout()
  }

  public void setYTitle(ActionEvent evt)
  {
    yAxis.setLabel(yTitleText.getText())
    chart.layout()
  }

  public void setXAutoRanging(ActionEvent evt)
  {
    println "Setting X Autorange: ${xAutoRangeCB.isSelected()}"
    xAxis.setAutoRanging(xAutoRangeCB.isSelected())
    if (xAxis instanceof NumberAxis)
    {
      try
      {
        ((NumberAxis)xAxis).setUpperBound(Double.parseDouble(xUpperBoundText.getText()))
      }
      catch (Exception ex)
      {
        // No big deal.
      }
      try
      {
        ((NumberAxis)xAxis).setLowerBound(Double.parseDouble(xLowerBoundText.getText()))
      }
      catch (Exception ex)
      {
        // No big deal.
      }
      try
      {
        ((NumberAxis)xAxis).setTickUnit(Double.parseDouble(xTickUnitText.getText()))
      }
      catch (Exception ex)
      {
        // No big deal.
      }
      xAxis.layout()
      chart.layout()
    }
  }

  public void setYAutoRanging(ActionEvent evt)
  {
    println "Setting Y Autorange: ${yAutoRangeCB.isSelected()}"
    yAxis.setAutoRanging(yAutoRangeCB.isSelected())
    try
    {
      yAxis.setUpperBound(Double.parseDouble(yUpperBoundText.getText()))
    }
    catch (Exception ex)
    {
      // No big deal.
    }
    try
    {
      yAxis.setLowerBound(Double.parseDouble(yLowerBoundText.getText()))
    }
    catch (Exception ex)
    {
      // No big deal.
    }
    try
    {
      yAxis.setTickUnit(Double.parseDouble(yTickUnitText.getText()))
    }
    catch (Exception ex)
    {
      // No big deal.
    }
    yAxis.layout()
    chart.layout()
  }

  public void setTitle(ActionEvent evt)
  {
    chart.setTitle(chartTitleText.getText())
  }

  public void setPoints(ActionEvent evt)
  {
    if (chart instanceof LineChart)
    {
      ((LineChart)chart).setCreateSymbols(pointsCB.isSelected())
    }
  }
}
