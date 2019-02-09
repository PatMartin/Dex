package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsHeatMap extends WebTask {
  public EChartsHeatMap() {
    super("Visualization: ECharts", "ECharts HeatMap",
      "visualization/dexjs/echarts/HeatMap.html",
      "web/dexjs/echarts/HeatMap.gtmpl")
    
    setSaveDynamic(true)
  }
}
