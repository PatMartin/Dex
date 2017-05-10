package com.dexvis.dex.task.vis.visjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class BarChart extends WebTask {
  public BarChart() {
    super("Visualization: Vis JS", "Bar Chart",
      "visualization/vis/BarChart.html",
      "web/vis/BarChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
