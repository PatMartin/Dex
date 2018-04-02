package com.dexvis.dex.task.ml.clustering

import javafx.collections.FXCollections
import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.ChoiceBox
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

@Root(name="hierarchical-clustering")
class HierarchicalCluster extends DexTask {
  public HierarchicalCluster() {
    super("Machine Learning: Clustering", "Hierarchical Cluster", "machine_learning/clustering/HierarchicalCluster.html")
  }
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField("HIER_CLUSTERS")
  
  @Element(name="linkage", required=false)
  private ChoiceBox linkageCB = new ChoiceBox(FXCollections.observableArrayList(
  "Single", "Complete", "UPGMA", "UPGMC", "Ward", "WPGMA", "WPGMC"))
  
  private Button clearButton = new Button("Clear")
  
  @Element(name="numClusters", required=false)
  Slider numClustersSlider = new Slider(1, 100, 4)
  
  Label numClustersValueLabel = new Label("")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
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
    def selected = dex.select(columns)
    def ndata= selected.getDoubles(selected.header)

    double[][] proximity = new double[ndata.length][];
    for (int i = 0; i < ndata.length; i++) {
        proximity[i] = new double[i+1];
        for (int j = 0; j < i; j++)
            proximity[i][j] = smile.math.Math.distance(ndata[i], ndata[j]);
    }
    
    smile.clustering.linkage.Linkage linkage = null;
    
    switch (linkageCB.getSelectionModel().getSelectedItem().toString()) {
      case "Complete":
        linkage = new smile.clustering.linkage.CompleteLinkage(proximity)
        break;
      case "Single":
        linkage = new smile.clustering.linkage.SingleLinkage(proximity)
        break;
      case "UPGMA":
        linkage = new smile.clustering.linkage.UPGMALinkage(proximity)
        break;
      case "UPGMC":
        linkage = new smile.clustering.linkage.UPGMCLinkage(proximity)
        break;
      case "Ward":
        linkage = new smile.clustering.linkage.WardLinkage(proximity)
        break;
      case "WPGMA":
        linkage = new smile.clustering.linkage.WPGMALinkage(proximity)
        break;
      case "WPGMC":
        linkage = new smile.clustering.linkage.WPGMCLinkage(proximity)
        break;
      default:
        linkage = new smile.clustering.linkage.CompleteLinkage(proximity)
    }
    
    smile.clustering.HierarchicalClustering hierCluster = new smile.clustering.HierarchicalClustering(linkage)

    println "Hierarchical Cluster: ${hierCluster.toString()}"
    
    ndata.eachWithIndex { row, ri ->
      //dex.data[ri] << new String("${kmeans.predict(row)}")
    }

    int numClusters = (int) numClustersSlider.getValue()
    int[] membership = hierCluster.partition(numClusters);

    println "MEMBERSHIP: ${membership}"
    membership.eachWithIndex {
      member, i ->
      dex.data[i] << "${member}"
    }
       
    println "TREE: ${hierCluster.getTree()}"

    WebViewUtil.displayGroovyTemplate(we, "template/internal/tasks/ml/clustering/HierarchicalCluster.gtmpl", [
      "hierarchicalCluster": hierCluster.toString(),
      "membership": membership,
      "dex": dex,
      "data": dex.data,
      "header": dex.header,
      "tree": hierCluster.getTree()
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
      Label linkageLabel = new Label("Linkage")
      
      configPane = new MigPane("", "[][][grow]", "[][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Hierarchical Clusters"), "grow,span")
      configPane.add(columnListView, "grow,span")
      
      configPane.add(linkageLabel)
      configPane.add(linkageCB, "grow,span");
      
      configPane.add(numClustersLabel);
      configPane.add(numClustersValueLabel);
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
