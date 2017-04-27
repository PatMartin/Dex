package com.dexvis.dex.task.vis.dexjs

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class TreemapMultiples extends WebTask
{
  public TreemapMultiples()
  {
    super("Visualization: Dex JS", "Treemap Multiples",
      "visualization/dexjs/multiples/TreemapMultiples.html",
      "web/dexjs/multiples/TreemapMultiples.gtmpl")
    setSaveDynamic(true)
  }
}
