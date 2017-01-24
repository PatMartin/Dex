package com.dexvis.dex.task.vis.dexcharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class C3Player extends WebTask {
  public C3Player() {
    super("Visualization: Dex Charts", "C3 Player",
      "visualization/dex_charts/C3Player.html",
      "web/dexcharts/C3Player.gtmpl")
    
    setSaveDynamic(true)
  }
}
