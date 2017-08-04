package com.dexvis.dex.task.vis.dexjs.multiples.d3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class TreemapBarChartMultiples extends WebTask
{
  public TreemapBarChartMultiples()
  {
    super("Visualization: Multiples", "D3 Treemap Bar Chart Multiples",
      "visualization/dexjs/multiples/d3/TreemapBarChartMultiples.html",
      "web/dexjs/multiples/d3/TreemapBarChartMultiples.gtmpl")
    setSaveDynamic(true)
  }
}
