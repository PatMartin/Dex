package com.dexvis.dex.task.vis.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class TauChartsAreaChart extends WebTask {
  public TauChartsAreaChart() {
    super("Visualization: TauCharts", "TauCharts AreaChart",
      "visualization/dexjs/taucharts/AreaChart.html",
      "web/dexjs/taucharts/AreaChart.gtmpl")
    
    setSaveDynamic(true)
  }
}
