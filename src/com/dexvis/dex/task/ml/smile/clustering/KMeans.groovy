package com.dexvis.dex.task.ml.smile.clustering

import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.Slider
import javafx.scene.control.TextField
import javafx.scene.input.MouseEvent
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.controlsfx.control.ListSelectionView
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.WebViewUtil

@Root(name="kmeans")
class KMeans extends DexTask {
  public KMeans() {
    super("Machine Learning", "KMeans", "ml/smile/clustering/KMeans.html")
  }
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField("KMEANS")
  
  private Button clearButton = new Button("Clear")
  
  @Element(name="numClusters", required=false)
  Slider numClustersSlider = new Slider(1, 100, 4)
  
  Label numClustersValueLabel = new Label("")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
    def selected
    def dex = state.getDexData();
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
    }
    
    if (columnListView.getTargetItems().size() <= 0)
    {
      throw new DexException("${getName()} : You must select at least one column for consideration.")
    }
    
    // Define base attributes
    def columns = columnListView.getTargetItems()
    def ndata= dex.getDoubles(columns)
    
    smile.clustering.KMeans kmeans = new smile.clustering.KMeans(ndata,
        numClustersValueLabel.getText() as Integer)
    println "KMEANS: ${kmeans}"
    
    ndata.eachWithIndex { row, ri ->
      dex.data[ri] << new String("${kmeans.predict(row)}")
    }
    
    WebViewUtil.displayGroovyTemplate(we, "web/ml/smile/KMeans.gtmpl", [
      "centroids": kmeans.centroids(),
      "clusterLabels": kmeans.getClusterLabel(),
      "clusterValues": ndata,
      "distortion": kmeans.distortion()
    ])
    
    dex.header << new String("${columnNameText.getText()}")
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label numClustersLabel = new Label("# Clusters")
      Label columnNameLabel = new Label("Column Name")
      
      configPane = new MigPane("", "[][grow]", "[][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("KMeans"), "grow,span")
      configPane.add(columnListView, "grow,span")
      
      configPane.add(numClustersValueLabel, "grow,span");
      configPane.add(numClustersLabel);
      configPane.add(numClustersSlider, "grow,span")
      
      numClustersSlider.setMinorTickCount(0)

      numClustersSlider.setMajorTickUnit(1)
      numClustersSlider.snapToTicksProperty().set(true)
      numClustersSlider.setShowTickLabels(false)
      
      numClustersSlider.setShowTickMarks(true)
      numClustersValueLabel.setText((((int) numClustersSlider.getValue()) as String))
      
      numClustersSlider.setOnMouseDragged({ MouseEvent event ->
        numClustersValueLabel.setText((((int) numClustersSlider.getValue()) as String))
      })
      
      configPane.add(columnNameLabel)
      configPane.add(columnNameText, "grow,span")

      configPane.add(wv, "grow,span")
      configPane.add(clearButton, "grow,span")

      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
      } as EventHandler);
    }
    return configPane
  }
}
