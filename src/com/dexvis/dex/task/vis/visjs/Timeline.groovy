package com.dexvis.dex.task.vis.visjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class Timeline extends WebTask {
  public Timeline() {
    super("Visualization: Vis JS", "Timeline",
      "visualization/vis/Timeline.html",
      "web/vis/Timeline.gtmpl")
    
    setSaveDynamic(true)
  }
}
