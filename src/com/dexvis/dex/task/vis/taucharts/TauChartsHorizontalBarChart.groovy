package com.dexvis.dex.task.vis.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class TauChartsHorizontalBarChart extends WebTask {
  public TauChartsHorizontalBarChart() {
    super("Visualization: TauCharts", "TauCharts Horizontal Bar Chart",
      "visualization/dexjs/taucharts/HorizontalBarChart.html",
      "web/dexjs/taucharts/HorizontalBarChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
