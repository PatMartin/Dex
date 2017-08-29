package com.dexvis.dex.task.vis.dexjs.multiples.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class ScatterPlotMultiples extends WebTask {
  
  public ScatterPlotMultiples() {
    super('Visualization: Multiples', 'Taucharts ScatterPlot Multiples',
    "visualization/dexjs/multiples/taucharts/ScatterPlotMultiples.html",
    'web/dexjs/multiples/taucharts/ScatterPlotMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}