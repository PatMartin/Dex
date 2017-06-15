package com.dexvis.dex.task.vis.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class TauChartsLineChart extends WebTask {
  public TauChartsLineChart() {
    super("Visualization: TauCharts", "TauCharts LineChart",
      "visualization/dexjs/taucharts/LineChart.html",
      "web/dexjs/taucharts/LineChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
