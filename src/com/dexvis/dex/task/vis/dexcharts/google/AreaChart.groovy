package com.dexvis.dex.task.vis.dexcharts.google

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class AreaChart extends WebTask
{
  public AreaChart()
  {
    super("Visualization: Google", "Area Chart",
      "visualization/google/AreaChart.html",
      "web/google/AreaChart.gtmpl")
  }
}
