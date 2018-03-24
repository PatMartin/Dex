package com.dexvis.dex.task.ml.association

import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.Slider
import javafx.scene.input.MouseEvent

import org.controlsfx.control.ListSelectionView
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="fpgrowth")
class FPGrowth extends DexTask {
  public FPGrowth() {
    super("Machine Learning: Association", "FP Growth",
    "ml/association/FPGrowth.html")
  }
  
  private MigPane configPane = null
  
  @Element(name="support", required=false)
  private Slider supportSlider = new Slider(1.0, 100.0, 5.0)
  private Label supportValueLabel = new Label("")
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    def dex = state.getDexData()
    def data = dex.data
    def header = dex.header
    double SUPPORT_PERCENT = supportSlider.getValue() / 100.0

    boolean initializing = false;
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
      initializing = true
    }

        // Create selected, a subset of dex data to be considered for the decision tree prediction.
    if (columnListView.getTargetItems().size() <= 0)
    {
      initializing = true
    }
    
    // Tell the user to initialize the program
    if (initializing) {
      throw new DexException("You must initialize ${getName()} before continuing.")
    }
    
    def features = columnListView.getTargetItems()
    def selected = dex.select(features)
    
    def itemsets = new int[selected.data.size()][selected.header.size()]
    
    int curCat = 0
    
    def key2Cat = [:]
    def cat2Key = [:]
    
    // Create mappings between unique values with a column header namespace
    selected.data.eachWithIndex {
      row, ri ->
      row.eachWithIndex {
        col, ci ->
        def key = "${selected.header[ci]}='${col}'"
        if (!key2Cat.containsKey(key)) {
          key2Cat[key] = curCat
          cat2Key[curCat] = key
          curCat++
        }
      }
    }
    
    selected.data.eachWithIndex {
      row, ri ->
      row.eachWithIndex {
        col, ci ->
        itemsets[ri][ci] = key2Cat["${selected.header[ci]}='${col}'"]
      }
    }

    //println itemsets
    
    smile.association.FPGrowth fpGrowth = new smile.association.FPGrowth(
      (itemsets as int[][]), ((int) (data.size() * SUPPORT_PERCENT)))
    
    def frequentSets = fpGrowth.learn()
    
    header = [ "items", "support" ]
    data = []
    
    frequentSets.each {
      items ->

      data << [ "${items.items.collect { return cat2Key[it] }}",
         "${items.support}" ]
    }
    
    state.dexData.header = header
    state.dexData.data = data
    
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label supportLabel = new Label("Support:")
      configPane = new MigPane("", "[][][grow]", "[][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("FP Growth"), "grow,span")
      configPane.add(columnListView, "grow,span")
      
      configPane.add(supportLabel)
      configPane.add(supportValueLabel)
      configPane.add(supportSlider, "grow, span")

      Button clearButton = new Button("Clear")
      configPane.add(clearButton, "grow, span")

      supportSlider.setShowTickMarks(true)
      supportValueLabel.setText((((int) supportSlider.getValue()) as String))

      supportSlider.setOnMouseDragged({ MouseEvent event ->
        supportValueLabel.setText((((int) supportSlider.getValue()) as String))
      })

      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
      } as EventHandler);
    }
    return configPane
  }
  
}
