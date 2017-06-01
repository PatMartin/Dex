package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsLineChart extends WebTask {
  public EChartsLineChart() {
    super("Visualization: ECharts", "ECharts Line Chart",
      "visualization/dexjs/echarts/LineChart.html",
      "web/dexjs/echarts/LineChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
