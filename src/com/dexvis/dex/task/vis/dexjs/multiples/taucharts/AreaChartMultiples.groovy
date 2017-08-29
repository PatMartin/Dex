package com.dexvis.dex.task.vis.dexjs.multiples.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class AreaChartMultiples extends WebTask {
  
  public AreaChartMultiples() {
    super('Visualization: Multiples', 'Taucharts Area Chart Multiples',
    "visualization/dexjs/multiples/taucharts/AreaChartMultiples.html",
    'web/dexjs/multiples/taucharts/AreaChartMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}