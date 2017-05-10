package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class Dendrogram extends WebTask {
  
  public Dendrogram() {
    super('Visualization: Dex JS', 'Dendrogram',
    "visualization/dexjs/Dendrogram.html",
    'web/dexjs/d3/Dendrogram.gtmpl')

    setSaveDynamic(true)
  }
}