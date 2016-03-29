package com.dexvis.util;

import java.util.Collections;
import java.util.LinkedList;

public class SortedList<T extends Comparable> extends LinkedList
{
  // generated
  private static final long serialVersionUID = 1987436401711607857L;
  
  public boolean add(T e)
  {
    if (size() == 0)
    {
      return super.add(e);
    }
    else
    {
      
      // find insertion index
      int idx = -Collections.binarySearch(this, e) - 1;
      
      if (idx < 0)
      {
        return true; // already added
      }
      
      // add at this position
      super.add(idx, e);
      return true;
    }
  }
}