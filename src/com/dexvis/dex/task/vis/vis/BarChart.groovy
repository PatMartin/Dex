package com.dexvis.dex.task.vis.vis

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class BarChart extends WebTask {
  public BarChart() {
    super("Visualization: Vis", "Bar Chart",
      "visualization/vis/BarChart.html",
      "web/vis/BarChart.gtmpl")

    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)
    
    setSaveDynamic(true)
  }
}
