package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsPieChartMultiples extends WebTask {
  public EChartsPieChartMultiples() {
    super("Visualization: Multiples", "ECharts Pie Chart Multiples",
      "visualization/dexjs/multiples/echarts/PieChartMultiples.html",
      "web/dexjs/multiples/echarts/PieChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
