package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsSteamGraphMultiples extends WebTask {
  public EChartsSteamGraphMultiples() {
    super("Visualization: Multiples", "ECharts Steam Graph Multiples",
      "visualization/dexjs/multiples/echarts/SteamGraphMultiples.html",
      "web/dexjs/multiples/echarts/SteamGraphMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
