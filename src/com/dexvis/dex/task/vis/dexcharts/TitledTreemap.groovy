package com.dexvis.dex.task.vis.dexcharts

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class TitledTreemap extends WebTask
{
  public TitledTreemap()
  {
    super("Visualization: Dex Charts", "Titled Treemap",
      "visualization/dex_charts/Titled Treemap.html",
      "web/dexcharts/TitledTreemap.gtmpl")
    setSaveDynamic(true)
  }
}
