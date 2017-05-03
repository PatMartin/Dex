package com.dexvis.javafx.util;

import javafx.scene.effect.DropShadow;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;

public class TextUtil
{
  public static Text DropShadow(String text)
  {
    DropShadow ds = new DropShadow();
    ds.setOffsetY(3.0f);
    ds.setColor(Color.color(0.4f, 0.4f, 0.4f));

    Text t = new Text();
    t.setEffect(ds);
    t.setCache(true);
    t.setX(10.0f);
    t.setY(270.0f);
    t.setFill(Color.DARKBLUE);
    t.setText(text);
    t.setFont(Font.font(null, FontWeight.BOLD, 18));
    
    return t;
  }
}
