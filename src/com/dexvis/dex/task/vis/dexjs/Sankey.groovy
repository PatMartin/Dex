package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class Sankey extends WebTask {
  public Sankey() {
    super("Visualization: Dex JS", "Sankey Diagram",
      "visualization/dexjs/SankeyDiagram.html",
      "web/dexjs/d3/Sankey.gtmpl")

    setSaveDynamic(true)
  }
}
