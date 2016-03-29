package com.dexvis.dex;

import javafx.scene.control.Label;
import javafx.scene.paint.Color;

public class Utils
{
  public static Label createLabel(String st)
  {
    Label label = new Label(st);
    label.setTextFill(Color.DARKBLUE);
    return label;
  }
}
