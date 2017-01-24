package com.dexvis.dex.task.vis.dexcharts.google

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Timeline extends WebTask
{
  public Timeline()
  {
    super("Visualization: Google", "Timeline",
      "visualization/google/Timeline.html",
      "web/dexcharts/google/Timeline.gtmpl")
    setSaveDynamic(true)
  }
}
