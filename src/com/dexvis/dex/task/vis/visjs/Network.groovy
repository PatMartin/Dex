package com.dexvis.dex.task.vis.visjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class Network extends WebTask {
  public Network() {
    super("Visualization: Vis JS", "Network",
      "visualization/dexjs/visjs/Network.html",
      "web/dexjs/visjs/Network.gtmpl")

    setSaveDynamic(true)
  }
}
