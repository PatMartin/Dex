package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Treemap extends WebTask
{
  public Treemap()
  {
    super("Visualization: Dex Charts", "Treemap",
      "visualization/dex_charts/Treemap.html",
      "web/dexcharts/Treemap.gtmpl")
    setSaveDynamic(true)
  }
}
