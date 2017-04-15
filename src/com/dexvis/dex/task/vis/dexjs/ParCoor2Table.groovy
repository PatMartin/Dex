package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ParCoor2Table extends WebTask
{
  public ParCoor2Table()
  {
    super("Visualization: Dex JS", "Par Coord -> Table",
     "visualization/dexjs/ParCoord2Table.html",
     "web/dexjs/combo/ParCoor2Table.gtmpl")
    setSaveDynamic(true)
  }
}
