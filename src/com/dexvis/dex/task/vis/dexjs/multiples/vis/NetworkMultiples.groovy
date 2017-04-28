package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class NetworkMultiples extends WebTask {
  
  public NetworkMultiples() {
    super('Visualization: Dex JS', 'Network Multiples',
    "visualization/dexjs/multiples/NetworkMultiples.html",
    'web/dexjs/multiples/NetworkMultiples.gtmpl')
    
    setSaveDynamic(true)
  }
}