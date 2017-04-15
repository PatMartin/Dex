package com.dexvis.dex.task.vis.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class C3BarChart extends WebTask {
  public C3BarChart() {
    super("Visualization: C3", "C3 Bar Chart",
      "visualization/dexjs/c3/BarChart.html",
      "web/dexjs/c3/BarChart.gtmpl")
    setSaveDynamic(true)
  }
}
