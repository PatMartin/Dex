package com.dexvis.dex.task.vis.vis

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class Network extends WebTask {
  public Network() {
    super("Visualization: Vis", "Network",
      "visualization/vis/Network.html",
      "web/vis/Network.gtmpl")

    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)
    
    setSaveDynamic(true)
  }
}
