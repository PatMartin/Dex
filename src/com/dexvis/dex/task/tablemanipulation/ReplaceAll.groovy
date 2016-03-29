package com.dexvis.dex.task.tablemanipulation

import javafx.scene.Node
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.image.Image

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexEnvironment
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class ReplaceAll extends DexTask
{
  private MigPane configPane = null

  @Element(name="replace", required=false)
  private TextField replaceText = new TextField()

  @Element(name="with", required=false)
  private TextField withText = new TextField()

  /**
   * 
   * Override the default constructor to provide this component's name, category and help file.
   * Report that it has been constructed.
   * 
   */
  public ReplaceAll()
  {
    super("Table Manipulation", "Replace All", "table_manipulation/ReplaceAll.html")
  }

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    DexEnvironment env = DexEnvironment.getInstance()
    
    def replaceStr = env.interpolate(replaceText.getText())
    def withStr = env.interpolate(withText.getText())
    
    state.dexData.header = state.dexData.header.collect
    { header ->
      header.replaceAll(replaceStr, withStr)
    }

    state.dexData.data = state.dexData.data.collect
    { row ->
      row.collect
      { col -> col.replaceAll(replaceStr, withStr) }
    }

    return state
  }

  public Node getConfig()
  {

    if (configPane == null)
    {
      configPane = new MigPane("", "[][grow]", "[][][]")
      configPane.setStyle("-fx-background-color: white;")

      configPane.add(NodeFactory.createTitle("Replace All"), "grow,span")
      configPane.add(new Label("Replacement Regular Expression:"))
      configPane.add(replaceText, "grow, span")
      configPane.add(new Label("Replacement Text:"))
      configPane.add(withText, "grow, span")
    }

    return configPane
  }
}
