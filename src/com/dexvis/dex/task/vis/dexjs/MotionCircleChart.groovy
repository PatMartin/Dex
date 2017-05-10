package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class MotionCircleChart extends WebTask {
  public MotionCircleChart() {
    super("Visualization: Dex JS", "Motion Circle Chart",
      "visualization/dexjs/MotionCircleChart.html",
      "web/dexjs/d3/MotionCircleChart.gtmpl")

    setSaveDynamic(true)
  }
}
