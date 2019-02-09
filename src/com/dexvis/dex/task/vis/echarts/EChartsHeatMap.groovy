package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsTree extends WebTask {
  public EChartsTree() {
    super("Visualization: ECharts", "ECharts Tree",
      "visualization/dexjs/echarts/Tree.html",
      "web/dexjs/echarts/Tree.gtmpl")
    
    setSaveDynamic(true)
  }
}
