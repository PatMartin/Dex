package com.dexvis.dex.wf;

import java.util.Map;

import org.jboss.netty.util.internal.ConcurrentHashMap;

import com.dexvis.dex.DexData;

public class DexTaskState
{
  // Our standard data payload.
  private DexData dexData = new DexData();

  // Stores other things within a generic symbol table.
  private Map<String, Object> symbolTable = new ConcurrentHashMap<String, Object>();

  public DexTaskState()
  {
    super();
  }

  public DexTaskState(DexData dexData, Map<String, Object> symbolTable)
  {
    super();
    this.dexData = dexData;
    this.symbolTable = symbolTable;
  }
  
  public DexTaskState(DexData dexData)
  {
    super();
    this.dexData = dexData;
  }
  
  public DexTaskState(Map<String, Object> symbolTable)
  {
    super();
    this.symbolTable = symbolTable;
  }
  
  public DexData getDexData()
  {
    return dexData;
  }

  public void setDexData(DexData dexData)
  {
    this.dexData = dexData;
  }

  public Map<String, Object> getSymbolTable()
  {
    return symbolTable;
  }

  public void setSymbolTable(Map<String, Object> symbolTable)
  {
    this.symbolTable = symbolTable;
  }
}
