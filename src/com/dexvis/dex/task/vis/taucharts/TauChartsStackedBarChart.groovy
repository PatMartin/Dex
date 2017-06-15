package com.dexvis.dex.task.vis.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class TauChartsStackedBarChart extends WebTask {
  public TauChartsStackedBarChart() {
    super("Visualization: TauCharts", "TauCharts Stacked Bar Chart",
      "visualization/dexjs/taucharts/StackedBarChart.html",
      "web/dexjs/taucharts/StackedBarChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
