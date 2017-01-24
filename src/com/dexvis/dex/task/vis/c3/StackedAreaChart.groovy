package com.dexvis.dex.task.vis.c3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class StackedAreaChart extends WebTask
{
  public StackedAreaChart()
  {
    super("Visualization: C3", "Stacked Area Chart",
      "visualization/c3/StackedAreaChart.html",
      "web/c3/StackedAreaChart.gtmpl")
    setSaveDynamic(true)
  }
}
