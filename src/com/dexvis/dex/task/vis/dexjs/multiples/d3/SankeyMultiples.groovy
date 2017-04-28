package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class SankeyMultiples extends WebTask {
  public SankeyMultiples() {
    super("Visualization: Dex JS", "Sankey Multiples",
      "visualization/dexjs/multiples/SankeyMultiples.html",
      "web/dexjs/multiples/SankeyMultiples.gtmpl")

    setSaveDynamic(true)
  }
}
