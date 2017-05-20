package com.dexvis.dex.task.input

import java.util.jar.JarFile

import javafx.collections.FXCollections
import javafx.collections.ObservableList
import javafx.event.ActionEvent
import javafx.geometry.Orientation
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.CheckBox
import javafx.scene.control.ListView
import javafx.scene.control.SplitPane
import javafx.scene.input.KeyCode
import javafx.stage.FileChooser

import org.apache.bcel.classfile.ConstantClass
import org.apache.bcel.classfile.ConstantUtf8
import org.apache.bcel.classfile.JavaClass
import org.apache.bcel.util.ClassPath
import org.apache.bcel.util.SyntheticRepository
import org.simpleframework.xml.Element
import org.simpleframework.xml.ElementList
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.ModalDialog
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class JarInspector extends DexTask {
  @Element(name="selfref", required=false)
  private CheckBox selfRefCB
  
  @Element(name="undefined", required=false)
  private CheckBox undefinedCB
  
  @ElementList(name = "jarData", inline = true, required = false)
  private ObservableList<String> jarData     = FXCollections
  .observableArrayList()
  
  private MigPane configPane = null
  
  private ListView<String> jarListView = new ListView<String>(jarData)
  
  public JarInspector() {
    super("Input", "Jar Inspector", "input/JarInspector.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    println "Running: $name"
    
    try {
      // Create the header
      state.dexData.header = ["JAR", "DEFINING_JAR", "DEPENDENCY"]
      state.dexData.data = []
      
      // Create the classpath and repository.
      ClassPath cp = new ClassPath(jarData.join(System.getProperty("path.separator")))
      SyntheticRepository repo = SyntheticRepository.getInstance(cp)
      
      // A map containing: class -> [ jar1, jar2, ...] of jars which contain this class.
      def classMap = [:]
      // A map containing: dependency -> jarMap where jarMap contains entries like: [ jarClass : jarClass ]
      def depMap = [:]
      
      jarData.each
      { jarPath ->
        updateMessage("Reading jar: '${jarPath}'");
        def jarMatch = ( jarPath =~ /([^\\\/]+)\.jar/)
        def jarClass = jarMatch[0][0]
        
        // Open the current jar file.
        JarFile jarFile = new JarFile(new File(jarPath))
        
        // Process each jar in the classpath
        jarFile?.entries().each
        {  classFile ->
          // Translate com/some/classfile/class into com.some.classfile.class
          def clazz = (classFile =~ /\//).replaceAll(".")
          
          // Process class files only
          if (clazz.endsWith(".class"))
          {
            // Remove .class suffix.
            clazz = (clazz =~ /\.class$/).replaceFirst("")
            try
            {
              // Attempt loading the class file through the synthetic repository
              JavaClass javaClass = repo.loadClass(clazz)
              
              // Append this class to the list of jars containing this class.
              if (classMap.containsKey(clazz))
              {
                classMap.put(clazz, classMap.get(clazz) << jarClass)
              }
              // Else store this jar as containing this class.
              else
              {
                classMap.put(clazz, [jarClass])
              }
              
              // Read the constants pool for this class:
              javaClass?.getConstantPool()?.getConstantPool().each
              { c ->
                
                // Process constant classes only.
                if (c instanceof ConstantClass)
                {
                  ConstantClass cc = (ConstantClass) c
                  
                  // Get the name index.
                  ConstantUtf8 nameIndex = (ConstantUtf8) javaClass.getConstantPool().getConstant(cc.getNameIndex())
                  
                  // Capture the name and translate from "/" delimited to "." delimited.
                  def m = (nameIndex.toString() =~ /\"(.*)\"/)
                  String dep = (m[0][1] =~ /\//).replaceAll(".")
                  
                  // If this dependency has already been defined, get the map and store this entry into it.
                  if (depMap.containsKey(dep))
                  {
                    def jarMap = depMap.get(dep)
                    if (!jarMap.containsKey(jarClass))
                    {
                      
                      jarMap.put(jarClass, jarClass)
                    }
                  }
                  else
                  {
                    def jarMap = [jarClass : jarClass ]
                    depMap.put(dep, jarMap)
                  }
                }
              }
            }
            catch (Exception ex)
            {
              //ex.printStackTrace()
            }
          }
        }
      }
      
      // Iterate over dependencies
      depMap.each
      { // key = class, value = A map of jars
        depItem ->
        depItem.value?.each
        { // key = jar, value = jar
          jarItem ->
          def depJar = jarItem.value.toString()
          //println "${depJar} calls ${depItem.key}"
          if (classMap.containsKey(depItem.key))
          {
            //println "DEFINED IN: ${classMap.get(depItem.key)}"
            classMap.get(depItem.key).each
            { classDef ->
              //println "IS $depJar DEFINED IN: $classDef"
              if (selfRefCB.isSelected() || depJar != classDef)
              {
                state.dexData.data << [depJar, classDef, depItem.key.toString()]
              }
            }
          }
          else
          {
            if (undefinedCB.isSelected())
            {
              state.dexData.data << [depJar, "UNDEFINED", depItem.key.toString()]
            }}
        }
      }
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
      jarListView = new ListView<String>(jarData)
      jarListView.setItems(jarData)
      
      configPane = new MigPane("", "[grow]", "[grow]")
      configPane.setStyle("-fx-background-color: white;")
      
      MigPane jarConfigPane = new MigPane("", "[][grow]", "[][][][][]")
      
      Button browseButton = new Button("Browse")
      
      selfRefCB = new CheckBox("Include Self References:")
      selfRefCB.setSelected(false)
      undefinedCB = new CheckBox("Include Undefined:")
      undefinedCB.setSelected(false)
      
      jarConfigPane.add(NodeFactory.createTitle("JAR Inspector Configuration"), "grow,span")
      jarConfigPane.add(selfRefCB, "span")
      jarConfigPane.add(undefinedCB, "span")
      jarConfigPane.add(browseButton, "span")
      
      SplitPane hSplitPane = new SplitPane()
      hSplitPane.setOrientation(Orientation.HORIZONTAL)
      
      hSplitPane.getItems().addAll(jarConfigPane, jarListView)
      hSplitPane.setDividerPositions(0.20)
      
      configPane.add(hSplitPane, "span, grow")
      
      browseButton.setOnAction({ action -> open(action)})
      jarListView.setOnKeyPressed({ evt ->
        if (evt.getCode().equals(KeyCode.DELETE)) {
          //System.out.println("DELETING...")
          int removeIndex = jarListView.getSelectionModel().getSelectedIndex();
          if (removeIndex >= 0)
          {
            jarData.remove(removeIndex)
          }
        }
        else {
          System.out.println("Ignoring keypress")
        }
      })
    }
    
    return configPane
  }
  
  public void open(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load Jars")
      
      String userDir = System.getProperty("user.dir")
      File startDir = new File(new File("lib").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      
      List<File> loadFiles = fc.showOpenMultipleDialog(null)
      
      for (File file : loadFiles)
      {
        String filePath = file.getAbsolutePath()
        
        if (userDir != null && userDir.length() > 0 && filePath.startsWith(userDir)) {
          // Including the file separator.
          filePath = filePath.substring(userDir.length() + File.separator.length());
        }
        
        jarData.add(filePath)
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }
}
