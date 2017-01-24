package com.dexvis.dex.task.vis.nvd3

import javafx.scene.Node

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class MultiHorBarChart extends WebTask
{
  public MultiHorBarChart()
  {
    super("Visualization: NVD3", "MultiHorBarChart",
      "visualization/nvd3/MultiHorBarChart.html",
      "web/nvd3/MultiHorBarChart.gtmpl")
  }
}
