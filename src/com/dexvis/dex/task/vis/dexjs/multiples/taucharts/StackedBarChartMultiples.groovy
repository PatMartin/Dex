package com.dexvis.dex.task.vis.dexjs.multiples.taucharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class StackedBarChartMultiples extends WebTask {
  
  public StackedBarChartMultiples() {
    super('Visualization: Multiples', 'Taucharts Stacked Bar Chart Multiples',
    "visualization/dexjs/multiples/taucharts/StackedBarChartMultiples.html",
    'web/dexjs/multiples/taucharts/StackedBarChartMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}