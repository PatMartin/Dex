package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsTimelineMultiples extends WebTask {
  public EChartsTimelineMultiples() {
    super("Visualization: Multiples", "ECharts Timeline Multiples",
      "visualization/dexjs/multiples/echarts/TimelineMultiples.html",
      "web/dexjs/multiples/echarts/TimelineMultiples.gtmpl")

    setSaveDynamic(true)
  }
}
