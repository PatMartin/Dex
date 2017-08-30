package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsBarChart3DMultiples extends WebTask {
  public EChartsBarChart3DMultiples() {
    super("Visualization: Multiples", "ECharts Bar Chart 3D Multiples",
      "visualization/dexjs/multiples/echarts/BarChart3DMultiples.html",
      "web/dexjs/multiples/echarts/BarChart3DMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
