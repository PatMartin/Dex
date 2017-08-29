package com.dexvis.dex.task.vis.dexjs.multiples.d3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class IcicleChartMultiples extends WebTask {
  public IcicleChartMultiples() {
    super("Visualization: Multiples", "D3 Icicle Multiples",
      "visualization/dexjs/multiples/d3/IcicleMultiples.html",
      "web/dexjs/multiples/d3/IcicleMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
