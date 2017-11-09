package com.dexvis.dex.task.database

import groovy.json.*
import javafx.beans.property.SimpleStringProperty
import javafx.beans.property.StringProperty
import javafx.event.ActionEvent
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView

import org.apache.commons.io.FileUtils
import org.bson.Document
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor
import com.mongodb.BasicDBObject
import com.mongodb.MongoClient
import com.mongodb.MongoClientURI
import com.mongodb.client.AggregateIterable
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase

@Root
class AggregateMongo extends DexTask {
  
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()
  
  @Element(name="mongoScript", required=false)
  private StringProperty mongoScript = new SimpleStringProperty("[ { \"\$match\": {} } ]");
  
  private MigPane configPane = null
  
  private Label urlLabel = new Label("Url:")
  private Label collectionLabel = new Label("Collection:")
  
  @Element(name="url", required=false)
  private TextField urlText = new TextField("mongodb://localhost/local")
  
  @Element(name="collection", required=false)
  private TextField collectionText = new TextField("collection")
  
  private CodeMirrorEditor editor = null;
  
  private DexFileChooser mongoChooser = new DexFileChooser("mongo",
  "Load Mongo Aggregate", "Save Mongo Aggregate", "NO-SQL", "ns")
  
  public AggregateMongo() {
    super("Database", "Aggregate Mongo", "database/AggregateMongo.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    DexEnvironment env = DexEnvironment.getInstance()
    
    updateMessage("Connecting to mongo database")
    
    MongoClientURI uri = new MongoClientURI(urlText.getText())
    MongoClient client = new MongoClient(uri);
    MongoDatabase db = client.getDatabase(uri.getDatabase());
    
    updateMessage("Connected to mongo database")
    
    MongoCollection<Document> collection = db.getCollection(collectionText.getText());
    List<Document> pipeline = new ArrayList<BasicDBObject>();
    
    String mongoQuery = env.interpolate(mongoScript.getValue())
    def slurper = new groovy.json.JsonSlurper()
    def gson = slurper.parseText(mongoQuery);
    
    println "Mongo Query: '${mongoQuery}'"
    println "Mongo GSON : '${gson}'"
    
    gson.eachWithIndex { row, ri ->
      
      def op = row.keySet().toArray()[0]
      def agg = JsonOutput.toJson(row[op]);
      println "OP: '${op}', AGG: '${agg}'"
      try {
        switch(agg) {
          case '$limit':
            println ("Limiting documents read to: ${limit} documents.")
            pipeline.add(new Document(op, agg as Integer));
            break;
          default:
            Document aggDoc = Document.parse(agg);
            pipeline.add(new Document(op, aggDoc))
        }
      }
      catch (Exception ex) {
        switch(agg) {
          case '$limit':
            println ("Limiting documents read to: ${limit} documents.")
            pipeline.add(new Document(op, agg as Integer));
            break;
          default:
            try {
              pipeline.add(new Document(op, agg));
            }
            catch (Exception iEx) {
              println "**** MONGO AGGREGATION FALLBACK: Document.parse(op=${op}, agg=${agg})"
              pipeline.add(Document.parse("{${op}:\"${agg}\"}"))
            }
        }
      }
    }
    
    AggregateIterable<Document> results = collection.aggregate(pipeline);
    
    println "Mongo ResultSet contains ${results.size()} items."
    
    def header = results[0].keySet() as List;
    println "Header: '${header}'"
    
    def data = []
    
    results.eachWithIndex { result, ri ->
      def jsonStr = result.toJson();
      gson = slurper.parseText(jsonStr)
      def row = header.collect { key ->
        return ((result[key] as String)?.replaceAll(/^\[?(.*?)\]?$/) { all, text -> text })
      }
      data << row
    }
    state.dexData.header = header;
    state.dexData.data = data;
    return state
  }
  
  public javafx.scene.Node getConfig() {
    if (configPane == null) {
      def bindings = [
        'mode'     : 'JavaScript',
        'mime'     : 'text/javascript',
        'theme'    : 'eclipse'
      ]
      editor = new CodeMirrorEditor(we, bindings, mongoScript)
      
      configPane = new MigPane("", "[][grow]", "[][][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      Button loadButton = new Button("Load Mongo Script")
      loadButton.setOnAction({ event -> load(event) })
      
      Button saveButton = new Button("Save Mongo Script")
      saveButton.setOnAction({ event -> save(event) })
      
      configPane.add(NodeFactory.createTitle("Aggregate Mongo"), "grow,span")
      
      configPane.add(urlLabel)
      configPane.add(urlText, "grow,span")
      
      configPane.add(collectionLabel)
      configPane.add(collectionText, "grow,span")
      
      configPane.add(wv, "align left,span,grow")
      
      configPane.add(loadButton, "")
      configPane.add(saveButton, "span")
    }
    
    return configPane
  }
  
  public load(ActionEvent evt) {
    try {
      File loadFile = mongoChooser.load(evt)
      
      if (loadFile != null) {
        // Automatically updates mongoScript
        editor.setEditorContent(FileUtils.readFileToString(loadFile))
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
  
  public save(ActionEvent evt) {
    try {
      File saveFile = mongoChooser.save(evt)
      
      if (saveFile != null) {
        FileUtils.writeStringToFile(saveFile, mongoScript.getValue())
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
}
