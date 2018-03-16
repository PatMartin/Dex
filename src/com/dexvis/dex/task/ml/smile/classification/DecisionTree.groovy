package com.dexvis.dex.task.ml.smile.classification

import javafx.scene.Node

import javafx.event.EventHandler
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
import smile.data.NumericAttribute
import smile.data.Attribute

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.thoughtworks.xstream.XStream
import com.thoughtworks.xstream.io.xml.DomDriver

@Root(name="decision-tree")
class DecisionTree extends DexTask {
  public DecisionTree() {
    super("Machine Learning", "Decision Tree", "ml/smile/classification/DecisionTree.html")
  }
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField()
  
  @Element(name="resultColumn", required=false)
  private ChoiceBox classifyColumnCB = new ChoiceBox()
  
  private TextField statusText = new TextField("")
  private TextArea graphVizTextArea = new TextArea("");
  
  private Label effectiveFileLabel = new Label("Effective File Name: ")
  private Label effectiveFile = new Label("")
  private Label fileLabel = new Label("File Name:")
  
  @Element(required=false)
  private TextField fileText = new TextField()
  
  private Button clearButton = new Button("Clear")
  
  @Element(name="maxNodes", required=false)
  Slider maxNodesSlider = new Slider(1, 100, 4)
  
  private Label maxNodesValueLabel = new Label("")
  
  private smile.classification.DecisionTree dtree = null
  
  private DexFileChooser modelChooser = new DexFileChooser("model",
  "Load Decision Tree Model", "Save Decision Tree Model", "GROOVY", "dt_mdl")
  
  private XStream xstream = new XStream(new DomDriver())
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
    def selected
    def dex = state.getDexData();
    def allTypes = dex.guessTypes()
    def initializing = false
    
    if (columnNameText.getText() == null || columnNameText.getText().length() <= 0) {
      columnNameText.setText("DTREE")
    }
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      initializing = true
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
      
      // Select everything.
      selected = dex
    }
    
    // Create selected, a subset of dex data to be considered for the decision tree prediction.
    if (columnListView.getTargetItems().size() > 0)
    {
      // User driven selection of data for kmean analysis
      selected = dex.select(columnListView.getTargetItems())
    }
    
    // If we have not picked a prediction column, defaul to column 0 and flag
    // this task as being in the process of initialzing.
    if (classifyColumnCB.getSelectionModel().isEmpty()) {
      initializing = true
      classifyColumnCB.getItems().addAll(state.dexData.header)
      classifyColumnCB.getSelectionModel().setSelectedIndex(0)
    }
    
    // Tell the user to initialize the program
    if (initializing) {
      throw new DexException("You must initialize ${getName()} before continuing.")
    }
    
    // Must have selected at least 1 column.
    if (columnListView.getTargetItems().size() <= 0) {
      throw new DexException("You must select at least one column in task ${getName()}.")
    }
    
    // data which will drive our training and predictions.
    double[][] ndata = new double[selected.data.size()][selected.header.size()]
    
    println "SELECTED: ${selected}"
    
    if (selected.header.size() != columnListView.getTargetItems().size()) {
      throw new DexException("${getName()} > Data Mismatch Error : selected header size: " +
      "${selected.header.size} does not match user selection size: ${columnListView.getTargetItems().size()}")
    }
    
    String classColName = "" + classifyColumnCB.getSelectionModel().getSelectedItem()
    // Figure out if we are training or we are predicting.
    boolean IS_TRAINING = dex.columnExists(classColName)
    
    println "IS_TRAINING: ${IS_TRAINING}"
    
    def types = selected.guessTypes()
    println "TYPES: '${types}'"
    
    // Define base attributes
    def atts = new Attribute[types.size()]
    
    types.eachWithIndex { type, hi ->
      //println "HANDLING TYPE: '${type}'"
      atts[hi] = new NumericAttribute(selected.header[hi])
      
      switch (type) {
        case { it in ["double", "integer"]}:
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
    
    def catMap = [:]
    def categories = dex.categorize(classifyIndex)
    
    categories.eachWithIndex { category, i ->
      classify[i] = (int) Double.parseDouble("" + category)
    }
    
    dex.data.eachWithIndex { row, ri ->
      catMap[classify[ri]] = row[classifyIndex]
    }
    
    println "MAX-NODES: ${maxNodesValueLabel.getText()}"
    println "CLASSES: ${classify}"
    println "CATMAP: ${catMap}"
    
    if (IS_TRAINING) {
      dtree = new smile.classification.DecisionTree(atts, ndata, classify,
          (int) maxNodesSlider.getValue(), SplitRule.GINI)
      
      FileWriter writer = new FileWriter(new File(fileText.getText()))
      ObjectOutputStream modelOut = xstream.createObjectOutputStream(writer);
      
      modelOut.writeObject(dtree)
      modelOut.writeObject(catMap)
      modelOut.close();
    }
    else // Predicting
    {
      FileReader reader = new FileReader(new File(fileText.getText()))
      ObjectInputStream modelIn = xstream.createObjectInputStream(reader)
      
      // Load from model file from object stream.
      dtree = (smile.classification.DecisionTree) modelIn.readObject();
      catMap = (Map) modelIn.readObject();
    }
    
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
    dex.header << columnNameText.getText()
    if (IS_TRAINING) {
      statusText.setText("Training Data Performance: ${numRight} correct predictions out of" +
          " ${dex.data.size()} = ${numRight/dex.data.size() * 100.0}")
    }
    else {
      statusText.setText("Predicted ${dex.data.size()} outcomes.")
    }
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
      Label columnNameLabel = new Label("Destination Column")
      
      configPane = new MigPane("", "[][grow]", "[][][][][][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Decision Tree"), "grow,span")
      Button browseButton = new Button("Browse")
      
      browseButton.setOnAction({ actionEvent ->
        println "ACTION-EVENT: ${actionEvent}"
        try
        {
          File browseFile = modelChooser.load(actionEvent)
          fileText.setText(browseFile.getCanonicalPath())
        }
        catch(Exception ex)
        {
          ex.printStackTrace()
        }
      } as EventHandler);
      
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow, span")
      
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      configPane.add(browseButton, "span")
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
      configPane.add(columnNameLabel)
      configPane.add(columnNameText, "grow, span")
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
