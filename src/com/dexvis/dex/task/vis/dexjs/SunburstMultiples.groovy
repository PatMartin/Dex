package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class SunburstMultiples extends WebTask {
  public SunburstMultiples() {
    super("Visualization: Dex JS", "Sunburst Multiples",
    "visualization/dexjs/multiples/SunburstMultiples.html",
    "web/dexjs/multiples/SunburstMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
