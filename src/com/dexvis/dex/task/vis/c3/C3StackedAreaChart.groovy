package com.dexvis.dex.task.vis.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class C3StackedAreaChart extends WebTask {
  public C3StackedAreaChart() {
    super("Visualization: C3", "C3 Stacked Area Chart",
      "visualization/dexjs/c3/StackedAreaChart.html",
      "web/dexjs/c3/StackedAreaChart.gtmpl")
    setSaveDynamic(true)
  }
}
