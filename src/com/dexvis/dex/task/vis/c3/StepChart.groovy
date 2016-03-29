package com.dexvis.dex.task.vis.c3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class StepChart extends WebTask
{
  public StepChart()
  {
    super("Visualization: C3", "Step Chart",
      "visualization/c3/StepChart.html",
      "web/c3/StepChart.gtmpl")
    setSaveDynamic(true)
  }
}
