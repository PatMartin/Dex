package com.dexvis.util;

import java.util.List;

public class ListUtil
{
  public static boolean columnIsNumeric(List<List<String>> list, int colNum)
  {
    boolean isNumeric = true;

    try
    {
      for (int rowNum = 0; rowNum < list.size(); rowNum++)
      {
        Double.parseDouble(list.get(rowNum).get(colNum));
      }
    }
    catch(Exception ex)
    {
      return false;
    }

    return isNumeric;
  }
}