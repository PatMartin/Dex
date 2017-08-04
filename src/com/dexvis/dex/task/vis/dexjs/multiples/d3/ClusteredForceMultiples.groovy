package com.dexvis.dex.task.vis.dexjs.multiples.d3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ClusteredForceMultiples extends WebTask
{
  public ClusteredForceMultiples()
  {
    super("Visualization: Multiples", "D3 Clustered Force Multiples",
      "visualization/dexjs/multiples/d3/ClusteredForceMultiples.html",
      "web/dexjs/multiples/d3/ClusteredForceMultiples.gtmpl")
    setSaveDynamic(true)
  }
}
