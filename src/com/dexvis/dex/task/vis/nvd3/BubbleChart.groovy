package com.dexvis.dex.task.vis.nvd3

import javafx.scene.Node

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class BubbleChart extends WebTask
{
  public BubbleChart()
  {
    super("Visualization: NVD3", "BubbleChart",
      "visualization/nvd3/BubbleChart.html",
      "web/nvd3/BubbleChart.gtmpl")
  }
}