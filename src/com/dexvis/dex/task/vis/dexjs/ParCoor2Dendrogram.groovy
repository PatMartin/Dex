package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ParCoor2Dendrogram extends WebTask
{
  public ParCoor2Dendrogram()
  {
    super("Visualization: Dex JS", "Par Coord -> Dendrogram",
     "visualization/dexjs/ParCoord2Dendrogram.html",
     "web/dexjs/combo/ParCoor2Dendrogram.gtmpl")
    setSaveDynamic(true)
  }
}
