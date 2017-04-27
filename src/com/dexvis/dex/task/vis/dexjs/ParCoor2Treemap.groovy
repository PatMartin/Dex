package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ParCoor2Treemap extends WebTask
{
  public ParCoor2Treemap()
  {
    super("Visualization: Dex JS", "Par Coord -> Treemap",
     "visualization/dexjs/ParCoord2Treemap.html",
     "web/dexjs/combo/ParCoor2Treemap.gtmpl")
    setSaveDynamic(true)
  }
}
