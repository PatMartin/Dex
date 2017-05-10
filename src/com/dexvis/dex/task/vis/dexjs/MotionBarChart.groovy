package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class MotionBarChart extends WebTask {
  public MotionBarChart() {
    super("Visualization: Dex JS", "Motion Bar Chart",
      "visualization/dexjs/MotionBarChart.html",
      "web/dexjs/d3/MotionBarChart.gtmpl")

    setSaveDynamic(true)
  }
}
