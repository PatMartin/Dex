package com.dexvis.dex.task.vis.dexjs.multiples.d3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class TreemapMultiples extends WebTask
{
  public TreemapMultiples()
  {
    super("Visualization: Multiples", "D3 Treemap Multiples",
      "visualization/dexjs/multiples/d3/TreemapMultiples.html",
      "web/dexjs/multiples/d3/TreemapMultiples.gtmpl")
    setSaveDynamic(true)
  }
}
