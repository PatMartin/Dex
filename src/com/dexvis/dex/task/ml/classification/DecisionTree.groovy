package com.dexvis.dex.task.ml.classification

import javafx.collections.FXCollections
import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.CheckBox
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

import com.dexvis.dex.DexModel
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.PathUtil
import com.dexvis.util.WebViewUtil

@Root(name="decision-tree")
class DecisionTree extends DexTask {
  public DecisionTree() {
    super("Machine Learning: Classification", "Decision Tree",
    "ml/smile/classification/DecisionTree.html")
  }
  
  private DexEnvironment env = DexEnvironment.getInstance()
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  private DexModel model = null;
  
  private MigPane configPane = null
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField()
  
  @Element(name="autosave", required=false)
  private CheckBox autosaveCB = new CheckBox()
  
  @Element(name="resultColumn", required=false)
  private ChoiceBox classifyColumnCB = new ChoiceBox()
  
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
  "Decision Tree Model", "dtree.mdl")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
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
    }
    
    // Create selected, a subset of dex data to be considered for the decision tree prediction.
    if (columnListView.getTargetItems().size() <= 0)
    {
      initializing = true
    }
    
    // If we have not picked a prediction column, default to column 0 and flag
    // this task as being in the process of initialzing.
    if (classifyColumnCB.getSelectionModel().isEmpty() || classifyColumnCB.getItems().size() <= 0) {
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
    def features = columnListView.getTargetItems()
    def featureTypes = dex.select(features).guessTypes();
    def ndata= dex.getDoubles(features)
    def atts = dex.getNumericAttributes(features)
    
    if (ndata[0].size() != columnListView.getTargetItems().size()) {
      throw new DexException("${getName()} > Data Mismatch Error : selected header size: " +
      "${ndata[0].size()} does not match user selection size: ${columnListView.getTargetItems().size()}")
    }
    
    String classColName = "" + classifyColumnCB.getSelectionModel().getSelectedItem()
    
    int responseIndex = classifyColumnCB.getSelectionModel().getSelectedIndex()
    def classification = dex.classify(responseIndex)
    
    // Determine split rule
    def splitRule = splitRuleCB.getSelectionModel().getSelectedItem()
    
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
    
    // Prepare and store the model to disk
    String filePath = env.interpolate(fileText.getText())
    effectiveFile.setText(filePath)
    
    Map<String, Object> modelProperties = new HashMap<String, Object>();
    // Prep the dex model for persistence
    model = new DexModel("Decision Tree", features, featureTypes, dtree,
        [ classificationMap : classification.classMap ])
    
    if (autosaveCB.isSelected()) {
      model.write(filePath)
    }
    
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
      "columns" : features
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
      Label columnNameLabel = new Label("Destination Column")
      Label splitRuleLabel = new Label("Split Rule")
      Label autosaveLabel = new Label("Autosave")
      WebViewUtil.noData(we)
      
      configPane = new MigPane("", "[][grow]", "[][][][][][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Decision Tree"), "grow,span")
      Button saveButton = new Button("Save Model")
      
      saveButton.setOnAction({ actionEvent ->
        try
        {
          File saveFile = modelChooser.save(actionEvent)
          String path = PathUtil.getRelativePath(saveFile)
          fileText.setText(path)
          effectiveFile.setText(path)
          if (model != null) {
            model.write(path)
          }
        }
        catch(Exception ex)
        {
          //ex.printStackTrace()
        }
      } as EventHandler);
      
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow, span")
      
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      configPane.add(saveButton, "span")
      configPane.add(columnListView, "grow,span")
      
      configPane.add(autosaveLabel)
      configPane.add(autosaveCB, "span")
      
      configPane.add(splitRuleLabel)
      configPane.add(splitRuleCB, "grow,span");
      
      configPane.add(maxNodesLabel);
      configPane.add(maxNodesSlider, "grow")
      configPane.add(maxNodesValueLabel, "span");
      
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
      
      configPane.add(wv, "grow,span")
      configPane.add(clearButton, "grow, span")
      
      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
        classifyColumnCB.getItems().clear()
        classifyColumnCB.getSelectionModel().clearSelection()
      } as EventHandler);
    }
    return configPane
  }
}
