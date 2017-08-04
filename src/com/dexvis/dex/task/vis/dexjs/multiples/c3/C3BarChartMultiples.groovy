package com.dexvis.dex.task.vis.dexjs.multiples.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class C3BarChartMultiples extends WebTask {
  public C3BarChartMultiples() {
    super("Visualization: Multiples", "C3 Bar Chart Multiples",
      "visualization/dexjs/multiples/c3/BarChartMultiples.html",
      "web/dexjs/multiples/c3/BarChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
