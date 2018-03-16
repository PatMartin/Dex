package com.dexvis.dex.task.ml.smile.classification

import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.Slider
import javafx.scene.control.TextArea
import javafx.scene.control.TextField
import javafx.scene.input.MouseEvent

import org.controlsfx.control.ListSelectionView
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import smile.classification.DecisionTree.SplitRule
import smile.data.Attribute
import smile.data.NumericAttribute
import smile.data.StringAttribute

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="decision-tree")
class DecisionTree extends DexTask {
  public DecisionTree() {
    super("Machine Learning", "Decision Tree", "ml/smile/classification/DecisionTree.html")
  }
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField("DTREE")
  
  @Element(name="resultColumn", required=false)
  private ChoiceBox classifyColumnCB = new ChoiceBox()
  
  private TextField statusText = new TextField("")
  private TextArea graphVizTextArea = new TextArea("");
  
  private Button clearButton = new Button("Clear")
  
  @Element(name="maxNodes", required=false)
  Slider maxNodesSlider = new Slider(1, 100, 4)
  
  Label maxNodesValueLabel = new Label("")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
    def selected
    def dex = state.getDexData();
    def allTypes = dex.guessTypes();
    
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
    
    if (classifyColumnCB.getSelectionModel().isEmpty()) {
      classifyColumnCB.getItems().addAll(state.dexData.header)
      classifyColumnCB.getSelectionModel().setSelectedIndex(0)
    }
    
    double[][] ndata = new double[selected.data.size()][selected.header.size()]
    
    // Get type information on kmean inputs
    println "SELECTED: ${selected}"
    def types = selected.guessTypes()
    println "TYPES: '${types}'"
    
    def atts = new Attribute[types.size()]
    
    types.eachWithIndex { type, hi ->
      switch(type) {
        case "string" :
          atts[hi] = new StringAttribute(selected.header[hi])
          break;
        case "integer" :
          atts[hi] = new NumericAttribute(selected.header[hi])
          break;
        case "double" :
          atts[hi] = new NumericAttribute(selected.header[hi])
          break;
        case "date" :
          atts[hi] = new StringAttribute(selected.header[hi])
          break;
      }
    }
    
    types.eachWithIndex { type, hi ->
      //println "HANDLING TYPE: '${type}'"
      switch (type) {
        case { it in ["double", "integer" ]}:
          selected.data.eachWithIndex { row, ri ->
            ndata[ri][hi] = Double.parseDouble("" + row[hi])
            //println("setting numeric: ndata[${ri}][{hi}]=${row[hi]}" )
          }
          break
        default:
          def categories = dex.categorize(hi);
          selected.data.eachWithIndex { row, ri ->
            ndata[ri][hi] = Double.parseDouble("" + categories[ri])
          }
      }
    }
    
    //println "NDATA: ${ndata}";
    int classifyIndex = classifyColumnCB.getSelectionModel().getSelectedIndex()
    def classifyType = allTypes[classifyIndex]
    def classify = new int[dex.data.size()]
    
    //if (classifyType == "double" || classifyType == "integer") {
    //  dex.getColumn(classifyIndex).eachWithIndex {
    //    val, i ->
    //    classify[i] = (int) Double.parseDouble("" + val)
    //  }
    //}
    //else {
    def catMap = [:]
    def categories = dex.categorize(classifyIndex)
    
    categories.eachWithIndex { category, i ->
      classify[i] = (int) Double.parseDouble("" + category)
    }
    //}

    dex.data.eachWithIndex { row, ri ->
      catMap[classify[ri]] = row[classifyIndex]
    }
        
    println "MAX-NODES: ${maxNodesValueLabel.getText()}"
    println "CLASSES: ${classify}"
    println "CATMAP: ${catMap}"
    
    smile.classification.DecisionTree dtree = new smile.classification.DecisionTree(atts, ndata, classify,
        (int) maxNodesSlider.getValue(), SplitRule.GINI)
    
    println "IMPORTANCE: ${dtree.importance()}"
    println "GRAPH-VIZ: ${dtree.dot()}"
    
    int numRight = 0
    int numWrong = 0
    ndata.eachWithIndex { row, ri ->
      String prediction = new String("${catMap[dtree.predict(row)]}")
      if (prediction == dex.data[ri][classifyIndex]) {
        numRight++;
      }
      else {
        numWrong++;
      }
      
      dex.data[ri] << prediction
      
    }
    dex.header << "DTREE"
    statusText.setText("Model Performance: ${numRight} correct predictions out of" +
      " ${dex.data.size()} = ${numRight/dex.data.size() * 100.0}")
    graphVizTextArea.setText(dtree.dot())
    println "HEADER: ${dex.header}"
    return state
  }
  
  public Node getConfig()
  {
    
    if (configPane == null)
    {
      Label maxNodesLabel = new Label("Max Nodes")
      Label classifyColumnLabel = new Label("Classify Column");
      Label statusLabel = new Label("Status:")
      Label graphVizLabel = new Label("Graph Viz:")
      
      configPane = new MigPane("", "[][grow]", "[][][][][][][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Decision Tree"), "grow,span")
      configPane.add(columnListView, "grow,span")
      
      configPane.add(maxNodesValueLabel, "grow,span");
      configPane.add(maxNodesLabel);
      configPane.add(maxNodesSlider, "grow,span")
      
      maxNodesSlider.setMinorTickCount(0)
      
      maxNodesSlider.setMajorTickUnit(1)
      maxNodesSlider.snapToTicksProperty().set(true)
      maxNodesSlider.setShowTickLabels(false)
      
      maxNodesSlider.setShowTickMarks(true)
      
      maxNodesValueLabel.setText((((int) maxNodesSlider.getValue()) as String))
      maxNodesSlider.setOnMouseDragged({ MouseEvent event ->
        maxNodesValueLabel.setText((((int) maxNodesSlider.getValue()) as String))
      })
      
      configPane.add(classifyColumnLabel)
      configPane.add(classifyColumnCB, "grow,span")
      configPane.add(statusLabel)
      configPane.add(statusText, "grow,span")
      configPane.add(graphVizLabel)
      configPane.add(graphVizTextArea, "growx,growy,span")
      configPane.add(clearButton, "grow,span")
      
      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
        classifyColumnCB.getItems().clear()
      } as EventHandler);
    }
    return configPane
  }
}
