package com.dexvis.dex.task.vis.dexcharts.google

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class WordTree extends WebTask
{
  public WordTree()
  {
    super("Visualization: Google", "Word Tree",
      "visualization/google/WordTree.html",
      "web/dexcharts/google/WordTree.gtmpl")
    setSaveDynamic(true)
  }
}
