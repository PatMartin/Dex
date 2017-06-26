package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsSteamGraph extends WebTask {
  public EChartsSteamGraph() {
    super("Visualization: ECharts", "ECharts Steam Graph",
      "visualization/dexjs/echarts/SteamGraph.html",
      "web/dexjs/echarts/SteamGraph.gtmpl")
    
    setSaveDynamic(true)
  }
}
