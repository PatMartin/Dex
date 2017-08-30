package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsNetworkMultiples extends WebTask {
  public EChartsNetworkMultiples() {
    super("Visualization: Multiples", "ECharts Network Multiples",
      "visualization/dexjs/multiples/echarts/NetworkMultiples.html",
      "web/dexjs/multiples/echarts/NetworkMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
