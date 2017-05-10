package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class ParallelCoordinates extends WebTask {
  public ParallelCoordinates() {
    super("Visualization: Dex JS", "Parallel Coordinates",
    "visualization/dexjs/ParallelCoordinates.html",
    "web/dexjs/d3/ParallelCoordinates.gtmpl")
    setSaveDynamic(true)
  }
}
