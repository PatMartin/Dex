package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class EChartsBubbleChart extends WebTask {
  public EChartsBubbleChart() {
    super("Visualization: ECharts", "ECharts Bubble Chart",
      "visualization/dexjs/echarts/BubbleChart.html",
      "web/dexjs/echarts/BubbleChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
