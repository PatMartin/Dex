package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsPolarPlot extends WebTask {
  public EChartsPolarPlot() {
    super("Visualization: ECharts", "ECharts Polar Plot",
      "visualization/dexjs/echarts/PolarPlot.html",
      "web/dexjs/echarts/PolarPlot.gtmpl")
    
    setSaveDynamic(true)
  }
}
