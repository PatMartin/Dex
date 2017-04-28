package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class OrbitalLayoutMultiples extends WebTask {
  public OrbitalLayoutMultiples() {
    super("Visualization: Dex JS", "Orbital Layout Multiples",
      "visualization/dexjs/multiples/OrbitalLayoutMultiples.html",
      "web/dexjs/multiples/OrbitalLayoutMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
