package com.dexvis.dex.task.vis.visjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class AnimatedGraph3D extends WebTask {
  public AnimatedGraph3D() {
    super("Visualization: Vis JS", "Animated 3D Graph",
      "visualization/vis/AnimatedGraph3D.html",
      "web/vis/AnimatedGraph3D.gtmpl")
    
    setSaveDynamic(true)
  }
}
