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
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.ModalDialog
import com.dexvis.javafx.scene.control.NodeFactory
import com.thoughtworks.xstream.annotations.XStreamOmitField;

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class AddColumn extends DexTask {
  // Used to store our configuration pane.
  @XStreamOmitField
  private MigPane configPane = null

  @Element(name="colName", required=false)
  @XStreamOmitField
  private TextField colNameText = new TextField("")
  @Element(name="colValue", required=false)
  @XStreamOmitField
  private TextField colValueText = new TextField("")

  /**
   * 
   * Override the default constructor to provide this component's name, category and help file.
   * Report that it has been constructed.
   * 
   */
  public AddColumn()
  {
    super("Table Manipulation", "Add Column", "table_manipulation/AddColumn.html")
    getMetaData().setTaskExecutionUpdatesUI(false)
  }

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    println "Running: $name - Adding Column: '${colNameText.getText()}'"

    try
    {
      ((ArrayList<String>) state.dexData.header) << colNameText.getText()
      for (ArrayList<String> row : state.dexData.data)
      {
        row.add(colValueText.getText())
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
      configPane = new MigPane("insets 0", "[][grow]", "[][][][][]")
      configPane.setStyle("-fx-background-color: white;")

      configPane.add(NodeFactory.createTitle("Add Column Configuration"), "grow,span")
      configPane.add(new Label("Column Name: "))
      configPane.add(colNameText, "grow,span")
      configPane.add(new Label("Column Value: "))
      configPane.add(colValueText, "grow,span")
    }

    return configPane
  }
}
