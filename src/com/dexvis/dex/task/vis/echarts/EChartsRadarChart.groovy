package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsRadarChart extends WebTask {
  public EChartsRadarChart() {
    super("Visualization: ECharts", "ECharts Radar Chart",
      "visualization/dexjs/echarts/RadarChart.html",
      "web/dexjs/echarts/RadarChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
