package com.dexvis.dex.task.vis.dexjs.multiples.d3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class MotionBarChartMultiples extends WebTask {
  public MotionBarChartMultiples() {
    super("Visualization: Dex JS", "Motion Bar Chart Multiples",
      "visualization/dexjs/multiples/d3/MotionBarChartMultiples.html",
      "web/dexjs/d3/d3/MotionBarChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
