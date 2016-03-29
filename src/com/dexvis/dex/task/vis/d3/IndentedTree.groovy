package com.dexvis.dex.task.vis.d3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class IndentedTree extends WebTask
{
  public IndentedTree()
  {
    super("Visualization: D3", "Indented Tree",
      "visualization/d3/IndentedTree.html",,
      "web/d3/IndentedTree.gtmpl")
    setSaveDynamic(true)
  }
}
