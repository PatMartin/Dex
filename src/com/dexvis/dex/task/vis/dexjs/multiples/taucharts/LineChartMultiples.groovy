package com.dexvis.dex.task.vis.dexjs.multiples.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class LineChartMultiples extends WebTask {
  
  public LineChartMultiples() {
    super('Visualization: Multiples', 'Taucharts Line Chart Multiples',
    "visualization/dexjs/multiples/taucharts/LineChartMultiples.html",
    'web/dexjs/multiples/taucharts/LineChartMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}