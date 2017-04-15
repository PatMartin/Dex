package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class OrbitalLayout extends WebTask {
  public OrbitalLayout() {
    super("Visualization: Dex JS", "Orbital Layout",
      "visualization/dexjs/OrbitalLayout.html",
      "web/dexjs/d3/OrbitalLayout.gtmpl")

    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)
    
    addProperties(TaskPropertyFactory.createCircleProperties('Circles', 'circles'))
    addProperties(TaskPropertyFactory.createCircleProperties('Orbits', 'orbits'))
    
    setSaveDynamic(true)
  }
}
