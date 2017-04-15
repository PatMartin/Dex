package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class RadarChart extends WebTask {
  public RadarChart() {
    super("Visualization: Dex JS", "Radar Chart",
      "visualization/dexjs/RadarChart.html",
      "web/dexjs/d3/RadarChart.gtmpl")

    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)

    addProperties(TaskPropertyFactory.createCircleProperties('Radar Circles', 'radar.circle'))
    
    setSaveDynamic(true)
  }
}
