package com.dexvis.dex.task.ml.clustering

import javafx.collections.FXCollections
import javafx.event.EventHandler
import javafx.scene.control.Button
import javafx.scene.Node
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
import com.dexvis.dex.math.distance.AggregateDistance
import com.dexvis.dex.math.distance.FuzzyDistance
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.WebViewUtil

@Root(name="hierarchical-clustering")
class DBScan extends DexTask {
  public DBScan() {
    super("Machine Learning: Clustering", "DB Scan", "machine_learning/clustering/DBScan.html")
  }
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField("DBSCAN_CLUSTER")
  
  @Element(name="distance", required=false)
  private ChoiceBox distanceCB = new ChoiceBox(FXCollections.observableArrayList(
  "Chebyshev",
  "Correlation",
  //"Dynamic Time Warping",
  //"Edit Distance",
  "Euclidean",
  //"Hamming",
  //"Jaccard",
  //"Jensen Shannon",
  //"Lee",
  //"Mahalanobis",
  "Manhattan",
  //"MinkowskiDistance",
  //"Sparse Chebyshev",
  //"Sparse Euclidean",
  //"Sparse Manhattan",
  //"Sparse Minkowski",
  //"Taxonomic"
  ))
  
  private Button clearButton = new Button("Clear")
  
  @Element(name="minPoints", required=false)
  private Slider minPointsSlider = new Slider(1, 100, 4)
  private Label minPointsValueLabel = new Label("")
  
  @Element(name="fuzziness", required=false)
  private Slider fuzzinessSlider = new Slider(0, 20, 0)
  private Label fuzzinessValueLabel = new Label("")
  
  @Element(name="radius", required=false)
  private TextField radiusTF = new TextField("0.9")
  
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
    def ndata = selected.getDoubles(selected.header)
    
    AggregateDistance distance = null;
    smile.math.distance.Distance baseDistanceImpl = null;
    
    // Implement distance over double arrays
    switch (distanceCB.getSelectionModel().getSelectedItem().toString()) {
      case "Chebyshev":
      baseDistanceImpl = new smile.math.distance.ChebyshevDistance()
      break;
      case "Correlation":
      baseDistanceImpl = new smile.math.distance.CorrelationDistance()
      break;
      case "Euclidean":
      baseDistanceImpl = new smile.math.distance.EuclideanDistance()
      break;
      case "Manhattan":
      baseDistanceImpl = new smile.math.distance.ManhattanDistance()
      break;
      //case "Sparse Chebyshev":
      //  distance = new AggregateDistance(new smile.math.distance.SparseChebyshevDistance())
      //  break;
      //case "Sparse Euclidean":
      //  distance = new AggregateDistance(new smile.math.distance.SparseEuclideanDistance())
      //  break;
      //case "Sparse Manhattan":
      //  distance = new AggregateDistance(new smile.math.distance.SparseManhattanDistance())
      //  break;
      default:
      baseDistanceImpl = new smile.math.distance.EuclideanDistance()
    }
    
    distance = new AggregateDistance(new FuzzyDistance(baseDistanceImpl,
    (int) fuzzinessSlider.getValue()))
    
    int minPoints = (int) minPointsSlider.getValue()
    double radius = radiusTF.getText() as Double
    
    println "ndata=${ndata}"
    println "dbscan(minPoints='${minPoints}', radius='${radius}')"
    
    smile.clustering.DBScan<double[]> dbscan =
    new smile.clustering.DBScan<double []>(ndata, distance, minPoints, radius);
    
    WebViewUtil.displayGroovyTemplate(we, "template/internal/tasks/ml/clustering/DBScan.gtmpl", [
      "dbScan": dbscan.toString(),
      "dex": dex,
      "data": dex.data,
      "clusters": dbscan.getClusterLabel().collect { "cluster-${it}" },
      "maxDistance": distance.getMaxDistance(),
      "minDistance": distance.getMinDistance(),
      "header": dex.header,
    ])
    
    dex.header << new String("${columnNameText.getText()}")
    
    //println "Cluster Label: ${dbscan.getClusterLabel()}"
    dbscan.getClusterLabel().eachWithIndex { cluster, i ->
      dex.data[i] << "${cluster}"
    }
    
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label minPointsLabel = new Label("Minimum Points")
      Label radiusLabel = new Label("Radius")
      Label columnNameLabel = new Label("Column Name")
      Label distanceLabel = new Label("Distance")
      Label fuzzinessLabel = new Label("Fuzziness")
      
      configPane = new MigPane("", "[][][grow]", "[][][][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("DB Scan"), "grow,span")
      configPane.add(columnListView, "grow,span")
      
      configPane.add(distanceLabel)
      configPane.add(distanceCB, "grow,span");
      
      configPane.add(minPointsLabel);
      configPane.add(minPointsValueLabel);
      configPane.add(minPointsSlider, "grow,span")
      
      configPane.add(radiusLabel);
      configPane.add(radiusTF, "span")
      
      configPane.add(fuzzinessLabel)
      configPane.add(fuzzinessValueLabel)
      configPane.add(fuzzinessSlider, "grow,span")
      
      minPointsSlider.setMinorTickCount(0)
      
      minPointsSlider.setMajorTickUnit(1)
      minPointsSlider.snapToTicksProperty().set(true)
      minPointsSlider.setShowTickLabels(false)
      
      minPointsSlider.setShowTickMarks(true)
      minPointsValueLabel.setText((((int) minPointsSlider.getValue()) as String))
      
      minPointsSlider.setOnMouseDragged({ MouseEvent event ->
        minPointsValueLabel.setText((((int) minPointsSlider.getValue()) as String))
      })
      
      fuzzinessSlider.setMinorTickCount(0)
      
      fuzzinessSlider.setMajorTickUnit(1)
      fuzzinessSlider.snapToTicksProperty().set(true)
      fuzzinessSlider.setShowTickLabels(false)
      
      fuzzinessSlider.setShowTickMarks(true)
      fuzzinessValueLabel.setText((((int) fuzzinessSlider.getValue()) as String))
      
      fuzzinessSlider.setOnMouseDragged({ MouseEvent event ->
        fuzzinessValueLabel.setText((((int) fuzzinessSlider.getValue()) as String))
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
