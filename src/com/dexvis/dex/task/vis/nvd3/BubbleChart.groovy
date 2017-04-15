package com.dexvis.dex.task.vis.nvd3

import javafx.scene.Node

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class BubbleChart extends WebTask
{
  public BubbleChart()
  {
    super("Visualization: NVD3", "NVD3 Bubble Chart",
      "visualization/nvd3/BubbleChart.html",
      "web/dexjs/nvd3/BubbleChart.gtmpl")
  }
}