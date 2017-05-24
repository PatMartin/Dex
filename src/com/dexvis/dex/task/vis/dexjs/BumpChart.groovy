package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class BumpChart extends WebTask {
  public BumpChart() {
    super("Visualization: Dex JS", "Bump Chart",
      "visualization/dexjs/BumpChart.html",
      "web/dexjs/d3/BumpChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
