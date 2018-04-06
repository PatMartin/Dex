package com.dexvis.dex;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.dexvis.util.JsonUtil;

public class DexConfig
{
  private static DexConfig instance = new DexConfig();
  private static Map<String, Object> config = new HashMap<String, Object>();
  
  static
  {
    String configPath = (System.getProperties().contains("dex.config")) ? System
        .getProperties().getProperty("dex.config") : "dex.json";
    try
    {
      config = (Map<String, Object>) JsonUtil.pathToObject(configPath);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
  }
  
  public static DexConfig newInstance()
  {
    return instance;
  }
  
  public static List<Object> getObjectList(String key)
  {
    return getObjectList(key, new ArrayList<Object>());
  }
  
  public static List<Object> getObjectList(String key, List<Object> defaultList)
  {
    if (config.containsKey(key))
    {
      try
      {
        return (List<Object>) config.get(key);
      }
      catch(Exception ex)
      {
        ex.printStackTrace();
      }
    }
    
    return defaultList;
  }
  
  public static Map<String, Object> getMap(String key)
  {
    return getMap(key, new HashMap<String, Object>());
  }
  
  public static Map<String, Object> getMap(String key,
      Map<String, Object> defaultMap)
  {
    if (config.containsKey(key))
    {
      try
      {
        return (Map<String, Object>) config.get(key);
      }
      catch(Exception ex)
      {
        ex.printStackTrace();
      }
    }
    
    return defaultMap;
  }

  public static Map<String, Object> getDatabase(String dbName) {
    Map<String, Object> databases = getMap("databases");
    
    if (databases.containsKey(dbName)) {
      return (Map<String, Object>) databases.get(dbName);
    }
    else if (databases.containsKey("HyperSQL")) {
      return (Map<String, Object>) databases.get("HyperSQL");
    }
    
    return null;
  }
}
