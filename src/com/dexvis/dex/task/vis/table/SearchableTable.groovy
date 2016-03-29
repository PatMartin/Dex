package com.dexvis.dex.task.vis.table

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class SearchableTable extends WebTask
{
  public SearchableTable()
  {
    super("Visualization: Table", "Searchable Table",
      "visualization/table/SearchableTable.html",
      "web/table/SearchableTable.gtmpl")
  }
}
