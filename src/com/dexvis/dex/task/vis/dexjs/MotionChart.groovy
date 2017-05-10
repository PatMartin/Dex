package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask

@Root
class MotionChart extends WebTask
{
  public MotionChart()
  {
    super("Visualization: Dex JS", "Motion Chart",
      "visualization/dexjs/MotionChart.html",
      "web/dexjs/d3/MotionChart.gtmpl")

    setSaveDynamic(true)
  }
}
