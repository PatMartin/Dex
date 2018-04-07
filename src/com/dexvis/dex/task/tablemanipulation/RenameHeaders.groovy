package com.dexvis.dex.task.tablemanipulation

import javafx.event.EventHandler
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.ScrollPane
import javafx.scene.control.TextField

import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.scene.control.NodeFactory

@Root(name="rename-headers")
class RenameHeaders extends DexTask {
  private MigPane configPane = null
  private MigPane headerMappingPane = new MigPane("", "[][]")
  
  @Element(name="headerMappings", required=false)
  private Map<String, String> headerMappings = new HashMap<String, String>()
  
  public RenameHeaders() {
    super("Table Manipulation", "Rename Headers", "table_manipulation/RenameHeaders.html")
  }
  
  public DexTaskState execute(DexTaskState state) throws DexException {
    
    if (headerMappings.size() <= 0) {
      state.dexData.header.each { hdr ->
        headerMappings[hdr] = hdr
      }
      renderMappings()
    }
    // Else, we're actively renaming headers.
    else {
      def children = headerMappingPane.getChildren()
      // update headerMappings with any ui changes.
      headerMappings.clear()
      for (int i=0; i<children.size(); i+=2) {
        headerMappings[children[i].getText()] = children[i+1].getText()
      }
      state.dexData.header.eachWithIndex { hdr, hi ->
        if (headerMappings.containsKey(hdr)) {
          state.dexData.header[hi] = headerMappings.get(hdr)
        }
      }
    }
    
    return state
  }
  
  private void renderMappings() {
    headerMappingPane.getChildren().removeAll()
    headerMappings.keySet().sort().each { key ->
      Label lbl = new Label(key)
      TextField tf = new TextField(headerMappings[key])
      headerMappingPane.add(lbl)
      headerMappingPane.add(tf, "span")
    }
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("insets 0", "[][grow]", "[][grow][]")
      configPane.setStyle("-fx-background-color: white;")
      
      configPane.add(NodeFactory.createTitle("Rename Headers"), "grow,span")
      renderMappings()
      
      ScrollPane scrollPane = new ScrollPane()
      scrollPane.setContent(headerMappingPane)
      
      configPane.add(scrollPane, "grow, span")
      Button clearButton = new Button("Clear")
      configPane.add(clearButton, "grow, span")
      
      clearButton.setOnAction({ actionEvent ->
        headerMappingPane.getChildren().clear()
        headerMappings.clear()
      } as EventHandler);
    }
    
    return configPane
  }
}
