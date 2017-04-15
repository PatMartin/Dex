package com.dexvis.dex.task.vis.nvd3

import javafx.scene.Node

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class StackedAreaChart extends WebTask
{
  public StackedAreaChart()
  {
    super("Visualization: NVD3", "NVD3 Stacked Area Chart",
      "visualization/nvd3/StackedAreaChart.html",
      "web/dexjs/nvd3/StackedAreaChart.gtmpl")
    setSaveDynamic(true)
  }
}
