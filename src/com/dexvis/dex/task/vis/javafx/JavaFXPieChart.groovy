package com.dexvis.dex.task.vis.javafx

import javafx.beans.value.ChangeListener
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import javafx.event.ActionEvent
import javafx.geometry.Orientation
import javafx.geometry.Side
import javafx.scene.Node
import javafx.scene.chart.PieChart
import javafx.scene.control.CheckBox
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.ListView
import javafx.scene.control.SelectionMode
import javafx.scene.control.SplitPane
import javafx.scene.control.TextField

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.DataFilter
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class JavaFXPieChart extends DexTask {
  public JavaFXPieChart() {
    super()
    setCategory("Visualization : JavaFX")
    setName("Pie Chart")
    setHelpFile("visualization/javafx/PieChart.html")
  }
  
  private MigPane configPane = null
  
  @Element(name="xlist", required=false)
  private ListView<String> xListView = new ListView<String>()
  
  @Element(name="ylist", required=false)
  private ListView<String> yListView = new ListView<String>()
  
  private MigPane dynamicChartPane = null
  
  private PieChart chart = null
  
  // Labels
  private Label chartTitleLabel = new Label("Chart Title:")
  
  @Element(name="legendVisible", required=false)
  private CheckBox legendVisibleCB = new CheckBox("Legend Visible:")
  @Element(name="legendSide", required=false)
  private ChoiceBox legendSideCB = new ChoiceBox(FXCollections.observableArrayList("BOTTOM", "TOP", "LEFT", "RIGHT"))
  
  @Element(name="title", required=false)
  private TextField chartTitleText = new TextField("")
  
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
    List<PieChart.Data> chartData = new ArrayList<PieChart.Data>()
    
    def summary = [:]
    int xi = xListView.getSelectionModel().getSelectedIndex()
    int yi = header.findIndexOf { it == yListView.getSelectionModel().getSelectedItem().toString() }
    
    if (xi < 0 || yi < 0)
    {
      return
    }
    
    data.each { row ->
      if (summary.containsKey(row[xi]))
      {
        try
        {
          summary[row[xi]] += Double.parseDouble(row[yi])
        }
        catch (Exception ex)
        {
          ex.printStackTrace();
        }
      }
      else
      {
        try
        {
          summary[row[xi]] = Double.parseDouble(row[yi])
        }
        catch (Exception ex)
        {
          ex.printStackTrace();
        }
      }
    }
    
    summary.each
    { item ->
      //println "adding [ ${item.key}, ${item.value} ]"
      chartData.add(new PieChart.Data(item.key.toString(), item.value))
    }
    
    chart = new PieChart(FXCollections.observableArrayList(chartData))
    chart.setLegendVisible(legendVisibleCB.isSelected())
    
    String selection = legendSideCB.getValue()
    
    if (selection.equals("TOP"))
    {
      chart.setLegendSide(Side.TOP)
    }
    else if (selection.equals("LEFT"))
    {
      chart.setLegendSide(Side.LEFT)
    }
    else if (selection.equals("RIGHT"))
    {
      chart.setLegendSide(Side.RIGHT)
    }
    else
    {
      chart.setLegendSide(Side.BOTTOM)
    }
    
    // Set series colors
    int ci = 0;
    for (PieChart.Data data : chart.getData())
    {
      data.getNode().getStyleClass().remove("default-color" + (ci % 8));
      data.getNode().getStyleClass().add("default-color" + (ci % NUM_CHART_COLORS));
      ci++;
    }
    
    ci = 0;
    for (Node node : chart.lookupAll(".chart-legend-item")) {
      if (node instanceof Label && ((Label) node).getGraphic() != null) {
        ((Label) node).getGraphic().getStyleClass().remove("default-color" + (ci % 8));
        ((Label) node).getGraphic().getStyleClass().add("default-color" + (ci % NUM_CHART_COLORS));
      }
      ci++;
    }
    
    chart.setTitle(chartTitleText.getText())
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
      
      legendVisibleCB.setSelected(true)
      legendVisibleCB.setOnAction({ event -> toggleLegend(event) })
      
      legendSideCB.getSelectionModel().selectedIndexProperty().addListener((ChangeListener){obj, oldVal, newVal ->
        changeLegendSide(obj, oldVal, newVal)})
      
      dynamicConfigPane.add(NodeFactory.createTitle("Pie Chart Configuration"), "grow,span")
      dynamicConfigPane.add(chartTitleLabel)
      dynamicConfigPane.add(chartTitleText, "grow,span")
      dynamicConfigPane.add(new Label("Legend Visible:"))
      dynamicConfigPane.add(legendVisibleCB, "span")
      dynamicConfigPane.add(new Label("Legend Location:"))
      dynamicConfigPane.add(legendSideCB, "span")
      
      dynamicChartPane = new MigPane("", "[grow]","[grow]")
      
      vSplitPane.getItems().addAll(xListView, yListView, dynamicConfigPane)
      vSplitPane.setDividerPositions(0.40, 0.80)
      
      chartConfigPane.add(vSplitPane,"grow,span")
      
      hSplitPane.getItems().addAll(chartConfigPane, dynamicChartPane)
      hSplitPane.setDividerPositions(0.20)
      
      configPane.add(hSplitPane, "grow,span")
      
      xListView.getSelectionModel().setSelectionMode(SelectionMode.SINGLE)
      yListView.getSelectionModel().setSelectionMode(SelectionMode.SINGLE)
      
      xListView.getSelectionModel().selectedItemProperty().addListener((ChangeListener){obj, oldVal, newVal -> updateChart(obj, oldVal, newVal)})
      yListView.getSelectionModel().selectedItemProperty().addListener((ChangeListener){obj, oldVal, newVal -> updateChart(obj, oldVal, newVal)})
      
      chartTitleText.setOnAction({ event -> setTitle(event) })
    }
    
    return configPane
  }
  
  public void updateChart(ObservableValue<? extends DataFilter> ov,
      Object objOld, Object objNew)
  {
    chart()
  }
  
  public void toggleLegend(ActionEvent evt)
  {
    chart.setLegendVisible(legendVisibleCB.isSelected())
  }
  
  public void changeLegendSide(ObservableValue<? extends String> ov,
      Object objOld, Object objNew)
  {
    String selection = legendSideCB.getItems().get((int) objNew)
    
    if (selection.equals("TOP"))
    {
      chart.setLegendSide(Side.TOP)
    }
    else if (selection.equals("LEFT"))
    {
      chart.setLegendSide(Side.LEFT)
    }
    else if (selection.equals("RIGHT"))
    {
      chart.setLegendSide(Side.RIGHT)
    }
    else
    {
      chart.setLegendSide(Side.BOTTOM)
    }
  }
  
  public void setTitle(ActionEvent evt)
  {
    chart.setTitle(chartTitleText.getText())
    //println "There are: ${data.size()} rows"
  }
}
