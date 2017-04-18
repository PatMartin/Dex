package com.dexvis.dex.task.vis.elegans

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class ElegansScatterPlot extends WebTask {
  public ElegansScatterPlot() {
    super("Visualization: Elegans", "Elegans Scatter Plot",
      "visualization/dexjs/elegans/ScatterPlot.html",
      "web/dexjs/elegans/ScatterPlot.gtmpl")
    
    setSaveDynamic(true)
  }
}
