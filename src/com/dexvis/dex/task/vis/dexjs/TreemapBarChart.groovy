package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class TreemapBarChart extends WebTask
{
  public TreemapBarChart()
  {
    super("Visualization: Dex JS", "Treemap Bar Chart",
      "visualization/dexjs/TreemapBarChart.html",
      "web/dexjs/d3/TreemapBarChart.gtmpl")
    setSaveDynamic(true)
  }
}
