package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ParCoor2Sankey extends WebTask
{
  public ParCoor2Sankey()
  {
    super("Visualization: Dex JS", "Par Coord -> Sankey",
     "visualization/dexjs/ParCoord2Sankey.html",
     "web/dexjs/combo/ParCoor2Sankey.gtmpl")
    setSaveDynamic(true)
  }
}
