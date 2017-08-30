package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsPolarPlotMultiples extends WebTask {
  public EChartsPolarPlotMultiples() {
    super("Visualization: Multiples", "ECharts Polar Plot Multiples",
      "visualization/dexjs/multiples/echarts/PolarPlotMultiples.html",
      "web/dexjs/multiples/echarts/PolarPlotMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
