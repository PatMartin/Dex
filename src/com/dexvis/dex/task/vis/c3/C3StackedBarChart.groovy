package com.dexvis.dex.task.vis.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class C3StackedBarChart extends WebTask {
  public C3StackedBarChart() {
    super("Visualization: C3", "C3 Stacked Bar Chart",
      "visualization/dexjs/c3/StackedBarChart.html",
      "web/dexjs/c3/StackedBarChart.gtmpl")
    setSaveDynamic(true)
  }
}
