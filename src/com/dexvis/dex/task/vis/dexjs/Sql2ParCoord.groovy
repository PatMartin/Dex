package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Sql2ParCoord extends WebTask {
  public Sql2ParCoord() {
    super("Visualization: Dex JS", "Sql -> ParCoor",
    "visualization/dexjs/Sql2ParCoord.html",
    "web/dexjs/combo/Sql2ParCoor.gtmpl")
    setSaveDynamic(true)
  }
}
