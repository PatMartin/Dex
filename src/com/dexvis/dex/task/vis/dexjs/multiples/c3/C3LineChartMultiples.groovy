package com.dexvis.dex.task.vis.dexjs.multiples.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class C3LineChartMultiples extends WebTask {
  public C3LineChartMultiples() {
    super("Visualization: Dex JS", "C3 Line Chart Multiples",
      "visualization/dexjs/multiples/c3/LineChartMultiples.html",
      "web/dexjs/multiples/c3/LineChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
