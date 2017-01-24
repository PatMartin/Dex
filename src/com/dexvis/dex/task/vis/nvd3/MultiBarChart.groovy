package com.dexvis.dex.task.vis.nvd3

import javafx.scene.Node

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class MultiBarChart extends WebTask
{
  public MultiBarChart()
  {
    super("Visualization: NVD3", "MultiBarChart",
      "visualization/nvd3/MultiBarChart.html",
      "web/nvd3/MultiBarChart.gtmpl")
  }
}
