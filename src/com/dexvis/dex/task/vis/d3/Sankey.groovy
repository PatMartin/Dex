package com.dexvis.dex.task.vis.d3

import javafx.collections.FXCollections
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.ChoiceBox
import javafx.scene.control.Label
import javafx.scene.control.Tab
import javafx.scene.control.TabPane
import javafx.scene.control.TextArea
import javafx.scene.control.TextField
import javafx.scene.image.Image
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView
import javafx.stage.FileChooser

import org.apache.commons.io.FileUtils
import org.apache.commons.lang3.StringUtils
import org.simpleframework.xml.Element
import org.simpleframework.xml.ElementList
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.scene.control.ModalDialog
import com.dexvis.javafx.scene.control.NodeFactory
import com.thoughtworks.xstream.annotations.XStreamOmitField;

@Root
class Sankey extends DexTask {
  @XStreamOmitField
  private WebView wv = new WebView()
  @XStreamOmitField
  private WebEngine we = wv.getEngine()
  private String outputHTML = ""
  @XStreamOmitField
  private TextArea outputTextArea = new TextArea("")

  @XStreamOmitField
  private Label titleLabel = new Label("Chart Title: ")
  @Element(required=false)
  @XStreamOmitField
  private TextField titleText = new TextField("Sankey")

  @XStreamOmitField
  private Label widthLabel = new Label("Width: ")
  @Element(required=false)
  @XStreamOmitField
  private TextField widthText = new TextField("800")

  @XStreamOmitField
  private Label heightLabel = new Label("Height: ")
  @XStreamOmitField
  @Element(required=false)
  private TextField heightText = new TextField("600")

  private String PAGE="template/d3/sankey.html"
  @XStreamOmitField
  private MigPane configPane = null
  @XStreamOmitField
  private MigPane relPane = null

  private boolean INITIALIZED = false

  private numericHeaders = []
  private headers = []

  @XStreamOmitField
  @ElementList(name="sourcelist", required=false)
  private List<ChoiceBox> sourceList = new ArrayList<ChoiceBox>()
  @ElementList(name="destlist", required=false)
  @XStreamOmitField
  private List<ChoiceBox> destList = new ArrayList<ChoiceBox>()
  @ElementList(name="weightlist", required=false)
  @XStreamOmitField
  private List<ChoiceBox> weightList = new ArrayList<ChoiceBox>()

  public Sankey() {
    setCategory("Visualization: D3")
    setName("Sankey Diagram")
    setHelpFile("visualization/d3/SankeyDiagram.html")
  }

  /*
   var jsonData = {"nodes":[
   {"name":"Agricultural 'waste'"},
   {"name":"Bio-conversion"},
   {"name":"Wind"}
   ],
   "links":[
   {"source":0,"target":1,"value":124.729},
   {"source":1,"target":2,"value":0.597}
   ]};
   */
  public DexTaskState initialize(DexTaskState state) throws DexException {
    return state
  }

  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    String oldVal

    headers = state.dexData.header
    numericHeaders = state.dexData.getNumericColumns()

    // Dynamically add our choices here:
    println "HEADER: ${state.dexData.header}"
    for (ChoiceBox cb : sourceList)
    {
      oldVal = cb.getValue()
      cb.setItems(FXCollections.observableArrayList(headers))
      cb.setValue(oldVal)
    }
    for (ChoiceBox cb : destList)
    {
      oldVal = cb.getValue()
      cb.setItems(FXCollections.observableArrayList(headers))
      cb.setValue(oldVal)
    }
    for (ChoiceBox cb : weightList)
    {
      oldVal = cb.getValue()
      cb.setItems(FXCollections.observableArrayList(numericHeaders))
      cb.setValue(oldVal)
    }

    updateRelPane()

    if (!INITIALIZED)
    {
      INITIALIZED = true
      return state
    }

    def relations = []
    for (int i=0; i < sourceList.size() && i < destList.size() && i < weightList.size(); i++)
    {
      relations << [ "source" : sourceList.get(i).getValue(), "dest" : destList.get(i).getValue(),
        "weight" : weightList.get(i).getValue()]
    }

    //def relations =
    //     [
    //       [ "source" : "SEX", "dest" : "AGEGROUP", "weight" : "POP" ],
    //       [ "source" : "AGEGROUP", "dest" : "EDU", "weight" : "POP" ]
    //     ]

    Map<String, List<String>> colMap = state.dexData.getColumnMap()

    // Get unique list of nodes:
    def categories = []
    relations.each
    { map ->
      categories << map["source"]
      categories << map["dest"]
    }

    def curNode = 0
    def nodeMap = [:]
    categories = categories.unique()
    categories.each { node -> nodeMap[node] = [:] }

    categories.each { node -> colMap[node].collect{it}.unique().each { uval -> nodeMap[node][uval] = curNode; curNode++ } }

    def nodes = []
    nodeMap.each
    { category, uvals ->
      uvals.each
      { uval, nodeNum ->
        nodes << uval
      }
    }

    println "NODE-MAP: ${nodeMap}"

    String jsonNodes = nodes.collect { node -> "{\"name\":\"${node}\"}" }.join(",")
    def linkMap = [:]
    def targetMap = [:]

    // Now make the links:
    state.dexData.data.eachWithIndex
    { row, ri ->
      relations.each
      { relation ->
        try
        {
          def src = relation["source"]
          def dest = relation["dest"]
          def weight = relation["weight"]

          def srcVal = colMap[src][ri]
          def destVal = colMap[dest][ri]
          def weightVal = colMap[weight][ri]

          def srcNode = nodeMap[src][srcVal]
          def targetNode = nodeMap[dest][destVal]

          if (linkMap.containsKey(srcNode))
          {
            targetMap = linkMap[srcNode]
          }
          else
          {
            targetMap = [:]
            linkMap[srcNode] = targetMap
          }

          if (targetMap.containsKey(targetNode))
          {
            targetMap[targetNode] = (targetMap[targetNode] as Double) + (weightVal as Double)
          }
          else
          {
            targetMap[targetNode] = weightVal as Double
          }
        }
        catch (Exception ex)
        {
          ex.printStackTrace()
          // Best effort
        }
      }
    }

    // Now create the links.
    def links = []

    println "LINKMAP: $linkMap"
    linkMap.each
    { src, destMap ->
      destMap.each
      { target, weight ->
        links << "{\"source\":$src, \"target\":$target, \"value\":$weight }"
      }
    }

    println "LINKS: $links"
    String jsonLinks = links.join(",")

    try
    {
      String content =
          FileUtils.readFileToString(new File(PAGE))

      String dataString = "jsonData = {\"nodes\": [ " + jsonNodes + "],\"links\":[ " + jsonLinks + "]};\n"

      dataString += "height=${heightText.getText()};\n"
      dataString += "width = ${widthText.getText()};\n"
      dataString += "title = '${titleText.getText()}';\n"

      outputHTML = StringUtils.replace(content, "// {DATA}", dataString)
      outputTextArea.setText(outputHTML)

      we?.loadContent(outputHTML)
    }
    catch(Exception ex)
    {
      StringWriter sw = new StringWriter()
      ex.printStackTrace(new PrintWriter(sw))
      ModalDialog dialog = new ModalDialog(stage, "Error", sw.toString(), "Ok")
      ex.printStackTrace()
    }

    return state
  }

  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[grow]", "[grow]")
      configPane.setStyle("-fx-background-color: white;")

      relPane = new MigPane("", "[][][]", "[]")
      addRelationalCB()

      TabPane tabPane = new TabPane()
      Tab configTab = new Tab("Configuration")

      MigPane configTabPane = new MigPane("", "[][grow]", "[][][][][]")

      Button addRelationshipButton = new Button("Add Relationship")
      addRelationshipButton.setOnAction(new ReflectiveActionEventHandler(this, "addRelationship"))

      Button removeRelationshipButton = new Button("Remove Relationship")
      removeRelationshipButton.setOnAction(new ReflectiveActionEventHandler(this, "removeRelationship"))

      configTabPane.add(NodeFactory.createTitle("Sankey Diagram Configuration"), "grow,span")
      configTabPane.add(widthLabel)
      configTabPane.add(widthText, "grow, span")
      configTabPane.add(heightLabel)
      configTabPane.add(heightText, "grow, span")
      configTabPane.add(titleLabel)
      configTabPane.add(titleText, "grow, span")
      configTabPane.add(relPane, "grow, span")
      configTabPane.add(addRelationshipButton)
      configTabPane.add(removeRelationshipButton, "span")

      configTab.setContent(configTabPane)

      Tab outputTab = new Tab("Output")
      MigPane outputTabPane = new MigPane("", "[grow]", "[grow][]")
      outputTabPane.add(outputTextArea, "span, grow")

      Button saveOutputButton = new Button("Save Output")
      saveOutputButton.setOnAction(new ReflectiveActionEventHandler(this, "saveOutput"))

      outputTabPane.add(saveOutputButton)
      outputTab.setContent(outputTabPane)

      Tab htmlTab = new Tab("HTML")
      MigPane htmlTabPane = new MigPane("", "[grow]", "[grow]")
      htmlTabPane.add(wv, "grow")

      htmlTab.setContent(htmlTabPane)

      tabPane.getTabs().addAll(configTab, outputTab, htmlTab)

      configPane.add(tabPane, "grow")
    }

    return configPane
  }

  public saveOutput(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Save Output File")

      File startDir = new File(new File("output").getCanonicalPath())
      fc.setInitialDirectory(startDir)

      File saveFile = fc.showSaveDialog(null)

      if (saveFile != null)
      {
        FileUtils.writeStringToFile(saveFile, outputHTML)
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public removeRelationship(ActionEvent evt)
  {
    if (sourceList.size() > 0 && destList.size() > 0 && weightList.size() > 0)
    {
      sourceList.remove(sourceList.size()-1)
      destList.remove(destList.size()-1)
      weightList.remove(weightList.size()-1)
    }
    updateRelPane()
  }

  private updateRelPane()
  {
    relPane.getChildren().clear()

    for (int i = 0; i < sourceList.size() && i < destList.size() && i < weightList.size(); i++)
    {
      relPane.add(sourceList.get(i))
      relPane.add(destList.get(i))
      relPane.add(weightList.get(i), "span")
    }
  }

  public addRelationship(ActionEvent evt)
  {
    addRelationalCB()
  }

  public void addRelationalCB()
  {
    ChoiceBox sourceCB = new ChoiceBox()
    ChoiceBox destCB = new ChoiceBox()
    ChoiceBox weightCB = new ChoiceBox()

    sourceCB.setItems(FXCollections.observableArrayList(headers))
    destCB.setItems(FXCollections.observableArrayList(headers))
    weightCB.setItems(FXCollections.observableArrayList(numericHeaders))

    sourceList.add(sourceCB)
    destList.add(destCB)
    weightList.add(weightCB)

    relPane.add(sourceCB)
    relPane.add(destCB)
    relPane.add(weightCB, "span")
  }
}
