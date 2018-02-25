package com.dexvis.dex.task.vis.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsParallelCoordinates extends WebTask {
  public EChartsParallelCoordinates() {
    super("Visualization: ECharts", "ECharts Par Coord",
      "visualization/dexjs/echarts/ParallelCoordinates.html",
      "web/dexjs/echarts/ParallelCoordinates.gtmpl")
    
    setSaveDynamic(true)
  }
}
