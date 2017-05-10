package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class RingNetwork extends WebTask {
  public RingNetwork() {
    super("Visualization: D3 Plus", "Ring Network",
      "visualization/dexjs/d3plus/RingNetwork.html",
      "web/dexjs/d3plus/RingNetwork.gtmpl")
    
    setSaveDynamic(true)
  }
}
