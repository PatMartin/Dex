package com.dexvis.dex.task.vis.dexcharts.google

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class DiffBarChart extends WebTask
{
  public DiffBarChart()
  {
    super("Visualization : Google", "Diff Bar Chart",
      "visualization/google/DiffBarChart.html",
      "web/dexcharts/google/DiffBarChart.gtmpl")
    setSaveDynamic(true)
  }
}
