package com.dexvis.dex.task.ml.smile.clustering

import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.Slider
import javafx.scene.control.TextField
import javafx.scene.input.MouseEvent

import org.controlsfx.control.ListSelectionView
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="kmeans")
class KMeans extends DexTask {
  public KMeans() {
    super("Machine Learning", "KMeans", "ml/smile/KMeans.html")
  }
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField("KMEANS")
  
  private Button clearButton = new Button("Clear")
  
  Slider numClustersSlider = new Slider(1, 100, 4)
  Label numClustersValueLabel = new Label("4")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
    def selected
    def dex = state.getDexData();
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
      
      // Select everything.
      selected = dex
    }
    
    if (columnListView.getTargetItems().size() > 0)
    {
      // User driven selection of data for kmean analysis
      selected = dex.select(columnListView.getTargetItems())
    }
    
    double[][] ndata = new double[selected.data.size()][selected.header.size()]
    
    // Get type information on kmean inputs
    def types = selected.guessTypes()
    println "TYPES: '${types}'"
    
    types.eachWithIndex { type, hi ->
      
      switch (type) {
        case type == "double" || type == "integer":
          selected.data.eachWithIndex { row, ri ->
            ndata[ri][hi] = row[hi] as Double
          }
          break
        default:
          def categories = dex.categorize(hi);
          selected.data.eachWithIndex { row, ri ->
            ndata[ri][hi] = categories[ri] as Double
          }
      }
    }
    
    println "NDATA: ${ndata}";
    smile.clustering.KMeans kmeans = new smile.clustering.KMeans(ndata,
      numClustersValueLabel.getText() as Integer)
    println "KMEANS: ${kmeans}"
    
    ndata.eachWithIndex { row, ri ->
      dex.data[ri] << new String("${kmeans.predict(row)}")
    }

    dex.header << new String("${columnNameText.getText()}")
    return state
  }
  
  public String toString()
  {
    return name
  }
  
  public Node getConfig()
  {
    
    if (configPane == null)
    {
      Label numClustersLabel = new Label("# Clusters")
      Label columnNameLabel = new Label("Column Name")
      
      configPane = new MigPane("", "[][grow]", "[][][][][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("KMeans"), "grow,span")
      configPane.add(columnListView, "grow,span")
      configPane.add(clearButton, "grow,span")
      
      
      configPane.add(numClustersValueLabel, "grow,span");
      configPane.add(numClustersLabel);
      configPane.add(numClustersSlider, "grow,span")
      
      numClustersSlider.setMinorTickCount(0)
      
      numClustersSlider.setMajorTickUnit(1)
      numClustersSlider.snapToTicksProperty().set(true)
      numClustersSlider.setShowTickLabels(false)
      
      numClustersSlider.setShowTickMarks(true)
      
      numClustersSlider.setOnMouseDragged({ MouseEvent event ->
        numClustersValueLabel.setText((((int) numClustersSlider.getValue()) as String))
      })
      
      configPane.add(columnNameLabel)
      configPane.add(columnNameText, "grow,span")
      
      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
      } as EventHandler);
    }
    return configPane
  }
}
