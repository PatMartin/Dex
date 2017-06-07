package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsSingleAxisScatterPlot extends WebTask {
  public EChartsSingleAxisScatterPlot() {
    super("Visualization: ECharts", "ECharts Single Axis ScatterPlot",
      "visualization/dexjs/echarts/SingleAxisScatterPlot.html",
      "web/dexjs/echarts/SingleAxisScatterPlot.gtmpl")
    
    setSaveDynamic(true)
  }
}
