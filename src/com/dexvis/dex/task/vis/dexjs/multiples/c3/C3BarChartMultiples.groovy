package com.dexvis.dex.task.vis.dexjs.multiples.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class C3BarChartMultiples extends WebTask {
  public C3BarChartMultiples() {
    super("Visualization: Dex JS", "C3 Bar Chart Multiples",
      "visualization/dexjs/multiples/c3/BarChartMultiples.html",
      "web/dexjs/multiples/c3/BarChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
