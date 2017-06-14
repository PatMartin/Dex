package com.dexvis.dex.task.vis.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class TauChartsScatterPlot extends WebTask {
  public TauChartsScatterPlot() {
    super("Visualization: TauCharts", "TauCharts ScatterPlot",
      "visualization/dexjs/taucharts/ScatterPlot.html",
      "web/dexjs/taucharts/ScatterPlot.gtmpl")
    
    setSaveDynamic(true)
  }
}
