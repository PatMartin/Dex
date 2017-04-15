package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Sql2Table extends WebTask
{
  public Sql2Table()
  {
    super("Visualization: Dex JS", "Sql -> Table",
     "visualization/dexjs/Sql2Table.html",
     "web/dexjs/combo/Sql2Table.gtmpl")
    setSaveDynamic(true)
  }
}
