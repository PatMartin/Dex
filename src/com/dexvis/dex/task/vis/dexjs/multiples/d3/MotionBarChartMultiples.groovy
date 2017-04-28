package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class MotionBarChartMultiples extends WebTask {
  public MotionBarChartMultiples() {
    super("Visualization: Dex JS", "Motion Bar Chart Multiples",
      "visualization/dexjs/multiples/MotionBarChartMultiples.html",
      "web/dexjs/d3/MotionBarChartMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
