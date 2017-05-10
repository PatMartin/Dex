package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class RadarChart extends WebTask {
  public RadarChart() {
    super("Visualization: Dex JS", "Radar Chart",
      "visualization/dexjs/RadarChart.html",
      "web/dexjs/d3/RadarChart.gtmpl")

    setSaveDynamic(true)
  }
}
