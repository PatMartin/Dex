package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ParCoor2Dendrogram extends WebTask
{
  public ParCoor2Dendrogram()
  {
    super("Visualization: Dex Charts", "Par Coord -> Dendrogram",
     "visualization/dex_charts/ParCoord2Dendrogram.html",
     "web/dexcharts/ParCoor2Dendrogram.gtmpl")
    setSaveDynamic(true)
  }
}
