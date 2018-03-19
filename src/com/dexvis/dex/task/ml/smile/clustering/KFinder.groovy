package com.dexvis.dex.task.ml.smile.clustering

import javafx.scene.Node
import javafx.event.EventHandler
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.input.KeyEvent
import javafx.scene.input.MouseEvent
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.controlsfx.control.ListSelectionView
import org.controlsfx.control.RangeSlider
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.WebViewUtil



@Root(name="kFinder")
class KFinder extends DexTask {
  public KFinder() {
    super("Machine Learning", "KFinder", "ml/smile/clustering/KFinder.html")
  }
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField("KMEANS")
  
  @Element(name="kMin", required=false)
  private TextField kMinText = new TextField("2")
  
  @Element(name="kMax", required=false)
  private TextField kMaxText = new TextField("10")
  
  //@Element(name="kRange", required=false)
  private RangeSlider kRangeSlider = new RangeSlider(2, 100, 2, 10)
  
  private Button clearButton = new Button("Clear")
  
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
    
    smile.clustering.KMeans kmeans; 
    println "KMEANS: ${kmeans}"
    
    def kmin = kMinText.getText() as Integer
    def kmax = kMaxText.getText() as Integer
    
    def distortion = []
    
    (kmin..kmax).each {
      k ->
      kmeans = new smile.clustering.KMeans(ndata, k)
      distortion << [k, kmeans.distortion()]
    }
    
    WebViewUtil.displayGroovyTemplate(we, "web/ml/smile/KFinder.gtmpl", [
      "distortion": distortion
    ])
    
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label kRangeLabel = new Label("K Range to Test")
      Label columnNameLabel = new Label("Column Name")
      
      configPane = new MigPane("", "[][grow]", "[][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("KMeans"), "grow,span")
      configPane.add(columnListView, "grow,span")
      
      configPane.add(kRangeLabel);
      configPane.add(kMinText)
      configPane.add(kRangeSlider, "grow")
      configPane.add(kMaxText, "span")
      
      kRangeSlider.setShowTickMarks(true)
      kRangeSlider.setShowTickLabels(true)
      kRangeSlider.setBlockIncrement(1)
      kRangeSlider.setMajorTickUnit(1)
      kRangeSlider.setMinorTickCount(5)
      kRangeSlider.setSnapToTicks(true)
      kRangeSlider.setLowValue(kMinText.getText() as Integer)
      kRangeSlider.setHighValue(kMaxText.getText() as Integer)
      
      kRangeSlider.setOnMouseDragged({ MouseEvent event ->
        kMinText.setText((kRangeSlider.getLowValue() as Integer) as String)
        kMaxText.setText((kRangeSlider.getHighValue() as Integer) as String)
      })
      
      kRangeSlider.setOnKeyPressed({ KeyEvent event ->
        kMinText.setText((kRangeSlider.getLowValue() as Integer) as String)
        kMaxText.setText((kRangeSlider.getHighValue() as Integer) as String)
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
