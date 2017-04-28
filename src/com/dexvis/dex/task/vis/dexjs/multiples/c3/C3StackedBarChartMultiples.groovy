package com.dexvis.dex.task.vis.dexjs.multiples.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class C3StackedBarChartMultiples extends WebTask {
  public C3StackedBarChartMultiples() {
    super("Visualization: Dex JS", "C3 Stacked Bar Chart Multiples",
      "visualization/dexjs/multiples/c3/StackedBarChartMultiples.html",
      "web/dexjs/multiples/c3/StackedBarChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
