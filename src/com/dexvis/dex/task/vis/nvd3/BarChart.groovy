package com.dexvis.dex.task.vis.nvd3

import javafx.scene.Node

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class BarChart extends WebTask
{
  public BarChart()
  {
    super("Visualization: NVD3", "BarChart",
      "visualization/nvd3/BarChart.html",
      "web/nvd3/BarChart.gtmpl")
  }
}
