package com.dexvis.dex.task.vis.c3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class StackedBarChart extends WebTask
{
  public StackedBarChart()
  {
    super("Visualization: C3", "Stacked Bar Chart",
      "visualization/c3/StackedBarChart.html",
      "web/c3/StackedBarChart.gtmpl")
    setSaveDynamic(true)
  }
}
