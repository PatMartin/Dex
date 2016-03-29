package com.dexvis.dex.task.vis.prefuse;

import java.util.HashMap;
import java.util.Map;

import javax.swing.JFrame;

import org.simpleframework.xml.Root;

import prefuse.data.Graph;
import prefuse.data.Schema;
import ca.utoronto.cs.prefuseextensions.demo.StarburstDemo;

import com.dexvis.dex.exception.DexException;
import com.dexvis.dex.wf.DexTask;
import com.dexvis.dex.wf.DexTaskState;

@Root
public class PrefuseStarburst extends DexTask
{
  public PrefuseStarburst()
  {
    super();
    setCategory("Visualization: Prefuse");
    setName("Prefuse Starburst");
    setHelpFile("visualization/prefuse/PrefuseStarburst.html");
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
    JFrame frame = new JFrame("Starburst");

    Graph g = new Graph();
    Schema graphSchema = new Schema();
    graphSchema.addColumn("label", String.class, "");
    g.addColumns(graphSchema);

    Map<String, Map> rootMap = new HashMap<String, Map>();
    rootMap = new HashMap<String, Map>();
    Map<String, Map> curMap;

    for (int row = 0; row < state.getDexData().getData().size(); row++)
    {
      curMap = rootMap;

      for (int col = 0; col < state.getDexData().getHeader().size(); col++)
      {
        if (!curMap.containsKey(state.getDexData().getData().get(row).get(col)))
        {
          Map<String, Map> newMap = new HashMap<String, Map>();
          curMap.put(state.getDexData().getData().get(row).get(col), newMap);
        }

        curMap = curMap.get(state.getDexData().getData().get(row).get(col));
      }
    }

    System.out.println("MAP: " + rootMap);

    // Create the nodes:
    prefuse.data.Node rootNode = g.addNode();
    rootNode.setString(0, state.getDexData().getHeader().get(0));

    connect(g, rootNode, rootMap);

    StarburstDemo starburst = new StarburstDemo(g, "label");

    frame.add(starburst);

    frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    frame.setSize(800, 800);
    frame.setVisible(true);
    return state;
  }
}
