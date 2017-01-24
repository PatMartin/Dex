package com.dexvis.dex.task.vis.dexcharts.google

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class DiffPieChart extends WebTask
{
  public DiffPieChart()
  {
    super("Visualization : Google", "Diff Pie Chart",
      "visualization/google/DiffPieChart.html",
      "web/dexcharts/google/DiffPieChart.gtmpl")
    setSaveDynamic(true)
  }
}
