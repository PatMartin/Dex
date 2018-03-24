package com.dexvis.dex.task.ml.regression

import javafx.scene.Node
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label

import org.apache.commons.math3.stat.regression.SimpleRegression
import org.controlsfx.control.ListSelectionView
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="linear-regression")
class LinearRegression extends DexTask {
  public LinearRegression() {
    super("Machine Learning: Regression", "Linear Regression",
    "ml/smile/regression/LinearRegression.html")
  }
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="xColumn", required=false)
  private ChoiceBox xCB = new ChoiceBox();
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    def dex = state.getDexData()
    def types = dex.guessTypes()
    boolean initializing = false;
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
      initializing = true
    }
    
    if (xCB.getItems().size() == 0)
    {
      xCB.getItems().addAll(state.getDexData().getHeader())
      initializing = true
    }
    
    if (!initializing) {
      // Define base attributes
      def xseries = dex.getColumnAsDouble(xCB.getSelectionModel().getSelectedItem() as String)
      def columns = columnListView.getTargetItems()
      def yseries = []
      def regressions = []

      columns.eachWithIndex {
        col, ci ->
        yseries << dex.getColumnAsDouble(col)
        regressions << new SimpleRegression()
      }
      
      xseries.eachWithIndex {
        x, xi ->
        yseries.eachWithIndex {
          ys, yi ->
          regressions[yi].addData(x, ys[xi])
        }
      }
      
      xseries.eachWithIndex {
        x, xi ->
        regressions.each {
          regression ->
          dex.data[xi] << ("" + (regression.slope * x + regression.intercept))
        }
      }
      
      columns.each {
        column ->
        dex.header << "REG_${column}"
      }
    }
    
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label xLabel = new Label("Select X:")
      configPane = new MigPane("", "[][grow]", "[][][grow]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Linear Regression"), "grow,span")
      configPane.add(xLabel)
      configPane.add(xCB, "span")
      configPane.add(columnListView, "grow,span")
    }
    return configPane
  }
  
}
