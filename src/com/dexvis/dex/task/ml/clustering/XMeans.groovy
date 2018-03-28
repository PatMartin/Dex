package com.dexvis.dex.task.ml.clustering

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
class XMeans extends DexTask {
  public XMeans() {
    super("Machine Learning: Clustering", "XMeans", "machine_learning/clustering/XMeans.html")
  }
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField("XMEANS")
  
  private Button clearButton = new Button("Clear")
  
  @Element(name="maxClusters", required=false)
  Slider maxClustersSLider = new Slider(1, 100, 4)
  
  Label maxClustersValueLabel = new Label("")
  
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
    
    smile.clustering.XMeans xmeans = new smile.clustering.XMeans(ndata,
        maxClustersValueLabel.getText() as Integer)
    println "XMEANS: ${xmeans}"
    
    ndata.eachWithIndex { row, ri ->
      dex.data[ri] << new String("${xmeans.predict(row)}")
    }
    
    WebViewUtil.displayGroovyTemplate(we, "template/internal/tasks/ml/clustering/XMeans.gtmpl", [
      "centroids": xmeans.centroids(),
      "clusterLabels": xmeans.getClusterLabel(),
      "clusterValues": ndata,
      "xmeans": xmeans.toString(),
      "distortion": xmeans.distortion()
    ])
    
    dex.header << new String("${columnNameText.getText()}")
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label maxClustersLabel = new Label("Max # Clusters")
      Label columnNameLabel = new Label("Column Name")
      
      configPane = new MigPane("", "[][][grow]", "[][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("XMeans"), "grow,span")
      configPane.add(columnListView, "grow,span")
      
      configPane.add(maxClustersLabel);
      configPane.add(maxClustersValueLabel);
      configPane.add(maxClustersSLider, "grow,span")
      
      maxClustersSLider.setMinorTickCount(0)

      maxClustersSLider.setMajorTickUnit(1)
      maxClustersSLider.snapToTicksProperty().set(true)
      maxClustersSLider.setShowTickLabels(false)

      maxClustersSLider.setShowTickMarks(true)
      maxClustersValueLabel.setText((((int) maxClustersSLider.getValue()) as String))
      
      maxClustersSLider.setOnMouseDragged({ MouseEvent event ->
        maxClustersValueLabel.setText((((int) maxClustersSLider.getValue()) as String))
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
