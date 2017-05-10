package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class OrbitalLayout extends WebTask {
  public OrbitalLayout() {
    super("Visualization: Dex JS", "Orbital Layout",
      "visualization/dexjs/OrbitalLayout.html",
      "web/dexjs/d3/OrbitalLayout.gtmpl")

    setSaveDynamic(true)
  }
}
