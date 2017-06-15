package com.dexvis.dex.task.vis.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class TauChartsHorizontalStackedBarChart extends WebTask {
  public TauChartsHorizontalStackedBarChart() {
    super("Visualization: TauCharts", "TauCharts Hor/Stacked Bar Chart",
      "visualization/dexjs/taucharts/HorizontalStackedBarChart.html",
      "web/dexjs/taucharts/HorizontalStackedBarChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
