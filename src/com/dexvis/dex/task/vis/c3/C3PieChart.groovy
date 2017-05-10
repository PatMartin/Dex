package com.dexvis.dex.task.vis.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class C3PieChart extends WebTask {
  public C3PieChart() {
    super("Visualization: C3", "C3 Pie Chart",
      "visualization/dexjs/c3/PieChart.html",
      "web/dexjs/c3/PieChart.gtmpl")
    setSaveDynamic(true)
  }
}
