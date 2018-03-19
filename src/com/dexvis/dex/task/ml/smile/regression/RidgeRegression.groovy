package com.dexvis.dex.task.ml.smile.regression

import groovy.text.SimpleTemplateEngine
import javafx.collections.FXCollections
import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.Slider
import javafx.scene.control.TextArea
import javafx.scene.control.TextField
import javafx.scene.input.MouseEvent
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.apache.commons.io.FileUtils
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
import com.dexvis.util.WebViewUtil
import com.thoughtworks.xstream.XStream
import com.thoughtworks.xstream.io.xml.DomDriver

@Root(name="decision-tree")
class RidgeRegression extends DexTask {
  public RidgeRegression() {
    super("Machine Learning", "Ridge Regression",
      "ml/smile/classification/RidgeRegression.html")
  }
  
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
  
  @Element(required=false)
  private TextField fileText = new TextField()
  
  private Button clearButton = new Button("Clear")
  
  @Element(name="lambda", required=false)
  Slider lambdaSlider = new Slider(0.01, 20.0, 0.1)
  
  private Label lambdaValueLabel = new Label("")
  
  private smile.regression.RidgeRegression ridge = null
  
  private DexFileChooser modelChooser = new DexFileChooser("models",
   "Load Ridge Regression Model", "Save Decision Tree Model",
   "Ridge Regression Model", "rr_mdl")
  
  private XStream xstream = new XStream(new DomDriver())
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    def dex = state.getDexData();
    def types = dex.guessTypes()
    def initializing = false
    
    if (columnNameText.getText() == null || columnNameText.getText().length() <= 0) {
      columnNameText.setText("RIDGE")
    }
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      initializing = true
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
    }
    
    // If we have not picked a prediction column, defaul to column 0 and flag
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
    
    String classColName = "" + classifyColumnCB.getSelectionModel().getSelectedItem()
    // Figure out if we are training or we are predicting.
    boolean IS_TRAINING = dex.columnExists(classColName)
    
    println "IS_TRAINING: ${IS_TRAINING}"
    
    // Define base attributes
    def columns = columnListView.getTargetItems()
    def ndata= dex.getDoubles(columns)
    def atts = dex.getNumericAttributes(columns)
    
    if (ndata[0].size() != columnListView.getTargetItems().size()) {
      throw new DexException("${getName()} > Data Mismatch Error : selected header size: " +
      "${ndata[0].size} does not match user selection size: ${columnListView.getTargetItems().size()}")
    }
    
    //println "NDATA: ${ndata}";
    int responseIndex = classifyColumnCB.getSelectionModel().getSelectedIndex()
    def responseType = types[responseIndex]
    
    if (responseType == "date" || responseType == "string") {
      throw new DexException("Ridge Regression can only predict numerics values.")
    }
    
    def responses = new double[dex.data.size()]
    
    responses.eachWithIndex { response, i ->
      try {
      responses[i] = Double.parseDouble("" + dex.data[i][responseIndex])
      }
      catch (Exception ex) {
        responses[i] = Double.NaN
      }
    }
    
    
    if (IS_TRAINING) {
      ridge = new smile.regression.RidgeRegression(ndata, responses,
          lambdaSlider.getValue())
      
      FileWriter writer = new FileWriter(new File(fileText.getText()))
      ObjectOutputStream modelOut = xstream.createObjectOutputStream(writer);
      
      modelOut.writeObject(ridge)
      modelOut.close();
    }
    else // Predicting
    {
      FileReader reader = new FileReader(new File(fileText.getText()))
      ObjectInputStream modelIn = xstream.createObjectInputStream(reader)
      
      // Load from model file from object stream.
      ridge = (smile.regression.RidgeRegression) modelIn.readObject();
    }
    
    ndata.eachWithIndex { row, ri ->
      double prediction = ridge.predict(row)
      dex.data[ri] << "" + prediction
    }
    dex.header << columnNameText.getText()
    
    if (IS_TRAINING) {
      statusText.setText("Trained Ridge Regression: df=${ridge.df()}, error=${ridge.error()}," +
        "ftest=${ridge.ftest()},RSS=${ridge.RSS()},pvalue=${ridge.pvalue()}," +
        "R^2=${ridge.RSquared()},shrinkage=${ridge.shrinkage()}," +
        "Adj R^2=${ridge.adjustedRSquared()}")
    }
    else {
      statusText.setText("Predicted ${dex.data.size()} outcomes.")
    }
    
    String graphVizTemplate = FileUtils.readFileToString(
        new File("web/ml/smile/RidgeRegression.gtmpl"))
    
    def binding = [
       "df": ridge.df(),
       "error": ridge.error(),
       "ftest": ridge.ftest(),
       "rss": ridge.RSS(),
       "pValue": ridge.pvalue(),
       "rSquared": ridge.RSquared(),
       "shrinkage": ridge.shrinkage(),
       "adjRSquared": ridge.adjustedRSquared()
      ]
    def engine = new SimpleTemplateEngine()
    def template = engine.createTemplate(graphVizTemplate).make(binding)
    String graphVizOutput = template.toString()
    we?.loadContent(graphVizOutput)

    println "HEADER: ${dex.header}"
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label lambdaLabel = new Label("Lambda")
      Label classifyColumnLabel = new Label("Classify Column");
      Label statusLabel = new Label("Status:")
      Label columnNameLabel = new Label("Destination Column")
      WebViewUtil.noData(we)
      
      configPane = new MigPane("", "[][grow]", "[][][][][][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Ridge Regression"), "grow,span")
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
          //ex.printStackTrace()
        }
      } as EventHandler);
      
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow, span")
      
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      configPane.add(browseButton, "span")
      configPane.add(columnListView, "grow,span")
      
      configPane.add(lambdaValueLabel, "grow,span");
      configPane.add(lambdaLabel);
      configPane.add(lambdaSlider, "grow,span")
      
      lambdaValueLabel.setText(lambdaSlider.getValue() as String)
      lambdaSlider.setOnMouseDragged({ MouseEvent event ->
        lambdaValueLabel.setText(lambdaSlider.getValue() as String)
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
