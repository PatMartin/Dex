package com.dexvis.simple.types;

import java.util.List;

import javafx.scene.control.SelectionMode;

public class SimpleListView
{
  private List<String>  stringList    = null;
  private List<Integer> indexList     = null;
  private SelectionMode selectionMode = SelectionMode.SINGLE;

  public List<String> getStringList()
  {
    return stringList;
  }

  public void setStringList(List<String> stringList)
  {
    this.stringList = stringList;
  }

  public List<Integer> getIndexList()
  {
    return indexList;
  }

  public void setIndexList(List<Integer> indexList)
  {
    this.indexList = indexList;
  }

  public SelectionMode getSelectionMode()
  {
    return selectionMode;
  }

  public void setSelectionMode(SelectionMode selectionMode)
  {
    this.selectionMode = selectionMode;
  }
}
