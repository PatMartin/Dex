package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class SqlQuery extends WebTask
{
  public SqlQuery()
  {
    super("Visualization: Dex Charts", "Sql Query",
      "visualization/dex_charts/SqlQuery.html",
      "web/dexcharts/SqlQuery.gtmpl")
    setSaveDynamic(true)
  }
}
