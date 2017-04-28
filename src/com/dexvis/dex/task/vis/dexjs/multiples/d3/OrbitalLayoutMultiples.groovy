package com.dexvis.dex.task.vis.dexjs.multiples.d3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class OrbitalLayoutMultiples extends WebTask {
  public OrbitalLayoutMultiples() {
    super("Visualization: Dex JS", "Orbital Layout Multiples",
      "visualization/dexjs/multiples/d3/OrbitalLayoutMultiples.html",
      "web/dexjs/multiples/d3/OrbitalLayoutMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
