package com.dexvis.dex.task.ml.regression

import javafx.event.EventHandler
import javafx.scene.control.Button
import javafx.scene.Node
import javafx.scene.control.CheckBox
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.apache.commons.math3.stat.regression.SimpleRegression
import org.controlsfx.control.ListSelectionView
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.DexData
import com.dexvis.dex.DexModel
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.PathUtil
import com.dexvis.util.WebViewUtil

@Root(name="linear-regression")
class LinearRegression extends DexTask {
  public LinearRegression() {
    super("Machine Learning: Regression", "Linear Regression",
    "machine_learning/regression/LinearRegression.html")
  }
  
  private MigPane configPane = null
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  private DexModel model = null;
  
  @Element(name="columnList", required=false)
  private ListSelectionView<String> columnListView = new ListSelectionView<>();
  
  @Element(name="xColumn", required=false)
  private ChoiceBox xCB = new ChoiceBox();
  
  @Element(name="autosave", required=false)
  private CheckBox autosaveCB = new CheckBox()
  
  private Label effectiveFileLabel = new Label("Effective File Name: ")
  private Label effectiveFile = new Label("")
  private Label fileLabel = new Label("File Name:")
  
  @Element(required=false)
  private TextField fileText = new TextField()
  
  private Button clearButton = new Button("Clear")
  
  private DexEnvironment env = DexEnvironment.getInstance()
  
  private DexFileChooser modelChooser = new DexFileChooser("models",
  "Load  Regressions", "Save Regressions",
  "Linear Regression Model", "linreg.mdl")
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    def dex = state.getDexData()
    def types = dex.guessTypes()
    boolean initializing = false;
    
    // Only update if the list is empty.
    if (columnListView.getSourceItems().size() == 0 && columnListView.getTargetItems().size() == 0)
    {
      columnListView.getSourceItems().addAll(state.getDexData().getHeader())
      initializing = true
    }
    
    if (xCB.getItems().size() == 0)
    {
      xCB.getItems().addAll(state.getDexData().getHeader())
      initializing = true
    }
    
    if (!initializing) {
      // Define base attributes
      def validationData = new DexData(["prediction #"]);
      def maxItems = Math.min(100, dex.data.size())
      (1..maxItems).each { validationData.data << ["${it}" ]}
      def columns = columnListView.getTargetItems()
      def selected = dex.select(columns)
      def xseries = dex.getColumnAsDouble(xCB.getSelectionModel().getSelectedItem() as String)
      def yseries = []
      def regressions = []
      
      columns.eachWithIndex { col, ci ->
        yseries << dex.getColumnAsDouble(col)
        regressions << new SimpleRegression()
      }
      
      xseries.eachWithIndex { x, xi ->
        yseries.eachWithIndex { ys, yi ->
          if (xi < maxItems) {
            // Add actuals to validation data.
            validationData.data[xi] << ys[xi]
          }
          regressions[yi].addData(x, ys[xi])
        }
      }
      
      xseries.eachWithIndex { x, xi ->
        regressions.eachWithIndex { regression, ri ->
          def prediction = regression.slope * x + regression.intercept
          if (xi < maxItems) {
            // Add predictions to validation data
            validationData.data[xi] << prediction
          }
          dex.data[xi] << "${prediction}"
        }
      }
      
      columns.each { column -> validationData.header << "${column}" }
      columns.each { column ->
        validationData.header << "REG_${column}"
        dex.header << "REG_${column}"
      }

      // Prepare and store the model to disk
      String filePath = env.interpolate(fileText.getText())
      effectiveFile.setText(filePath)
      
      if (autosaveCB.isSelected()) {
        def features = columns;
        def featureTypes = dex.select(columns).guessTypes()
        model = new DexModel("Linear Regression", features, featureTypes, regressions,
          [ "x": (xCB.getSelectionModel().getSelectedItem() as String) ])
        model.write(filePath)
      }
      
      WebViewUtil.displayGroovyTemplate(we, "template/internal/tasks/ml/regression/LinearRegression.gtmpl", [
        "validationData": validationData
      ])
    }
    
    return state
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      Label xLabel = new Label("Select X:")
      Label autosaveLabel = new Label("Autosave:")
      WebViewUtil.noData(we)
      
      configPane = new MigPane("", "[][grow]", "[][][][][][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      configPane.add(NodeFactory.createTitle("Linear Regression"), "grow,span")
      
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
      
      configPane.add(xLabel)
      configPane.add(xCB, "span")
      configPane.add(autosaveLabel)
      configPane.add(autosaveCB, "span")
      configPane.add(columnListView, "grow,span")
      configPane.add(wv, "grow,span")
      configPane.add(clearButton, "grow,span")
      
      clearButton.setOnAction({ actionEvent ->
        columnListView.getSourceItems().clear()
        columnListView.getTargetItems().clear()
        xCB.getItems().clear()
      } as EventHandler)
    }
    return configPane
  }
  
}
