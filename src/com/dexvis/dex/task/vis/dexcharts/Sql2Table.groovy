package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Sql2Table extends WebTask
{
  public Sql2Table()
  {
    super("Visualization: Dex Charts", "Sql -> Table",
     "visualization/dex_charts/Sql2Table.html",
     "web/dexcharts/Sql2Table.gtmpl")
    setSaveDynamic(true)
  }
}
