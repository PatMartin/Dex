package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsNetwork extends WebTask {
  public EChartsNetwork() {
    super("Visualization: ECharts", "ECharts Network",
      "visualization/dexjs/echarts/Network.html",
      "web/dexjs/echarts/Network.gtmpl")
    
    setSaveDynamic(true)
  }
}
