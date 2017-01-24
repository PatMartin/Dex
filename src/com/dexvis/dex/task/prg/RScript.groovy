package com.dexvis.dex.task.prg

import javafx.beans.property.SimpleStringProperty
import javafx.beans.property.StringProperty
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.image.Image
import javafx.scene.web.WebEngine
import javafx.scene.web.WebView
import javafx.stage.FileChooser
import javafx.stage.FileChooser.ExtensionFilter

import org.apache.commons.io.FileUtils
import org.rosuda.REngine.REXP
import org.rosuda.REngine.REXPDouble
import org.rosuda.REngine.REXPGenericVector
import org.rosuda.REngine.REXPInteger
import org.rosuda.REngine.REXPString
import org.rosuda.REngine.RList
import org.rosuda.REngine.Rserve.RConnection
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.scene.control.NodeFactory
import com.dexvis.javafx.scene.control.editor.CodeMirrorEditor

@Root(name="rscript")
class RScript extends DexTask {
  private WebView wv = new WebView()
  private WebEngine we = wv.getEngine()

  private MigPane configPane = null

  @Element(name="rCode", required=false)
  private StringProperty rCode = new SimpleStringProperty("")

  private CodeMirrorEditor editor = null;

  public RScript() {
    super("Programming", "R Script", "programming/RScript.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }

  public DexTaskState execute(DexTaskState state) throws DexException {
    RConnection rcon = null

    try {
      rcon = new RConnection()

      Map<String, List<String>> colMap = state.dexData.getColumnMap()

      RList inputList = new RList()

      colMap.each { name, slist ->
        println "Assigning: $name = ${slist}"
        try {
          inputList.put(name, new REXPDouble(slist.toArray(new Double[slist.size()])))
        }
        catch (Exception ex) {
          ex.printStackTrace()
          inputList.put(name, new REXPString(slist.toArray(new String[slist.size()])))
        }
      }

      if (state.dexData.data.size() > 0) {
        rcon.assign("data", REXP.createDataFrame(inputList))
      }

      //rcon.assign("dex", new REXPList(inputList))

      //rcon.assign("data", ddata)
      println "Calling Engine"

      rcon.assign(".tmp.", rCode.getValue())
      REXP rexp = rcon.parseAndEval("try(eval(parse(text=.tmp.)),silent=TRUE)");

      //REXP rexp = rcon.parseAndEval("try("+ rCode + ",silent=TRUE)");

      if (rexp.inherits("try-error"))
      {
        throw new DexException("Error: '${rexp.asString()}'");
      }

      println "Engine Result: $rexp"

      def header = []
      def data = []

      if (rexp instanceof REXPGenericVector)
      {
        REXPGenericVector frame = (REXPGenericVector) rexp
        Object obj = frame.asList()
        println obj
        println "FrameAsListClass: ${obj.getClass()}"

        if (obj instanceof RList)
        {
          RList rlist = (RList) obj

          for (String key : rlist.keys())
          {
            header << key

            Object rlobj = rlist.get(key)

            println "KEY: '$key' = ${rlist.get(key)}"

            int ri = 0

            if (rlobj instanceof REXPString)
            {
              for (String value : ((REXPString) rlobj).asStrings())
              {
                if (ri < data.size())
                {
                  data[ri++] << "" + value
                }
                else
                {
                  data[ri++] = ["" + value]
                }
              }
            }
            else if (rlobj instanceof REXPDouble)
            {
              for (Double value : ((REXPDouble) rlobj).asDoubles())
              {
                if (ri < data.size())
                {
                  data[ri++] << "" + value
                }
                else
                {
                  data[ri++] = ["" + value]
                }
              }
            }
            else if (rlobj instanceof REXPInteger)
            {
              for (Double value : ((REXPInteger) rlobj).asIntegers())
              {
                if (ri < data.size())
                {
                  data[ri++] << "" + value
                }
                else
                {
                  data[ri++] = ["" + value]
                }
              }
            }
          }
          println rlist
        }
      }

      state.dexData.header = header
      state.dexData.data = data

      //println "HEADER: ${rlist.at('header').asStrings()}"
      //println "DATA  : ${rlist.at('data').asStrings()}"
    }
    finally
    {
      if (rcon != null)
      {
        rcon.close()
      }
    }
    return state
  }

  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[][grow]", "[][grow][]")
      configPane.setStyle("-fx-background-color: white;")

      Button loadButton = new Button("Load R Script")
      loadButton.setOnAction(new ReflectiveActionEventHandler(this, "load"))

      Button saveButton = new Button("Save R Script")
      saveButton.setOnAction(new ReflectiveActionEventHandler(this, "save"))

      configPane.add(NodeFactory.createTitle("R Script"), "grow,span")
      configPane.add(wv, "align left,span,grow")

      def bindings = [
        'mode'     : 'r',
        'mime'     : 'text/x-rsrc',
        'theme'    : 'eclipse'
      ]
      editor = new CodeMirrorEditor(we, bindings, rCode)

      configPane.add(loadButton)
      configPane.add(saveButton, "span")
    }

    return configPane
  }

  public load(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Load R Script")

      File startDir = new File(new File("scripts/r").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("R", "*.R"))

      File loadFile = fc.showOpenDialog(null)

      if (loadFile != null)
      {
        editor.setEditorContent(FileUtils.readFileToString(loadFile))
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public save(ActionEvent evt)
  {
    try
    {
      FileChooser fc = new FileChooser()
      fc.setTitle("Save R Script")

      File startDir = new File(new File("scripts/r").getCanonicalPath())
      fc.setInitialDirectory(startDir)
      fc.getExtensionFilters().addAll(new ExtensionFilter("R", "*.R"))

      File saveFile = fc.showSaveDialog(null)

      if (!saveFile.getCanonicalPath().endsWith(".R"))
      {
        saveFile = new File(saveFile.getCanonicalPath() + ".R");
      }

      if (saveFile != null)
      {
        FileUtils.writeStringToFile(saveFile, getCode())
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  //  public static main(args)
  //  {
  //    RConnection rcon = new RConnection()
  //    String rcode = """
  //library(psych)
  //#gc <- read.table("C:/edu/stats/gc.csv", header = T, sep=",")
  //gc
  //"""
  //
  //    RList inputList = new RList()
  //    REXPDouble dlist = new REXPDouble(1)
  //
  //    double[] x = [ 1, 2 ]
  //
  //    inputList.put("x", new REXPDouble(x))
  //    rcon.assign("data", REXP.createDataFrame(inputList))
  //
  //    REXP rexp = rcon.eval(rcode)
  //    if (rexp instanceof REXPGenericVector)
  //    {
  //      REXPGenericVector frame = (REXPGenericVector) rexp
  //      Object obj = frame.asList()
  //      println obj
  //      println "FrameAsListClass: ${obj.getClass()}"
  //
  //      if (obj instanceof RList)
  //      {
  //        RList rlist = (RList) obj
  //
  //        for (String key : rlist.keys())
  //        {
  //          println "KEY: '$key' = ${rlist.get(key)}"
  //        }
  //        println rlist
  //      }
  //    }
  //    println "Engine Result: $rexp"
  //    rcon.close()
  //  }
}
