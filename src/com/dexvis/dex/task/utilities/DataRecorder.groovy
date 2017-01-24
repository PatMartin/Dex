package com.dexvis.dex.task.utilities

import javafx.scene.Node
import javafx.scene.image.Image

import org.simpleframework.xml.ElementList
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root
class DataRecorder extends DexTask
{
  @ElementList(name="recordedHeader", required=false)
  private List<String> recordedHeader = []
  @ElementList(name="recordedData", required=false)
  private List<List<String>> recordedData = new ArrayList<List<String>>()

  private MigPane configPane = null

  public DataRecorder()
  {
    super("Utilities", "Data Recorder", "utilities/DataRecorder.html")
  }

  public DexTaskState initialize(DexTaskState state) throws DexException
  {
    return execute(state)
  }

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    println "Running: $name"
    if (state.dexData.header && state.dexData.header.size() > 0)
    {
      recordedHeader = state.dexData.header.collect
      { it }
      recordedData = state.dexData.data.collect
      { row ->
        row.collect
        { it } }
    }

    state.dexData.header = recordedHeader
    try
    {
      state.dexData.data = recordedData
    }
    catch (Exception ex)
    {
    }
    return state
  }

  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("insets 1", "[grow]", "[][]")
      configPane.setStyle("-fx-background-color: white;")

      configPane.add(NodeFactory.createTitle("Data Recorder Configuration"), "grow,span")
    }

    return configPane
  }
}
