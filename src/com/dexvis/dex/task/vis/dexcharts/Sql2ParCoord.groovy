package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Sql2ParCoord extends WebTask {
  public Sql2ParCoord() {
    super("Visualization: Dex Charts", "Sql -> ParCoor",
    "visualization/dex_charts/Sql2ParCoord.html",
    "web/dexcharts/Sql2ParCoor.gtmpl")
    setSaveDynamic(true)
  }
}
