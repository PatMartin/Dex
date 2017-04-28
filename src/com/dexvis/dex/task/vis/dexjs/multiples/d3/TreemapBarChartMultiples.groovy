package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class TreemapBarChartMultiples extends WebTask
{
  public TreemapBarChartMultiples()
  {
    super("Visualization: Dex JS", "Treemap Bar Chart Multiples",
      "visualization/dexjs/multiples/TreemapBarChartMultiples.html",
      "web/dexjs/multiples/TreemapBarChartMultiples.gtmpl")
    setSaveDynamic(true)
  }
}
