package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ParCoor2Chord extends WebTask
{
  public ParCoor2Chord()
  {
    super("Visualization: Dex JS", "Par Coord -> Chord",
     "visualization/dexjs/ParCoord2Chord.html",
     "web/dexjs/combo/ParCoor2Chord.gtmpl")
    setSaveDynamic(true)
  }
}
