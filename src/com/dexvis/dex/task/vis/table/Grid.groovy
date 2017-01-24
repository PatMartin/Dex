package com.dexvis.dex.task.vis.table

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Grid extends WebTask
{
  public Grid()
  {
    super("Visualization: Table", "JQ Grid",
      "visualization/table/JQGrid.html",
      "web/table/JQGrid.gtmpl")
  }
}
