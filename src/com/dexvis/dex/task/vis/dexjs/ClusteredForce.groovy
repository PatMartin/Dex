package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ClusteredForce extends WebTask
{
  public ClusteredForce()
  {
    super("Visualization: Dex JS", "Clustered Force",
      "visualization/dexjs/ClusteredForce.html",
      "web/dexjs/d3/ClusteredForce.gtmpl")
    setSaveDynamic(true)
  }
}
