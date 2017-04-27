package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ClusteredForceMultiples extends WebTask
{
  public ClusteredForceMultiples()
  {
    super("Visualization: Dex JS", "Clustered Force Multiples",
      "visualization/dexjs/multiples/ClusteredForceMultiples.html",
      "web/dexjs/multiples/ClusteredForceMultiples.gtmpl")
    setSaveDynamic(true)
  }
}
