package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class DendrogramMultiples extends WebTask {
  
  public DendrogramMultiples() {
    super('Visualization: Dex JS', 'Dendrogram Multiples',
    "visualization/dexjs/DendrogramMultiples.html",
    'web/dexjs/d3/DendrogramMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}