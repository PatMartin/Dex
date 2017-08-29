package com.dexvis.dex.task.vis.dexjs.multiples.vis

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class NetworkMultiples extends WebTask {
  
  public NetworkMultiples() {
    super('Visualization: Multiples', 'Network Multiples',
    "visualization/dexjs/multiples/vis/NetworkMultiples.html",
    'web/dexjs/multiples/vis/NetworkMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}