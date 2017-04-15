package com.dexvis.dex.task.vis.c3

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class C3Player extends WebTask {
  public C3Player() {
    super("Visualization: C3", "C3 Player",
      "visualization/dexjs/C3Player.html",
      "web/dexjs/C3Player.gtmpl")
    
    setSaveDynamic(true)
  }
}
