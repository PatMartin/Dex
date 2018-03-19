package com.dexvis.dex.task.ml.smile.classification

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

import smile.classification.DecisionTree.SplitRule
import smile.data.Attribute

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.WebViewUtil
import com.dexvis.util.XStreamUtil
import com.thoughtworks.xstream.XStream
import com.thoughtworks.xstream.io.xml.DomDriver

@Root(name="decision-tree")
class DecisionTree extends DexTask {
  public DecisionTree() {
    super("Machine Learning", "Decision Tree",
    "ml/smile/classification/DecisionTree.html")
  }
  
  private DexEnvironment env = DexEnvironment.getInstance()
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField()
  
  @Element(name="resultColumn", required=false)
  private ChoiceBox classifyColumnCB = new ChoiceBox()
  
  private TextField statusText = new TextField("")
  
  private Label effectiveFileLabel = new Label("Effective File Name: ")
  private Label effectiveFile = new Label("")
  
  private Label fileLabel = new Label("File Name:")
  
  @Element(name="splitRule", required=false)
  private ChoiceBox splitRuleCB = new ChoiceBox(FXCollections.observableArrayList(
  "GINI", "Entropy", "Classification Error"))
  
  @Element(required=false)
  private TextField fileText = new TextField()
  
  private Button clearButton = new Button("Clear")
  
  @Element(name="maxNodes", required=false)
  Slider maxNodesSlider = new Slider(1, 100, 4)
  
  private Label maxNodesValueLabel = new Label("")
  
  private smile.classification.DecisionTree dtree = null
  
  private DexFileChooser modelChooser = new DexFileChooser("models",
  "Load Decision Tree Model", "Save Decision Tree Model",
  "Decision Tree Model", "dt_mdl")
  
  private XStream xstream = new XStream(new DomDriver())
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
    def selected
    def dex = state.getDexData();
    def types = dex.guessTypes()
    def initializing = false
    
    if (columnNameText.getText() == null || columnNameText.getText().length() <= 0) {
      columnNameText.setText("DTREE_PREDICTION")
    }
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      initializing = true
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
      
      // Select everything by default.
      selected = dex
    }
    
    // Create selected, a subset of dex data to be considered for the decision tree prediction.
    if (columnListView.getTargetItems().size() > 0)
    {
      // User driven selection of data for kmean analysis
      selected = dex.select(columnListView.getTargetItems())
    }
    
    // If we have not picked a prediction column, default to column 0 and flag
    // this task as being in the process of initialzing.
    if (classifyColumnCB.getSelectionModel().isEmpty()) {
      initializing = true
      classifyColumnCB.getItems().addAll(state.dexData.header)
      classifyColumnCB.getSelectionModel().select(0)
    }
    
    // Tell the user to initialize the program
    if (initializing) {
      throw new DexException("You must initialize ${getName()} before continuing.")
    }
    
    // Must have selected at least 1 column.
    if (columnListView.getTargetItems().size() <= 0) {
      throw new DexException("You must select at least one column in task ${getName()}.")
    }

    // Define base attributes
    def columns = columnListView.getTargetItems()
    def ndata= dex.getDoubles(columns)
    def atts = dex.getNumericAttributes(columns)
        
    if (ndata[0].size() != columnListView.getTargetItems().size()) {
      throw new DexException("${getName()} > Data Mismatch Error : selected header size: " +
      "${ndata[0].size()} does not match user selection size: ${columnListView.getTargetItems().size()}")
    }
    
    String classColName = "" + classifyColumnCB.getSelectionModel().getSelectedItem()
    // Figure out if we are training or we are predicting.
    boolean IS_TRAINING = dex.columnExists(classColName)

    //println "NDATA: ${ndata}";
    int responseIndex = classifyColumnCB.getSelectionModel().getSelectedIndex()
    def classification = dex.classify(responseIndex)
    
    if (IS_TRAINING) {
      // Determine split rule
      def splitRule = splitRuleCB.getSelectionModel().getSelectedItem()
      
      println "Using Split Rule: '${splitRule}'"
      
      switch (splitRule) {
        case "GINI":
          dtree = new smile.classification.DecisionTree(
          (Attribute []) atts, (double [][]) ndata, (int[]) classification.classes,
          (int) maxNodesSlider.getValue(), SplitRule.GINI)
          break;
        case "Entropy":
          dtree = new smile.classification.DecisionTree(
          (Attribute []) atts, (double [][]) ndata, (int[]) classification.classes,
          (int) maxNodesSlider.getValue(), SplitRule.ENTROPY)
          break;
        case "Classification Error":
          dtree = new smile.classification.DecisionTree(
          (Attribute []) atts, (double [][]) ndata, (int[]) classification.classes,
          (int) maxNodesSlider.getValue(), SplitRule.CLASSIFICATION_ERROR)
          break;
        default:
          dtree = new smile.classification.DecisionTree(
          (Attribute []) atts, (double [][]) ndata, (int[]) classification.classes,
          (int) maxNodesSlider.getValue(), SplitRule.GINI)
      }
      
      String filePath = env.interpolate(fileText.getText())
      effectiveFile.setText(filePath)
      
      XStreamUtil.writeObjects(filePath, dtree, classification.classMap)
    }
    else // Predicting
    {
      String filePath = env.interpolate(fileText.getText())
      effectiveFile.setText(filePath)
      
      
      FileReader reader = new FileReader(filePath)
      ObjectInputStream modelIn = xstream.createObjectInputStream(reader)
      
      def objs = XStreamUtil.readObjects(filePath)
      
      // Load from model file from object stream.
      dtree = (smile.classification.DecisionTree) objs[0];
      classification = [:]
      classification.classMap = (Map) objs[1];
    }
    
    println "IMPORTANCE: ${dtree.importance()}"
    println "GRAPH-VIZ: ${dtree.dot()}"
    
    int numRight = 0
    int numWrong = 0
    ndata.eachWithIndex { row, ri ->
      String prediction = new String("${classification.classMap[dtree.predict(row)]}")
      if (prediction == dex.data[ri][responseIndex]) {
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
    
    // Massage the graphviz dot string so that the target classes are
    // labeled with original name.
    String graphStr = dtree.dot().replaceAll('\n', "");
    classification.classMap.each { key, value ->
      println "CLASS: ${key}=${value}"
      graphStr = graphStr.replaceAll('<class = ' + key + '>', '<class = ' + value + ' >')
    }
    
    WebViewUtil.displayGroovyTemplate(we, "web/ml/smile/DecisionTree.gtmpl", [
      "graph": graphStr,
      "right": numRight,
      "wrong": numWrong,
      "importance": dtree.importance(),
      "columns" : columns
    ])
    
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
      Label columnNameLabel = new Label("Destination Column")
      Label splitRuleLabel = new Label("Split Rule")
      WebViewUtil.noData(we)
      
      configPane = new MigPane("", "[][grow]", "[][][][][][][][][][][grow][]")
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
      
      configPane.add(splitRuleLabel)
      configPane.add(splitRuleCB, "grow,span");
      
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
      configPane.add(wv, "grow,span")
      configPane.add(clearButton, "grow, span")
      
      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
        classifyColumnCB.getItems().clear()
      } as EventHandler);
    }
    return configPane
  }
}
