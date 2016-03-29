package com.dexvis.dex.task.vis.table

import javafx.scene.Node

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class DataTable extends WebTask
{
  public DataTable()
  {
    super("Visualization: Table", "Data Table",
      "visualization/table/DataTable.html",
      "web/table/DataTable.gtmpl")
  }
}
