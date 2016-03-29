package com.dexvis.dex.task.vis.dexcharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class RadarChart extends WebTask {
  public RadarChart() {
    super("Visualization: Dex Charts", "Radar Chart",
      "visualization/dex_charts/RadarChart.html",
      "web/dexcharts/RadarChart.gtmpl")

    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)

    addProperties(TaskPropertyFactory.createCircleProperties('Radar Circles', 'radar.circle'))
    
    setSaveDynamic(true)
  }
}
