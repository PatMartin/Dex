package com.dexvis.dex.task.vis.dexjs.multiples.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class C3DonutChartMultiples extends WebTask {
  public C3DonutChartMultiples() {
    super("Visualization: Multiples", "C3 Donut Chart Multiples",
      "visualization/dexjs/multiples/c3/DonutChartMultiples.html",
      "web/dexjs/multiples/c3/DonutChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
