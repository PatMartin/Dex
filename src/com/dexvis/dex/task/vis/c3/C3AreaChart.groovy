package com.dexvis.dex.task.vis.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class C3AreaChart extends WebTask {
  public C3AreaChart() {
    super("Visualization: C3", "C3 Area Chart",
      "visualization/dexjs/c3/AreaChart.html",
      "web/dexjs/c3/AreaChart.gtmpl")
    setSaveDynamic(true)
  }
}
