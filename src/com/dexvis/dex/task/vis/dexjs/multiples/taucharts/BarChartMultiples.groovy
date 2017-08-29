package com.dexvis.dex.task.vis.dexjs.multiples.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class BarChartMultiples extends WebTask {
  
  public BarChartMultiples() {
    super('Visualization: Multiples', 'Taucharts Bar Chart Multiples',
    "visualization/dexjs/multiples/taucharts/BarChartMultiples.html",
    'web/dexjs/multiples/taucharts/BarChartMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}