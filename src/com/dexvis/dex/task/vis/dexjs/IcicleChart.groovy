package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class IcicleChart extends WebTask {
  public IcicleChart() {
    super("Visualization: Dex JS", "Icicle Chart",
      "visualization/dexjs/IcicleChart.html",
      "web/dexjs/d3/IcicleChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
