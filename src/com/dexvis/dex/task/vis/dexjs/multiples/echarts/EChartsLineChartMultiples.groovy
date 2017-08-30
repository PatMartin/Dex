package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsLineChartMultiples extends WebTask {
  public EChartsLineChartMultiples() {
    super("Visualization: Multiples", "ECharts Line Chart Multiples",
      "visualization/dexjs/multiples/echarts/LineChartMultiples.html",
      "web/dexjs/multiples/echarts/LineChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
