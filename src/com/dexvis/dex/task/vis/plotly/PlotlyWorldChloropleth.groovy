package com.dexvis.dex.task.vis.plotly

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class PlotlyWorldChloropleth extends WebTask {
  public PlotlyWorldChloropleth() {
    super("Visualization: Plotly", "Plotly World Chloropleth",
      "visualization/plotly/Map.html",
      "web/plotly/WorldChloropleth.gtmpl")
    
    setSaveDynamic(true)
  }
}
