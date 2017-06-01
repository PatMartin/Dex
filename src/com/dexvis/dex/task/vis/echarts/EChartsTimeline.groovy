package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsTimeline extends WebTask {
  public EChartsTimeline() {
    super("Visualization: ECharts", "ECharts Timeline",
      "visualization/dexjs/echarts/Timeline.html",
      "web/dexjs/echarts/Timeline.gtmpl")
    
    setSaveDynamic(true)
  }
}
