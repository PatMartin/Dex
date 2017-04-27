package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class ChordMultiples extends WebTask {
  public ChordMultiples() {
    super("Visualization: Dex JS", "Chord Multiples",
      "visualization/dexjs/multiples/ChordMultiples.html",
      "web/dexjs/multiples/ChordMultiples.gtmpl")
    
    setSaveDynamic(true)
  }
}
