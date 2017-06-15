package com.dexvis.dex.task.vis.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class TauChartsBarChart extends WebTask {
  public TauChartsBarChart() {
    super("Visualization: TauCharts", "TauCharts Bar Chart",
      "visualization/dexjs/taucharts/BarChart.html",
      "web/dexjs/taucharts/BarChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
