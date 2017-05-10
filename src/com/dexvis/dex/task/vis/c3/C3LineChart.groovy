package com.dexvis.dex.task.vis.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class C3LineChart extends WebTask {
  public C3LineChart() {
    super("Visualization: C3", "C3 Line Chart",
      "visualization/dexjs/c3/LineChart.html",
      "web/dexjs/c3/LineChart.gtmpl")
    setSaveDynamic(true)
  }
}
