package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsSingleAxisScatterPlotMultiples extends WebTask {
  public EChartsSingleAxisScatterPlotMultiples() {
    super("Visualization: Multiples", "ECharts SA Scatter Plot Multiples",
      "visualization/dexjs/multiples/echarts/SingleAxisScatterPlotMultiples.html",
      "web/dexjs/multiples/echarts/SingleAxisScatterPlotMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
