package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class RadialTree extends WebTask {
  public RadialTree() {
    super("Visualization: Dex JS", "Radial Tree",
    "visualization/dexjs/RadialTree.html",
    "web/dexjs/d3/RadialTree.gtmpl")
    
    setSaveDynamic(true)
  }
}
