package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ParCoor2Network extends WebTask
{
  public ParCoor2Network()
  {
    super("Visualization: Dex JS", "Par Coord -> Network",
     "visualization/dexjs/ParCoord2Network.html",
     "web/dexjs/combo/ParCoor2Network.gtmpl")
    setSaveDynamic(true)
  }
}
