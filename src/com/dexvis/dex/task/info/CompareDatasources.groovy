package com.dexvis.dex.task.info

import java.util.concurrent.Future

import javafx.collections.FXCollections
import javafx.collections.ObservableList
import javafx.event.ActionEvent
import javafx.geometry.Orientation
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.ListView
import javafx.scene.control.SplitPane
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView
import javafx.stage.FileChooser

import org.simpleframework.xml.Element
import org.simpleframework.xml.ElementList
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.opencsv.CSVReader
/*import au.com.bytecode.opencsv.CSVReader*/

import com.dexvis.dex.Dex
import com.dexvis.dex.DexData
import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.dex.wf.InternalTask
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.util.WebViewUtil
import com.thoughtworks.xstream.annotations.XStreamOmitField

@Root
class CompareDatasources extends DexTask {
  @XStreamOmitField
  private WebView wv = new WebView()
  @XStreamOmitField
  protected WebEngine we = wv.getEngine()
  
  @Element(name="start-dir", required=false)
  String startDir = "data"
  
  public CompareDatasources() {
    super("Info", "Compare Data", "info/CompareData.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  private MigPane configPane = null
  
  @ElementList(name = "fileList", inline = true, required = false)
  private ObservableList<String> fileList     = FXCollections
  .observableArrayList()
  
  private ListView<String> fileListView = new ListView<String>(fileList)
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    state.dexData.header = ["NUM", "FILE", "LINE"]
    state.dexData.data = []
    
    def tasks = []
    List<Future<Object>> futureResults = []
    def readers = [:]
    List<String> headers = ["DATASOURCE1", "DATASOURCE2", "COLUMN1", "COLUMN2", "UNIQUE_MATCHES", "MATCH_PERCENT", "UNIQUE_TRIMMED_MATCHES", "TRIMMED_MATCH_PERCENT"]
    def data = []
    
    updateMessage("Loading CSV files")
    fileList.each { filename ->
      File file = new File(filename)
      def readerName = file.getName().replaceFirst(~/\.[^\.]+$/, '')
      readers[readerName] = file
    }
    
    double percentDone = 0.0
    def match = [:], trimMatch = [:], evaluated = [:]
    
    readers.each { reader1Key, file1 ->
      readers.each { reader2Key, file2 ->
        
        // Don't compare ourself to ourself.
        if (reader1Key != reader2Key)
        {
          updateMessage("Preprocessing Data To Compare: $reader1Key to $reader2Key")
          
          CSVReader reader1 = new CSVReader(new FileReader(file1))
          CSVReader reader2 = new CSVReader(new FileReader(file2))
          
          def header1 = reader1.readNext().collect { h1 -> return h1 as String}
          def header2 = reader2.readNext().collect { h2 -> return h2 as String}
          def row
          
          List<List<String>> data1 = []
          List<List<String>> data2 = []
          
          header1.each { data1 << []}
          header2.each { data2 << []}
          
          // Storing data by column not row.  So the structure is:
          //
          // data1 = [[C1R1, C1R2, ..., C1Rr],...[CcR1, CcR2, ..., CcRr]
          //
          // such that 'r' is the number of rows in the csv and 'c' is the
          // number of columns in the csv.
          //
          // This allows us to directly compare columns vs other columns in
          // data2 which is read in exactly the same way.
          //def rnum=1
          while (row = reader1.readNext())
          {
            row.eachWithIndex { col, ri ->
              //println "$reader1Key[$rnum]: RI: $ri, hlen: ${header1.size()}"
              data1[ri] << (col as String) }
            //rnum++
          }
          
          //rnum=1
          while (row = reader2.readNext())
          {
            row.eachWithIndex { col, ri ->
              //println "$reader2Key[$rnum]: RI: $ri, hlen: ${header2.size()}"
              data2[ri] << (col as String) }
            //rnum++
          }
          
          Map<String, Object> symbolTable = [
            'datasource1' : reader1Key,
            'datasource2' : reader2Key,
            'header1' : header1,
            'data1' : data1,
            'header2' : header2,
            'data2' : data2 ]
          
          // Create, submit, and keep track of a subtask to scan two tables.
          futureResults << Dex.CCS.submit(new InternalTask(
              "Compare DS $reader1Key to $reader2Key",
              { compareDatasources(symbolTable) }))
        }
      }
    }
    
    // Tally the results.
    List<List<String>> newData = []
    
    int totalPendingTaskCount = futureResults.size()
    int pendingTaskCount = totalPendingTaskCount
    
    while (pendingTaskCount > 0)
    {
      updateMessage("Waiting on " + pendingTaskCount + " of " + totalPendingTaskCount +
          " tasks to complete.")
      percentDone = 10.0 + (90.0 * (1 - pendingTaskCount / totalPendingTaskCount))
      updateProgress(percentDone)
      Future<Object> completed = Dex.CCS.take()
      
      List<String<String>> result = completed.get()
      newData.addAll(result)
      pendingTaskCount--
    }
    
    state.dexData = new DexData(headers, newData)
    return state
  }
  
  public List<List<String>> compareDatasources(Map<String, Object> symbolTable)
  {
    println "************ Comparing datasources *****************";
    String datasource1 = symbolTable.datasource1
    String datasource2 = symbolTable.datasource2
    List<String> header1 = symbolTable.header1
    List<String> header2 = symbolTable.header2
    List<List<String>> data1 = symbolTable.data1
    List<List<String>> data2 = symbolTable.data2
    
    def data1NumCols = header1.size()
    def data1NumRows = (data1[0]) ? data1[0].size() : 0
    def data2NumCols = header2.size()
    def data2NumRows = (data2[0]) ? data2[0].size() : 0
    def match = [:]
    def trimMatch = [:]
    def evaluated = [:]
    def tvalue1
    
    List<List<String>> results = []
    
    //def percentPerColumnTask = percentPerSubtask / (data1NumCols * data1NumCols)
    //println "Percent Per Column Task: $percentPerColumnTask"
    
    data1.eachWithIndex { column1, ci1 ->
      
      // Update progress bar as this task can take awhile
      //percentDone = (100.0 * curSubtask / totalSubtask) +
      //    percentPerSubtask * ci1 / data1NumCols
      //updateProgress(percentDone)
      
      data2.eachWithIndex { column2, ci2 ->
        
        //updateMessage("Comparing: ${reader1Key}.${header1[ci1]} vs ${reader2Key}.${header2[ci2]} : ${percentDone}")
        match = [:]
        trimMatch = [:]
        evaluated = [:]
        column1.each { value1 ->
          if (!evaluated[value1])
          {
            evaluated[value1] = true
            
            column2.find { value2 ->
              // Found exact match.
              if (value1 == value2)
              {
                match[value1] = 1
                trimMatch[value1] = 1
                // Found, quit looking...
                return true
              }
              // On trim match, we don't consider this an exact match and keep on looking.
              else {
                tvalue1 = value1.trim()
                
                if (!trimMatch[tvalue1])
                {
                  if (tvalue1 == value2.trim())
                  {
                    if (tvalue1.length() > 0)
                    {
                      trimMatch[value1] = 1
                    }
                  }
                }
              }
              // Keep on looking...
              return false
            }
          }
        }
        //percentDone += percentPerColumnTask
        //updateProgress(percentDone)
        results << [datasource1, datasource2, header1[ci1], header2[ci2], match.keySet().size(), match.keySet().size() / (data1NumRows ? data1NumRows : 1) * 100, trimMatch.keySet().size(), trimMatch.keySet().size() / (data1NumRows ? data1NumRows : 1) * 100]
      }
    }
    
    return results;
  }
  
  public Node getConfig() {
    if (configPane == null) {
      configPane = new MigPane("", "[grow]", "[][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      Button browseButton = new Button("Browse")
      
      fileListView = new ListView<String>(fileList)
      fileListView.setItems(fileList)
      
      SplitPane splitter = new SplitPane();
      splitter.setOrientation(Orientation.HORIZONTAL)
      splitter.getItems().addAll(fileListView, wv)
      splitter.setDividerPositions(0.25f)
      
      WebViewUtil.noData(we)
      
      configPane.add(NodeFactory.createTitle("Compare Datasources"), "grow,span")
      configPane.add(splitter, "grow,span")
      
      configPane.add(browseButton, "span")
      
      browseButton.setOnAction({event -> open(event)})
    }
    
    return configPane
  }
  
  public void open(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load Datasources")
      
      File startDirFile = new File(new File(startDir).getCanonicalPath())
      fc.setInitialDirectory(startDirFile)
      
      List<File> loadFiles = fc.showOpenMultipleDialog(null)
      
      if (loadFiles && loadFiles.size() > 0) {
        startDir = loadFiles.get(0).getCanonicalPath()
        for (File file : loadFiles) {
          fileList.add(file.getAbsolutePath())
        }
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
}
