package com.dexvis.dex.task.vis.c3

import javafx.scene.Node;

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Scatterplot extends WebTask
{
  public Scatterplot()
  {
    super("Visualization: C3", "Scatterplot", "visualization/c3/Scatterplot.html",
    "web/c3/Scatterplot.gtmpl")
    setSaveDynamic(true)
  }
}
