package com.dexvis.dex.task.vis.dexcharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class DendrogramMultiples extends WebTask {
  
  public DendrogramMultiples() {
    super('Visualization: Dex Charts', 'Dendrogram Multiples',
    "visualization/dex_charts/DendrogramMultiples.html",
    'web/dexcharts/DendrogramMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}