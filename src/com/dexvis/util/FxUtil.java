package com.dexvis.util;

import javafx.scene.Node;
import javafx.scene.Parent;

public class FxUtil
{
  public static void dump(Node n)
  {
    System.out.println("Dumping Node: '" + n + "'");
    dump(n, 0);
  }

  private static void dump(Node n, int depth)
  {
    for (int i = 0; i < depth; i++)
      System.out.print("  ");
    System.out.println(n);
    if (n instanceof Parent)
      for (Node c : ((Parent) n).getChildrenUnmodifiable())
        dump(c, depth + 1);
  }
}
