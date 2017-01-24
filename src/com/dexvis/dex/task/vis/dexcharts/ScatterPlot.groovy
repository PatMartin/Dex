package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ScatterPlot extends WebTask
{
  public ScatterPlot()
  {
    super("Visualization: Dex Charts", "ScatterPlot",
      "visualization/dex_charts/Scatterplot.html",
      "web/dexcharts/ScatterPlot.gtmpl")
    setSaveDynamic(true)
  }
}
