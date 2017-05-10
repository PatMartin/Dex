package com.dexvis.dex.task.vis.dexjs.multiples.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class C3AreaChartMultiples extends WebTask {
  public C3AreaChartMultiples() {
    super("Visualization: Dex JS", "C3 Area Chart Multiples",
      "visualization/dexjs/multiples/c3/AreaChartMultiples.html",
      "web/dexjs/multiples/c3/AreaChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
