package com.dexvis.dex.task.utilities

import javafx.scene.Node

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask;

@Root
class Google extends WebTask
{
  public Google()
  {
    super("Web View", "Google", "web_view/Google.html",
      "http://www.google.com")
  }
}
