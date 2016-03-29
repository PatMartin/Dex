package com.dexvis.dex.task.vis.d3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Force extends WebTask
{
  public Force()
  {
    super("Visualization: D3", "Force Layout",
      "visualization/d3/ForceLayout.html",
      "web/d3/Force.gtmpl")
    setSaveDynamic(true)
  }
}
