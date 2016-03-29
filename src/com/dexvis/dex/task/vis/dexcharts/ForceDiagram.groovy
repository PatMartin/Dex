package com.dexvis.dex.task.vis.dexcharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class ForceDiagram extends WebTask {
  public ForceDiagram() {
    super("Visualization: Dex Charts", "Force Diagram",
      "visualization/dex_charts/ForceDiagram.html",
      "web/dexcharts/ForceDiagram.gtmpl")
    
    setSaveDynamic(true)
  }
}
