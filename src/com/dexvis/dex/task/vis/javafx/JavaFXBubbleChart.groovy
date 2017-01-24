package com.dexvis.dex.task.vis.javafx


import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.event.ActionEvent
import javafx.geometry.Orientation
import javafx.scene.Node
import javafx.scene.Parent
import javafx.scene.chart.Axis
import javafx.scene.chart.CategoryAxis
import javafx.scene.chart.NumberAxis
import javafx.scene.chart.ScatterChart
import javafx.scene.chart.XYChart
import javafx.scene.chart.XYChart.Data
import javafx.scene.chart.XYChart.Series
import javafx.scene.control.Label
import javafx.scene.control.ListView
import javafx.scene.control.SelectionMode
import javafx.scene.control.Slider
import javafx.scene.control.SplitPane
import javafx.scene.control.TextField
import javafx.scene.control.Tooltip
import javafx.scene.image.Image
import javafx.scene.layout.HBox
import javafx.scene.paint.Color
import javafx.scene.shape.Circle
import javafx.scene.text.Text

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.event.ReflectiveChangeListener
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.ListUtil

@Root
class JavaFXBubbleChart extends DexTask {
  public JavaFXBubbleChart() {
    super()
    setCategory("Visualization : JavaFX")
    setName("Bubble Chart")
    setHelpFile("visualization/javafx/BubbleChart.html")
  }

  private MigPane configPane = null

  @Element(name="xlist", required=false)
  private ListView<String> xListView = new ListView<String>()
  @Element(name="ylist", required=false)
  private ListView<String> yListView = new ListView<String>()
  @Element(name="sizelist", required=false)
  private ListView<String> zListView = new ListView<String>()
  @Element(name="opacitylist", required=false)
  private ListView<String> oListView = new ListView<String>()
  private double MAX_BUBBLE_SIZE=50
  private double MAX_OPACITY=1.0

  private MigPane dynamicChartPane = null
  private ScatterChart chart = null
  private Axis xAxis = new NumberAxis()
  private Axis yAxis = new NumberAxis()

  List<Color> colorwheel = [
    Color.BLUE,
    Color.GREEN,
    Color.RED,
    Color.CYAN,
    Color.PURPLE,
    Color.YELLOW
  ]

  private void dump(Node n, int depth) {
    for (int i = 0; i < depth; i++) System.out.print("  ")
    System.out.println(n)
    if (n instanceof Parent) for (Node c: ((Parent) n).getChildrenUnmodifiable()) dump(c, depth + 1)
  }

  // Labels
  private Label chartTitleLabel = new Label("Chart Title:")
  private Label xTitleLabel = new Label("X Axis Title:")
  private Label yTitleLabel = new Label("Y Axis Title:")

  @Element(name="title", required=false)
  private TextField chartTitleText = new TextField("")

  @Element(name="xtitle", required=false)
  private TextField xTitleText = new TextField("")

  @Element(name="ytitle", required=false)
  private TextField yTitleText = new TextField("")

  private List<String> header = new ArrayList()
  private List<List<String>> data = new ArrayList<List<String>>()

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    println "Running: $name"

    // Making deep copies of the header and data.
    header = state.dexData.header.collect { it }
    data = state.dexData.data.collect { row -> row.collect { it } }

    println "Numeric Columns: ${state.dexData.getNumericColumns()}"

    xListView.setItems(FXCollections.observableArrayList(state.dexData.getHeader()))
    yListView.setItems(FXCollections.observableArrayList(state.dexData.getHeader()))
    zListView.setItems(FXCollections.observableArrayList(state.dexData.getNumericColumns()))
    oListView.setItems(FXCollections.observableArrayList(state.dexData.getNumericColumns()))

    chart()

    return state
  }

  public chart()
  {
    List<XYChart.Series> chartData = new ArrayList<XYChart.Data>()
    List<XYChart.Series> chartSeries = new ArrayList<XYChart.Series>()
    HBox legend = new HBox()

    double x, y, z, o
    double lbx = Double.MAX_VALUE
    double ubx = Double.MIN_VALUE
    double lby = Double.MAX_VALUE
    double uby = Double.MIN_VALUE
    Color color
    int curColor = 0
    boolean opacityMode = false
    boolean sizeMode = false
    List<Map<String, Double>> seriesStats = []
    int zIndex
    int oIndex

    if (xListView.getSelectionModel().getSelectedIndex() < 0 || yListView.getSelectionModel().getSelectedIndex() < 0)
    {
      return
    }

    int zRawIndex = zListView.getSelectionModel().getSelectedIndex()
    int oRawIndex = oListView.getSelectionModel().getSelectedIndex()

    println "zRawIndex: $zRawIndex"
    if (zRawIndex < 0)
    {
      sizeMode = false
    }
    else
    {
      zIndex = header.findIndexOf { it == zListView.getItems().get(zRawIndex) }
      println "zIndex: $zIndex"
      if (ListUtil.columnIsNumeric(data, zIndex))
      {
        sizeMode = true
      }
      else
      {
        sizeMode = false
      }
    }

    if (oRawIndex < 0)
    {
      opacityMode = false
    }
    else
    {
      oIndex = header.findIndexOf { it == oListView.getItems().get(oRawIndex) }
      if (ListUtil.columnIsNumeric(data, oIndex))
      {
        opacityMode = true
      }
      else
      {
        opacityMode = false
      }
    }

    println "zIndex = $zIndex, oIndex=$oIndex, sizeMode = $sizeMode, opacityMode = $opacityMode"

    double minOpacity = Double.MAX_VALUE
    double maxOpacity = Double.MIN_VALUE
    double minSize = Double.MAX_VALUE
    double maxSize = Double.MIN_VALUE
    boolean allXNumerics = true
    boolean allYNumerics = true

    // Determine axis and series bounds
    xListView.getSelectionModel().getSelectedIndices().each
    { xIndex ->

      // Determining upper and lower bounds for x values.
      if (ListUtil.columnIsNumeric(data, xIndex))
      {
        data.each
        { row ->
          x = Double.parseDouble(row[xIndex])
          lbx = Math.min(x, lbx)
          ubx = Math.max(x, ubx)
        }
      }
      else
      {
        allXNumerics = false
      }
    }

    yListView.getSelectionModel().getSelectedIndices().each
    { yIndex ->
      // Determining upper and lower bounds for y values.
      if (ListUtil.columnIsNumeric(data, yIndex))
      {
        data.each
        { row ->
          y = Double.parseDouble(row[yIndex])
          lby = Math.min(y, lby)
          uby = Math.max(y, uby)
        }
      }
      else
      {
        allYNumerics = false
      }
    }

    // Determine size and opacity ranges
    if (sizeMode && ListUtil.columnIsNumeric(data, zIndex))
    {
      data.each
      { row ->
        z = Double.parseDouble(row[zIndex])
        minSize = Math.min(z, minSize)
        maxSize = Math.max(z, maxSize)
      }
    }
    else
    {
      sizeMode = false
    }

    if (opacityMode && ListUtil.columnIsNumeric(data, oIndex))
    {
      data.each
      { row ->
        o = Double.parseDouble(row[oIndex])
        minOpacity = Math.min(o, minOpacity)
        maxOpacity = Math.max(o, maxOpacity)
      }
    }
    else
    {
      opacityMode = false
    }

    double xTick = Math.abs(ubx - lbx) / 10
    double yTick = Math.abs(uby - lby) / 10

    if (allXNumerics)
    {
      xAxis = new NumberAxis("label", lbx, ubx, xTick)
    }
    else
    {
      xAxis = new CategoryAxis()
    }
    if (allYNumerics)
    {
      yAxis = new NumberAxis("label", lby, uby, yTick)
    }
    else
    {
      yAxis = new CategoryAxis()
    }

    int seriesStatsIndex = 0
    def boolean xIsNumeric
    def boolean yIsNumeric

    xListView.getSelectionModel().getSelectedIndices().each
    { xIndex ->
      xIsNumeric = ListUtil.columnIsNumeric(data, xIndex)
      yListView.getSelectionModel().getSelectedIndices().each
      { yIndex ->
        yIsNumeric = ListUtil.columnIsNumeric(data, yIndex)

        color = colorwheel[curColor++ % colorwheel.size()]
        chartData = new ArrayList<XYChart.Data>()
        data.each
        { row ->
          if (allXNumerics && xIsNumeric)
          {
            x = Double.parseDouble(row[xIndex])
          }
          if (allYNumerics && yIsNumeric)
          {
            y = Double.parseDouble(row[yIndex])
          }

          if (sizeMode)
          {
            z = Double.parseDouble(row[zIndex])
          }
          else
          {
            z = MAX_BUBBLE_SIZE / 2
          }
          if (opacityMode)
          {
            o = Double.parseDouble(row[oIndex])
          }
          else
          {
            o = MAX_OPACITY
          }
          XYChart.Data point

          if (xIsNumeric)
          {
            if (yIsNumeric)
            {
              point = new XYChart.Data(x, y, z)
            }
            else
            {
              point = new XYChart.Data(x, row[yIndex], z)
            }
          }
          else
          {
            if (yIsNumeric)
            {
              point = new XYChart.Data(row[xIndex], y, z)
            }
            else
            {
              point = new XYChart.Data(row[xIndex], row[yIndex], z)
            }
          }

          Circle circle = new Circle()

          if (sizeMode)
          {
            if (minSize == maxSize)
            {
              circle.setRadius(MAX_BUBBLE_SIZE / 2)
            }
            else
            {
              println "z=$z, minSize=$minSize, maxSize=$maxSize, size=${((z - minSize) / Math.abs(maxSize - minSize)) * MAX_BUBBLE_SIZE}"
              circle.setRadius(((z - minSize) / Math.abs(maxSize - minSize)) * MAX_BUBBLE_SIZE)
            }
          }
          else
          {
            circle.setRadius(MAX_BUBBLE_SIZE / 2)
          }

          if (opacityMode)
          {
            if (minOpacity == maxOpacity)
            {
              circle.setOpacity(MAX_OPACITY)
            }
            else
            {
              println "OPACITY: ${((o - minOpacity) / Math.abs(maxOpacity - minOpacity))}"
              circle.setOpacity((o - minOpacity) / Math.abs(maxOpacity - minOpacity) * MAX_OPACITY)
            }
          }
          else
          {
            circle.setOpacity(MAX_OPACITY)
          }

          circle.setFill(color)
          point.setNode(circle)
          chartData.add(point)
        }

        Series curSeries = new Series(header[yIndex], FXCollections
            .observableArrayList(chartData))

        Label label = new Label(header[yIndex])
        Circle circle = new Circle(5)
        circle.setFill(color)
        MigPane migPane = new MigPane("", "[][]", "[]")
        migPane.add(label, "")
        migPane.add(circle, "")
        legend.getChildren().add(migPane)
        chartSeries.add(curSeries)
      }
    }

    println "lbx: $lbx, ubx: $ubx, xTick: $xTick, lby: $lby, uby: $uby, yTick: $yTick"

    chart = new ScatterChart<String, Number>(xAxis, yAxis)

    chart.getData().addAll(chartSeries)

    chart.setLegend(legend)

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

    dynamicChartPane?.getChildren()?.clear()
    dynamicChartPane?.add(chart, "grow")
  }

  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("debug", "[grow]", "[grow]")

      SplitPane vSplitPane = new SplitPane()
      vSplitPane.setOrientation(Orientation.VERTICAL)

      SplitPane hSplitPane = new SplitPane()
      hSplitPane.setOrientation(Orientation.HORIZONTAL)

      MigPane chartConfigPane = new MigPane("", "[grow]","[grow]")

      // Config pane
      MigPane dynamicConfigPane = new MigPane("", "[grow]", "[]")


      Text opacityText = new Text("Opacity")

      Slider opacitySlider = new Slider()
      opacitySlider.setMin(0)
      opacitySlider.setMax(100)
      opacitySlider.setMajorTickUnit(10)
      opacitySlider.setValue(100)

      Text bubbleSizeText = new Text("Bubble Size")
      Slider maxSizeSlider = new Slider()
      maxSizeSlider.setMin(1)
      maxSizeSlider.setMax(500)
      maxSizeSlider.setMajorTickUnit(50)
      maxSizeSlider.setValue(MAX_BUBBLE_SIZE)

      opacitySlider.valueProperty().addListener(new ReflectiveChangeListener(this, "changeOpacity"))
      maxSizeSlider.valueProperty().addListener(new ReflectiveChangeListener(this, "changeMaxBubbleSize"))

      dynamicConfigPane.add(NodeFactory.createTitle("Bubble Chart Configuration"), "grow,span")
      dynamicConfigPane.add(xTitleLabel)
      dynamicConfigPane.add(xTitleText, "span,grow")
      dynamicConfigPane.add(yTitleLabel)
      dynamicConfigPane.add(yTitleText, "span,grow")
      dynamicConfigPane.add(chartTitleLabel)
      dynamicConfigPane.add(chartTitleText, "span,grow")

      dynamicConfigPane.add(opacityText, "span, alignx center")
      dynamicConfigPane.add(opacitySlider, "span, growx")
      dynamicConfigPane.add(bubbleSizeText, "span, alignx center")
      dynamicConfigPane.add(maxSizeSlider, "span, growx")

      dynamicChartPane = new MigPane("", "[grow]","[grow]")

      MigPane xPane = new MigPane("", "[grow]", "[][grow]")
      xPane.add(new Text("X Axis"), "alignx center, span")
      xPane.add(xListView, "span, grow")

      MigPane yPane = new MigPane("", "[grow]", "[][grow]")
      yPane.add(new Text("Y Axis"), "alignx center, span")
      yPane.add(yListView, "span, grow")

      MigPane zPane = new MigPane("", "[grow]", "[][grow]")
      zPane.add(new Text("Bubble Size"), "alignx center, span")
      zPane.add(zListView, "span, grow")

      MigPane oPane = new MigPane("", "[grow]", "[][grow]")
      oPane.add(new Text("Opacity"), "alignx center, span")
      oPane.add(oListView, "span, grow")

      vSplitPane.getItems().addAll(xPane, yPane, zPane, oPane, dynamicConfigPane)
      vSplitPane.setDividerPositions(0.20, 0.40, 0.60, 0.80)

      chartConfigPane.add(vSplitPane, "grow,span")

      hSplitPane.getItems().addAll(chartConfigPane, dynamicChartPane)
      hSplitPane.setDividerPositions(0.25)

      configPane.add(hSplitPane, "grow,span")

      xListView.getSelectionModel().setSelectionMode(SelectionMode.SINGLE)
      yListView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE)
      zListView.getSelectionModel().setSelectionMode(SelectionMode.SINGLE)
      oListView.getSelectionModel().setSelectionMode(SelectionMode.SINGLE)

      xListView.getSelectionModel().selectedItemProperty().addListener(new ReflectiveChangeListener(this, "updateChart"))
      yListView.getSelectionModel().selectedItemProperty().addListener(new ReflectiveChangeListener(this, "updateChart"))
      zListView.getSelectionModel().selectedItemProperty().addListener(new ReflectiveChangeListener(this, "updateChart"))
      oListView.getSelectionModel().selectedItemProperty().addListener(new ReflectiveChangeListener(this, "updateChart"))

      xTitleText.setOnAction(new ReflectiveActionEventHandler(this, "setXTitle"))

      yTitleText.setOnAction(new ReflectiveActionEventHandler(this, "setYTitle"))

      chartTitleText.setOnAction(new ReflectiveActionEventHandler(this, "setTitle"))
    }

    return configPane
  }

  public void updateChart(ObservableValue<? extends Object> ov,
      Object objOld, Object objNew)
  {
    println "selectX: ov=$ov old=$objOld new=$objNew"
    chart()
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

  public void changeOpacity(ObservableValue<? extends Object> ov,
      Object objOld, Object objNew)
  {
    println "changeOpacity: ov=$ov old=$objOld new=$objNew"
    MAX_OPACITY = (double) objNew / 100
    chart()
  }

  public void changeMaxBubbleSize(ObservableValue<? extends Object> ov,
      Object objOld, Object objNew)
  {
    println "changeMaxSize: ov=$ov old=$objOld new=$objNew"
    MAX_BUBBLE_SIZE = (double) objNew
    chart()
  }
}
