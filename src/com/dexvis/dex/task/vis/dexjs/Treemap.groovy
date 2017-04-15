package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Treemap extends WebTask
{
  public Treemap()
  {
    super("Visualization: Dex JS", "Treemap",
      "visualization/dexjs/Treemap.html",
      "web/dexjs/d3/Treemap.gtmpl")
    setSaveDynamic(true)
  }
}
