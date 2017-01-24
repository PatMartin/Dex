package com.dexvis.javafx.scene.control;

import javafx.scene.Node;
import javafx.scene.control.Separator;
import javafx.scene.effect.DropShadow;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;

import org.tbee.javafx.scene.layout.MigPane;

public class NodeFactory
{
  public static Node createTitle(String title)
  {
    MigPane pane = new MigPane("", "[grow]", "[]");

    DropShadow ds = new DropShadow();
    ds.setOffsetY(3.0f);
    ds.setColor(Color.color(0.4f, 0.4f, 0.4f));

    Text t = new Text();
    t.setEffect(ds);
    t.setCache(true);
    t.setX(10.0f);
    t.setY(270.0f);
    t.setFill(Color.DARKBLUE);
    t.setText(title);
    t.setFont(Font.font(null, FontWeight.BOLD, 18));

    Separator sep = new Separator();
    sep.setStyle("-fx-background-color: grey;-fx-background-radius: 2;");
    pane.add(t, "span, growx, aligny top");
    pane.add(sep, "span, grow");
    
    return pane;
  }
}
