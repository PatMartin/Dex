package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class MotionLineChart extends WebTask {
  public MotionLineChart() {
    super("Visualization: Dex JS", "Motion Line Chart",
      "visualization/dexjs/MotionLineChart.html",
      "web/dexjs/d3/MotionLineChart.gtmpl")

    setSaveDynamic(true)
  }
}
