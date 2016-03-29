package com.dexvis.dex.task.vis.dexcharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class Sankey extends WebTask {
  public Sankey() {
    super("Visualization: Dex Charts", "Sankey Diagram",
      "visualization/dex_charts/SankeyDiagram.html",
      "web/dexcharts/Sankey.gtmpl")

    setSaveDynamic(true)
  }
}
