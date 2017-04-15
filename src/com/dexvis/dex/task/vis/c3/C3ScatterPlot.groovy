package com.dexvis.dex.task.vis.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class C3ScatterPlot extends WebTask {
  public C3ScatterPlot() {
    super("Visualization: C3", "C3 Scatter Plot",
      "visualization/dexjs/c3/ScatterPlot.html",
      "web/dexjs/c3/ScatterPlot.gtmpl")
    setSaveDynamic(true)
  }
}
