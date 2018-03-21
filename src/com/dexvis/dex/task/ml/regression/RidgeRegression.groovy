package com.dexvis.dex.task.ml.regression

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

import com.dexvis.dex.DexModel
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.PathUtil
import com.dexvis.util.WebViewUtil

@Root(name="ridge-regression")
class RidgeRegression extends DexTask {
  public RidgeRegression() {
    super("Machine Learning: Regression", "Ridge Regression",
    "ml/smile/classification/RidgeRegression.html")
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
  
  @Element(name="responseColumn", required=false)
  private ChoiceBox responseColumnCB = new ChoiceBox()
  
  @Element(name="autosave", required=false)
  private CheckBox autosaveCB = new CheckBox()
  
  private Label effectiveFileLabel = new Label("Effective File Name: ")
  private Label effectiveFile = new Label("")
  private Label fileLabel = new Label("File Name:")
  
  @Element(required=false)
  private TextField fileText = new TextField()
  
  private Button clearButton = new Button("Clear")
  
  @Element(name="lambda", required=false)
  Slider lambdaSlider = new Slider(0.01, 20.0, 0.1)
  
  private Label lambdaValueLabel = new Label("")

  private DexFileChooser modelChooser = new DexFileChooser("models",
  "Load Ridge Regression Model", "Save Ridge Regression Model",
  "Ridge Regression Model", "ridge.mdl")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    def dex = state.getDexData()
    def types = dex.guessTypes()
    
    if (columnNameText.getText() == null || columnNameText.getText().length() <= 0) {
      columnNameText.setText("RIDGE")
    }
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
    }
    
    // If we have not picked a prediction column, default to column 0 and flag
    // this task as being in the process of initialzing.
    if (responseColumnCB.getSelectionModel().isEmpty()) {
      responseColumnCB.getItems().addAll(state.dexData.header)
      responseColumnCB.getSelectionModel().select(0)
    }
    
    // Must have selected at least 1 column.
    if (columnListView.getTargetItems().size() <= 0) {
      throw new DexException("You must select at least one column in task ${getName()}.")
    }
    
    String classColName = "" + responseColumnCB.getSelectionModel().getSelectedItem()
    
    // Define base attributes
    def features = columnListView.getTargetItems()
    def selected = dex.select(features)
    def featureTypes = selected.guessTypes()
    def ndata= selected.getDoubles(features)
    def atts = dex.getNumericAttributes(features)
    
    if (ndata[0].size() != columnListView.getTargetItems().size()) {
      throw new DexException("${getName()} > Data Mismatch Error : selected header size: " +
      "${ndata[0].size} does not match user selection size: ${columnListView.getTargetItems().size()}")
    }
    
    //println "NDATA: ${ndata}";
    int responseIndex = responseColumnCB.getSelectionModel().getSelectedIndex()
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
    
    // Prepare and store the model to disk
    String filePath = env.interpolate(fileText.getText())
    effectiveFile.setText(filePath)

    // Ridge, Lasso, RLS
    smile.regression.RidgeRegression ridge = new smile.regression.RidgeRegression(ndata, responses,
      lambdaSlider.getValue())
    
    model = new DexModel("Ridge Regression", features, featureTypes, ridge)
    
    if (autosaveCB.isSelected()) {
      model.write(filePath)
    }

    ndata.eachWithIndex { row, ri ->
      double prediction = ridge.predict(row)
      dex.data[ri] << "" + prediction
    }
    dex.header << columnNameText.getText()
    
    WebViewUtil.displayGroovyTemplate(we, "web/ml/smile/RidgeRegression.gtmpl", [
      "df": ridge.df(),
      "error": ridge.error(),
      "ftest": ridge.ftest(),
      "rss": ridge.RSS(),
      "pValue": ridge.pvalue(),
      "rSquared": ridge.RSquared(),
      "shrinkage": ridge.shrinkage(),
      "adjRSquared": ridge.adjustedRSquared()
    ])

    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label lambdaLabel = new Label("Lambda")
      Label classifyColumnLabel = new Label("Classify Column");
      Label columnNameLabel = new Label("Destination Column")
      Label autosaveLabel = new Label("Autosave")
      WebViewUtil.noData(we)
      
      configPane = new MigPane("", "[][grow]", "[][][][][][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Ridge Regression"), "grow,span")
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
      configPane.add(lambdaValueLabel, "grow,span");
      configPane.add(lambdaLabel);
      configPane.add(lambdaSlider, "grow,span")
      
      lambdaValueLabel.setText(lambdaSlider.getValue() as String)
      lambdaSlider.setOnMouseDragged({ MouseEvent event ->
        lambdaValueLabel.setText(lambdaSlider.getValue() as String)
      })
      
      configPane.add(classifyColumnLabel)
      configPane.add(responseColumnCB, "grow,span")
      configPane.add(columnNameLabel)
      configPane.add(columnNameText, "grow, span")
      configPane.add(wv, "grow,span")
      configPane.add(clearButton, "grow, span")
      
      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
        responseColumnCB.getItems().clear()
      } as EventHandler);
    }
    return configPane
  }
  
}
