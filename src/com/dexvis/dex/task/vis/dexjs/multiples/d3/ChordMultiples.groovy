package com.dexvis.dex.task.vis.dexjs.multiples.d3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class ChordMultiples extends WebTask {
  public ChordMultiples() {
    super("Visualization: Multiples", "D3 Chord Multiples",
      "visualization/dexjs/multiples/d3/ChordMultiples.html",
      "web/dexjs/multiples/d3/ChordMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
