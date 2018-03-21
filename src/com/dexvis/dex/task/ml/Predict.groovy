package com.dexvis.dex.task.ml

import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.DexModel
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.PathUtil
import com.dexvis.util.WebViewUtil
import com.dexvis.util.XStreamUtil

@Root(name="predict")
class Predict extends DexTask {
  public Predict() {
    super("Machine Learning: Prediction", "Predict",
    "ml/smile/classification/Predict.html")
  }
  
  private DexEnvironment env = DexEnvironment.getInstance()
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  private MigPane configPane = null

  @Element(name="columnName", required=false)
  private TextField columnNameText = new TextField()
  
  private Label effectiveFileLabel = new Label("Effective File Name: ")
  private Label effectiveFile = new Label("")
  
  private Label fileLabel = new Label("File Name:")
  
  @Element(name="model", required=false)
  private TextField fileText = new TextField()
  
  private Button clearButton = new Button("Clear")
  
  private DexFileChooser modelChooser = new DexFileChooser("models",
  "Load Model", "Save Model", "Decision Tree Model", "mdl")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    def dex = state.getDexData();
    def types = dex.guessTypes()
    
    if (columnNameText.getText() == null || columnNameText.getText().length() <= 0) {
      columnNameText.setText("PREDICTION")
    }
    
    String filePath = env.interpolate(fileText.getText())
    effectiveFile.setText(filePath)
    
    def objs = XStreamUtil.readObjects(filePath)
    
    // Load from model file from object stream.
    DexModel model = DexModel.read(filePath);
    if (!(model.getType() in ["Decision Tree", "Ridge Regression", "Lasso Regression"]))
    {
      throw new DexException("Model of type: '${model.getType()}' is not currently supported.")
    }
    
    // Check viability of the data
    def selected = dex.select(model.getFeatures())
    if (selected.header.size() != model.getFeatures().size()) {
      throw new DexException("Model requires features: ${model.getFeatures()} " +
      "but found ${selected.header} instead.")
    }
    
    def ndata = selected.getDoubles(selected.header)
    
    if (model.getType() == "Decision Tree") {
      smile.classification.DecisionTree dtree = (smile.classification.DecisionTree) model.getModel()
      Map<String,String> classMap = (Map<String,String>) model.getProperties().get("classificationMap");
      ndata.eachWithIndex { row, ri ->
        String prediction = new String("${classMap[dtree.predict(row)]}")
        dex.data[ri] << prediction
      }
    }
    else if (model.getType() == "Ridge Regression") {
      smile.regression.RidgeRegression ridge = (smile.regression.RidgeRegression) model.getModel()
      ndata.eachWithIndex { row, ri ->
        String prediction = new String("${ridge.predict(row)}")
        dex.data[ri] << prediction
      }
    }
    else if (model.getType() == "Lasso Regression") {
      smile.regression.LASSO lasso = (smile.regression.LASSO) model.getModel()
      ndata.eachWithIndex { row, ri ->
        String prediction = new String("${lasso.predict(row)}")
        dex.data[ri] << prediction
      }
    }
    
    dex.header << columnNameText.getText()
    WebViewUtil.displayGroovyTemplate(we, "web/ml/smile/Predict.gtmpl", [
      modelType: model.getType(),
      numPredictions: selected.data.size(),
      features: model.getFeatures(),
      featureTypes: model.getFeatureTypes()])
    
    return state
  }
  
  public Node getConfig() {
    if (configPane == null) {
      Label columnNameLabel = new Label("Destination Column")
      WebViewUtil.noData(we)
      
      configPane = new MigPane("", "[][grow]", "[][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Predict"), "grow,span")
      Button loadButton = new Button("Load Model")
      
      loadButton.setOnAction({ actionEvent ->
        println "ACTION-EVENT: ${actionEvent}"
        try {
          File loadFile = modelChooser.load(actionEvent)
          String path = PathUtil.getRelativePath(loadFile)
          fileText.setText(path)
          effectiveFile.setText(path)
          DexModel model = DexModel.read(path);
          WebViewUtil.displayGroovyTemplate(we, "web/ml/smile/Predict.gtmpl", [
            modelType: model.getType(),
            numPredictions: 0,
            features: model.getFeatures(),
            featureTypes: model.getFeatureTypes()])
        }
        catch(Exception ex) {
          ex.printStackTrace()
        }
      } as EventHandler);
      
      configPane.add(effectiveFileLabel)
      configPane.add(effectiveFile, "grow, span")
      
      configPane.add(fileLabel)
      configPane.add(fileText, "grow")
      configPane.add(loadButton, "span")
      
      configPane.add(columnNameLabel)
      configPane.add(columnNameText, "grow, span")
      
      configPane.add(wv, "grow,span")
      configPane.add(clearButton, "grow, span")
      
      clearButton.setOnAction({ actionEvent ->
      } as EventHandler);
    }
    return configPane
  }
}
