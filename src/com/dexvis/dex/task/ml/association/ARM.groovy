package com.dexvis.dex.task.ml.association

import smile.association.AssociationRule

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

@Root(name="arm")
class ARM extends DexTask {
  public ARM() {
    super("Machine Learning: Association", "ARM",
    "machine_learning/association/ARM.html")
  }
  
  private MigPane configPane = null
  
  // Confidence: Slider from 0.0 to 1.0
  // MinOccurs: .001 - 100.00, represents a percentage of the data
  @Element(name="confidence", required=false)
  private Slider confidenceSlider = new Slider(1.0, 100.0, 60.0)
  
  private Label confidenceValueLabel = new Label("")
  
  @Element(name="frequency", required=false)
  private Slider frequencySlider = new Slider(0.1, 100.0, 2.0)
  
  private Label frequencyValueLabel = new Label("")
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    def dex = state.getDexData()
    def data = dex.data
    def header = dex.header
    double FREQUENCY_PERCENT = frequencySlider.getValue() / 100.0
    double CONFIDENCE = confidenceSlider.getValue() / 100.0

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
    
    smile.association.ARM arm = new smile.association.ARM((itemsets as int[][]), ((int) (data.size() * FREQUENCY_PERCENT)))
    
    def rules = arm.learn(CONFIDENCE)
    
    header = [ "antecedent", "consequent", "confidence", "support" ]
    data = []
    
    rules.eachWithIndex {
      rule, ri ->

      def antecedents = rule.antecedent.collect { return cat2Key[it] }
      def consequents = rule.consequent.collect { return cat2Key[it] }
      data << [ "${antecedents}", "${consequents}",
        "${rule.confidence > 1 ? 1 : rule.confidence}",
        "${rule.support}" ]
    }
    
    state.dexData.header = header
    state.dexData.data = data
    
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label confidenceLabel = new Label("Confidence:")
      Label frequencyLabel = new Label("Frequency:")
      configPane = new MigPane("", "[][][grow]", "[][grow][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Association Rule Mining"), "grow,span")
      configPane.add(columnListView, "grow,span")
      configPane.add(confidenceLabel)
      configPane.add(confidenceValueLabel)
      configPane.add(confidenceSlider, "grow, span")
      
      configPane.add(frequencyLabel)
      configPane.add(frequencyValueLabel)
      configPane.add(frequencySlider, "grow, span")

      Button clearButton = new Button("Clear")
      configPane.add(clearButton, "grow, span")

      confidenceSlider.setShowTickMarks(true)
      confidenceValueLabel.setText((((int) confidenceSlider.getValue()) as String))

      confidenceSlider.setOnMouseDragged({ MouseEvent event ->
        confidenceValueLabel.setText((((int) confidenceSlider.getValue()) as String))
      })

      frequencySlider.setShowTickMarks(true)
      frequencyValueLabel.setText((((int) frequencySlider.getValue()) as String))

      frequencySlider.setOnMouseDragged({ MouseEvent event ->
        frequencyValueLabel.setText((((int) frequencySlider.getValue()) as String))
      })

      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
      } as EventHandler);
    }
    return configPane
  }
  
}
