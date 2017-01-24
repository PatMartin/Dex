package com.dexvis.dex.task.vis.c3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class LineChartMultiples extends WebTask
{
  public LineChartMultiples()
  {
    super("Visualization: C3", "Line Chart Multiples",
      "visualization/c3/LineChartMultiples.html",
      "web/c3/LineChartMultiples.gtmpl")
    setSaveDynamic(true)
  }
}
