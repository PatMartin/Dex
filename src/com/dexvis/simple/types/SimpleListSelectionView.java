package com.dexvis.simple.types;

import java.util.List;

public class SimpleListSelectionView
{
  private List<String> sourceList = null;
  private List<String> targetList = null;

  public List<String> getSourceList()
  {
    return sourceList;
  }

  public void setSourceList(List<String> sourceList)
  {
    this.sourceList = sourceList;
  }

  public List<String> getTargetList()
  {
    return targetList;
  }

  public void setTargetList(List<String> targetList)
  {
    this.targetList = targetList;
  }
}
