package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class ClusteredForce extends WebTask
{
  public ClusteredForce()
  {
    super("Visualization: Dex Charts", "Clustered Force",
      "visualization/dex_charts/ClusteredForce.html",
      "web/dexcharts/ClusteredForce.gtmpl")
    setSaveDynamic(true)
  }
}
