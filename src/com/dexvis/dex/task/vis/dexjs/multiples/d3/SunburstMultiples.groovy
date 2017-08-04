package com.dexvis.dex.task.vis.dexjs.multiples.d3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class SunburstMultiples extends WebTask {
  public SunburstMultiples() {
    super("Visualization: Multiples", "D3 Sunburst Multiples",
    "visualization/dexjs/multiples/d3/SunburstMultiples.html",
    "web/dexjs/multiples/d3/SunburstMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
