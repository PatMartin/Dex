package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsPieChart extends WebTask {
  public EChartsPieChart() {
    super("Visualization: ECharts", "ECharts Pie Chart",
      "visualization/dexjs/echarts/PieChart.html",
      "web/dexjs/echarts/PieChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
