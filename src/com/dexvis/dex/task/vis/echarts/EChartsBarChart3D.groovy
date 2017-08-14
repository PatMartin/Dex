package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsBarChart3D extends WebTask {
  public EChartsBarChart3D() {
    super("Visualization: ECharts", "ECharts BarChart 3D",
      "visualization/dexjs/echarts/BarChart3D.html",
      "web/dexjs/echarts/BarChart3D.gtmpl")
    
    setSaveDynamic(true)
  }
}
