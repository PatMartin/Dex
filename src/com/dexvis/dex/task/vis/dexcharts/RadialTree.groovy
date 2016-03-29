package com.dexvis.dex.task.vis.dexcharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class RadialTree extends WebTask {
  public RadialTree() {
    super("Visualization: Dex Charts", "Radial Tree",
    "visualization/dex_charts/RadialTree.html",
    "web/dexcharts/RadialTree.gtmpl")
    
    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)
    
    setSaveDynamic(true)
  }
}
