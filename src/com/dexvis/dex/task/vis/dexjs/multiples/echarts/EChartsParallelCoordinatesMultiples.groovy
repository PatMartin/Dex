package com.dexvis.dex.task.vis.dexjs.multiples.echarts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class EChartsParallelCoordinatesMultiples extends WebTask {
  public EChartsParallelCoordinatesMultiples() {
    super("Visualization: Multiples", "ECharts Par Coord Multiples",
      "visualization/dexjs/multiples/echarts/ParallelCoordinatesMultiples.html",
      "web/dexjs/multiples/echarts/ParallelCoordinatesMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
