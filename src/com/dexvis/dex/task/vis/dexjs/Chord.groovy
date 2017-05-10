package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class Chord extends WebTask {
  public Chord() {
    super("Visualization: Dex JS", "Chord",
      "visualization/dexjs/ChordDiagram.html",
      "web/dexjs/d3/Chord.gtmpl")
    
    setSaveDynamic(true)
  }
}
