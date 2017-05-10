package com.dexvis.dex.task.vis.dexjs.multiples.d3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class ParallelCoordinatesMultiples extends WebTask {
  public ParallelCoordinatesMultiples() {
    super("Visualization: Dex JS", "Parallel Coordinates Multiples",
    "visualization/dexjs/multiples/d3/ParallelCoordinatesMultiples.html",
    "web/dexjs/multiples/d3/ParallelCoordinatesMultiples.gtmpl")

    setSaveDynamic(true)
  }
}
