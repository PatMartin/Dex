package com.dexvis.dex.task.vis.prefuse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javafx.scene.Node;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;

import javax.swing.JFrame;

import org.simpleframework.xml.Root;

import prefuse.data.Graph;
import prefuse.data.Schema;

import com.dexvis.dex.exception.DexException;
import com.dexvis.dex.wf.DexTask;
import com.dexvis.dex.wf.DexTaskState;

@Root
public class PrefuseRadialGraphView extends DexTask
{
  public PrefuseRadialGraphView()
  {
    super();
    setCategory("Visualization: Prefuse");
    setName("Prefuse Radial Graph View");
    setHelpFile("visualization/prefuse/PrefuseRadialGraphView.html");
  }

  @Override
  public DexTaskState execute(DexTaskState state) throws DexException
  {
    JFrame frame = new JFrame("Prefuse Radial Graph View");
    frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

    Graph g = new Graph();
    Schema graphSchema = new Schema();
    graphSchema.addColumn("label", String.class, "");
    g.addColumns(graphSchema);

    Map<String, prefuse.data.Node> nodeMap = new HashMap<String, prefuse.data.Node>();

    for (List<String> row : state.getDexData().getData())
    {
      for (String nodeName : row)
      {
        if (!nodeMap.containsKey(nodeName))
        {
          prefuse.data.Node node = g.addNode();
          node.setString(0, nodeName);
          nodeMap.put(nodeName, node);
        }
      }

      for (int i = 1; i < row.size(); i++)
      {
        g.addEdge(nodeMap.get(row.get(i - 1)), nodeMap.get(row.get(i)));
      }

      if (row.size() > 1)
      {
        g.addEdge(nodeMap.get(row.get(0)), nodeMap.get(row.get(row.size() - 1)));
      }
    }

    System.out.println("Creating graph view...");
    prefuse.demos.RadialGraphView rgv = new prefuse.demos.RadialGraphView(g,
        "label");
    System.out.println("Created graph view...");

    frame.add(rgv);

    frame.setSize(1000, 1000);
    frame.setVisible(true);
    return state;
  }

  @Override
  public Node getConfig()
  {
    WebView wv = new WebView();
    WebEngine we = wv.getEngine();
    we.load("file:///C:/Data/eclipse/ws/DataExplorer/JfxDataExplorer/help/ImportCsv.html");
    return wv;
  }
}
