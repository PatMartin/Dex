package com.dexvis.dex.task.vis.vis

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class AnimatedGraph3D extends WebTask {
  public AnimatedGraph3D() {
    super("Visualization: Vis", "Animated 3D Graph",
      "visualization/vis/AnimatedGraph3D.html",
      "web/vis/AnimatedGraph3D.gtmpl")

    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)
    
    setSaveDynamic(true)
  }
}
