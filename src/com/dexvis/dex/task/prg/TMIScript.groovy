//package com.dexvis.dex.task.prg
//
//import javafx.beans.property.SimpleStringProperty
//import javafx.beans.property.StringProperty
//import javafx.event.ActionEvent
//import javafx.scene.Node
//import javafx.scene.control.Button
//import javafx.scene.image.Image
//import javafx.scene.web.WebEngine
//import javafx.scene.web.WebView
//
//import org.antlr.v4.runtime.ANTLRInputStream
//import org.antlr.v4.runtime.CommonTokenStream
//import org.antlr.v4.runtime.tree.ParseTree
//import org.apache.commons.io.FileUtils
//import org.simpleframework.xml.Element
//import org.simpleframework.xml.Root
//import org.tbee.javafx.scene.layout.MigPane
//
//import com.dexvis.dex.exception.DexException
//import com.dexvis.dex.wf.DexTask
//import com.dexvis.dex.wf.DexTaskState
//import com.dexvis.javafx.event.ReflectiveActionEventHandler
//import com.dexvis.javafx.scene.control.DexFileChooser
//import com.dexvis.javafx.scene.control.NodeFactory
//import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor
//import com.dexvis.tmi.TMIGroovyVisitor
//import com.dexvis.tmi.TMIIdentifier
//import com.dexvis.tmi.TMILexer
//import com.dexvis.tmi.TMIParser
//import com.dexvis.tmi.TMISymbolTable
//import com.dexvis.tmi.TMITable
//
//@Root(name="groovyscript")
//class TMIScript extends DexTask {
//  private WebView wv = new WebView()
//  private WebEngine we = wv.getEngine()
//  private CodeMirrorEditor editor = null;
//
//  private DexFileChooser tmiChooser = new DexFileChooser("tmi",
//  "Load TMI Script", "Save TMI Script", "TMI", "tmi")
//
//  private MigPane configPane = null
//
//  @Element(name="tmiCode", required=false)
//  private StringProperty tmiCode = new SimpleStringProperty("")
//
//  public TMIScript() {
//    super("Programming", "TMI Script", "programming/TMIScript.html")
//    getMetaData().setTaskExecutionUpdatesUI(false)
//  }
//
//  public DexTaskState execute(DexTaskState state) throws DexException {
//
//    updateProgress(-1.0, -1.0)
//    updateMessage("Running TMI Script")
//    StringReader sr = new StringReader(tmiCode.getValue())
//    // create a CharStream that reads from standard input
//    ANTLRInputStream input = new ANTLRInputStream(sr)
//    // create a lexer that feeds off of input CharStream
//    TMILexer lexer = new TMILexer(input);
//
//    // create a buffer of tokens pulled from the lexer
//    CommonTokenStream tokens = new CommonTokenStream(lexer);
//
//    // create a parser that feeds off the tokens buffer
//    TMIParser parser = new TMIParser(tokens);
//
//    ParseTree tree = parser.program();
//
//    def sym = new TMISymbolTable()
//    TMITable table = new TMITable(state.getDexData().getHeader(), state.getDexData().getData())
//    //println "DEX-TABLE: $table"
//    sym.assign(new TMIIdentifier("dex"), table)
//    TMIGroovyVisitor<Object> interpreter = new TMIGroovyVisitor<Object>(sym)
//
//    long startTime, endTime;
//    startTime = System.currentTimeMillis();
//    interpreter.visit(tree);
//    endTime = System.currentTimeMillis();
//    System.out.println("Execution completed in: " + (endTime - startTime)
//        + " ms.");
//
//    table = sym.resolveString("dex")
//
//    state.getDexData().setHeader(table.getHeader())
//    state.getDexData().setData(table.getData())
//
//    return state
//  }
//
//  public Node getConfig() {
//    if (configPane == null) {
//      configPane = new MigPane("", "[][grow]", "[][grow][]")
//      configPane.setStyle("-fx-background-color: white;")
//
//      Button loadButton = new Button("Load")
//      loadButton.setOnAction(new ReflectiveActionEventHandler(this, "load"))
//
//      Button saveButton = new Button("Save")
//      saveButton.setOnAction(new ReflectiveActionEventHandler(this, "save"))
//
//      configPane.add(NodeFactory.createTitle("TMI Script"), "grow,span")
//      configPane.add(wv, "align left,span,grow")
//
//      def bindings = [
//        'mode'     : 'sql',
//        'mime'     : 'text/x-mysql',
//        'theme'    : 'eclipse'
//      ]
//      editor = new CodeMirrorEditor(we, bindings, tmiCode)
//
//      configPane.add(loadButton)
//      configPane.add(saveButton)
//    }
//
//    return configPane
//  }
//
//  public load(ActionEvent evt) {
//    try {
//      File loadFile = tmiChooser.load(evt)
//
//      if (loadFile != null) {
//        editor.setEditorContent(FileUtils.readFileToString(loadFile))
//      }
//    }
//    catch(Exception ex) {
//      ex.printStackTrace()
//    }
//  }
//
//  public save(ActionEvent evt) {
//    try {
//      File saveFile = tmiChooser.save(evt)
//
//      if (saveFile != null) {
//        FileUtils.writeStringToFile(saveFile, tmiCode.getValue())
//      }
//    }
//    catch(Exception ex) {
//      ex.printStackTrace()
//    }
//  }
//}
