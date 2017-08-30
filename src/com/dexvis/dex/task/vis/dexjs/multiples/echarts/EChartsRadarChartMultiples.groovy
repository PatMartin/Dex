package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsRadarChartMultiples extends WebTask {
  public EChartsRadarChartMultiples() {
    super("Visualization: Multiples", "ECharts Radar Chart Multiples",
      "visualization/dexjs/multiples/echarts/RadarChartMultiples.html",
      "web/dexjs/multiples/echarts/RadarChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
