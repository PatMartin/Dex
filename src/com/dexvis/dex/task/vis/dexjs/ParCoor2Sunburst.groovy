package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ParCoor2Sunburst extends WebTask
{
  public ParCoor2Sunburst()
  {
    super("Visualization: Dex JS", "Par Coord -> Sunburst",
     "visualization/dexjs/ParCoord2Sunburst.html",
     "web/dexjs/combo/ParCoor2Sunburst.gtmpl")
    setSaveDynamic(true)
  }
}
