package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class DygraphLineChart extends WebTask
{
  public DygraphLineChart()
  {
    super("Visualization: Dex Charts", "DyGraph Line Chart",
      "visualization/dex_charts/DygraphLineChart.html",
      "web/dexcharts/DygraphLineChart.gtmpl")
    setSaveDynamic(true)
  }
}
