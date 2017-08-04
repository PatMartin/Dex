package com.dexvis.dex.task.vis.dexjs.multiples.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class C3ScatterPlotMultiples extends WebTask {
  public C3ScatterPlotMultiples() {
    super("Visualization: Multiples", "C3 Scatter Plot Multiples",
      "visualization/dexjs/multiples/c3/ScatterPlotMultiples.html",
      "web/dexjs/multiples/c3/ScatterPlotMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
