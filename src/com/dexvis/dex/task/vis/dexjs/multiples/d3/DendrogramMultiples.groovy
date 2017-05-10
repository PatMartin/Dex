package com.dexvis.dex.task.vis.dexjs.multiples.d3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class DendrogramMultiples extends WebTask {
  
  public DendrogramMultiples() {
    super('Visualization: Dex JS', 'Dendrogram Multiples',
    "visualization/dexjs/multiples/d3/DendrogramMultiples.html",
    'web/dexjs/multiples/d3/DendrogramMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}