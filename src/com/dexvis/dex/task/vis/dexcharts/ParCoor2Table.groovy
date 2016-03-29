package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ParCoor2Table extends WebTask
{
  public ParCoor2Table()
  {
    super("Visualization: Dex Charts", "Par Coord -> Table",
     "visualization/dex_charts/ParCoord2Table.html",
     "web/dexcharts/ParCoor2Table.gtmpl")
    setSaveDynamic(true)
  }
}
