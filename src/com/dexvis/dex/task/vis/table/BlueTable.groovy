package com.dexvis.dex.task.vis.table

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class BlueTable extends WebTask
{
  public BlueTable()
  {
    super("Visualization: Table", "Blue Table",
      "visualization/table/BlueTable.html",
      "web/table/BlueTable.gtmpl")
  }
}
