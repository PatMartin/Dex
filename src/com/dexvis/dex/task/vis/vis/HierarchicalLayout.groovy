package com.dexvis.dex.task.vis.vis

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class HierarchicalLayout extends WebTask {
  public HierarchicalLayout() {
    super("Visualization: Vis", "Hierarchical Layout",
      "visualization/vis/HierarchicalLayout.html",
      "web/vis/HierarchicalLayout.gtmpl")

    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)
    
    setSaveDynamic(true)
  }
}
