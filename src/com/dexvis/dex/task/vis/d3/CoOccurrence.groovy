package com.dexvis.dex.task.vis.d3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class CoOccurrence extends WebTask
{
  public CoOccurrence()
  {
    super("Visualization: D3", "Co-Occurrence",
      "visualization/d3/CoOccurrence.html",
      "web/d3/CoOccurrence.gtmpl")
    setSaveDynamic(true)
  }
}
