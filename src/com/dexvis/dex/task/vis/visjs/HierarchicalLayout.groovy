package com.dexvis.dex.task.vis.visjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class HierarchicalLayout extends WebTask {
  public HierarchicalLayout() {
    super("Visualization: Vis JS", "Hierarchical Layout",
      "visualization/vis/HierarchicalLayout.html",
      "web/vis/HierarchicalLayout.gtmpl")
    
    setSaveDynamic(true)
  }
}
