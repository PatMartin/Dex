package com.dexvis.dex.task.vis.prefuse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.swing.JFrame;

import org.simpleframework.xml.Root;

import prefuse.data.Graph;
import prefuse.data.Schema;
import prefuse.data.Tree;

import com.dexvis.dex.exception.DexException;
import com.dexvis.dex.wf.DexTask;
import com.dexvis.dex.wf.DexTaskState;

@Root
public class PrefuseTreeView extends DexTask
{
  public PrefuseTreeView()
  {
    super();
    setCategory("Visualization: Prefuse");
    setName("Prefuse Tree View");
    setHelpFile("visualization/prefuse/PrefuseTreeView.html");
  }

  public void connect(Graph g, prefuse.data.Node parent,
      Map<String, Map> connectionMap)
  {
    for (String key : connectionMap.keySet())
    {
      prefuse.data.Node node = g.addNode();
      node.setString(0, key);
      g.addEdge(parent, node);
      connect(g, node, connectionMap.get(key));
    }
  }

  @Override
  public DexTaskState execute(DexTaskState state) throws DexException
  {
    JFrame frame = new JFrame("Prefuse Tree View");

    Tree t = new Tree();
    Schema graphSchema = new Schema();
    graphSchema.addColumn("label", String.class, "");
    // g.addColumns(graphSchema);
    t.addColumns(graphSchema);

    Map<String, Map> rootMap = new TreeMap<String, Map>();
    rootMap = new TreeMap<String, Map>();
    Map<String, Map> curMap;
    List<String> curRow;
    String curCol;

    for (int row = 0; row < state.getDexData().getData().size(); row++)
    {
      curMap = rootMap;

      for (int col = 0; col < state.getDexData().getHeader().size(); col++)
      {
        curRow = state.getDexData().getData().get(row);
        if (curRow != null)
        {
          curCol = curRow.get(col);
          if (curCol != null)
          {
            if (!curMap.containsKey(curCol))
            {
              Map<String, Map> newMap = new HashMap<String, Map>();
              curMap.put(curCol, newMap);
            }
            curMap = curMap.get(curCol);
          }
        }
      }
    }

    System.out.println("MAP: " + rootMap);

    // Create the nodes:
    prefuse.data.Node rootNode = t.addNode();
    rootNode.setString(0, state.getDexData().getHeader().get(0));

    connect(t, rootNode, rootMap);

    System.out.println("Creating tree view...");
    prefuse.demos.TreeView rgv = new prefuse.demos.TreeView(t, "label");
    System.out.println("Created tree view...");

    frame.add(rgv);
    System.out.println("Added to frame...");

    frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    frame.setSize(800, 800);
    frame.setVisible(true);
    return state;
  }

  public String toString()
  {
    return getName();
  }
}
