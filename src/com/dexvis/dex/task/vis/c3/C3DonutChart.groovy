package com.dexvis.dex.task.vis.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class C3DonutChart extends WebTask {
  public C3DonutChart() {
    super("Visualization: C3", "C3 Donut Chart",
      "visualization/dexjs/c3/DonutChart.html",
      "web/dexjs/c3/DonutChart.gtmpl")
    setSaveDynamic(true)
  }
}
