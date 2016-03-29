package com.dexvis.dex.collections;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class HierarchicalMap<K extends String, V> implements Map<String, V>
{
  private String          regex = null;
  private final Map<K, V> map   = new TreeMap<K, V>();

  public HierarchicalMap()
  {
    this("\\s*:\\s*");
  }

  public HierarchicalMap(String regex)
  {
    this.regex = regex;
  }

  @Override
  public int size()
  {
    return map.size();
  }

  @Override
  public boolean isEmpty()
  {
    return map.isEmpty();
  }

  @Override
  public boolean containsKey(Object key)
  {
    if (key instanceof String)
    {
      String keys[] = getHierarchy((String) key);
      if (keys.length > 0)
      {
        Map<K, V> curMap = map;
        for (int i = 0; i < (keys.length - 1); i++)
        {
          if (!curMap.containsKey(keys[i]))
          {
            //System.out.println("containsKey=false: " + key + " -> " + keys[i]);
            return false;
          }
          curMap = (Map<K, V>) curMap.get(keys[i]);
        }
        //System.out.println("2 containsKey=true: " + key);
        return curMap.containsKey(keys[keys.length - 1]);
      }
    }
    //System.out.println("3 containsKey=false: " + key);
    return false;
  }

  @Override
  public boolean containsValue(Object value)
  {
    throw new UnsupportedOperationException("containsValue() is not supported.");
  }

  @Override
  public V get(Object key)
  {
    if (key instanceof String)
    {
      String keys[] = getHierarchy((String) key);
      if (keys.length > 0)
      {
        Map<K, V> curMap = map;
        for (int i = 0; i < (keys.length - 1); i++)
        {
          if (!curMap.containsKey(keys[i]))
          {
            return null;
          }
          curMap = (Map<K, V>) curMap.get(keys[i]);
        }
        return curMap.get(keys[keys.length - 1]);
      }
    }

    return null;
  }

  @Override
  public V put(String key, V value)
  {
    System.out.println("PUT: '" + key + "'");
    String keys[] = getHierarchy((String) key);

    if (keys.length > 0)
    {
      Map<K, V> curMap = map;
      for (int i = 0; i < (keys.length - 1); i++)
      {
        //System.out.println("CURKEY: " + keys[i]);
        if (!curMap.containsKey(keys[i]))
        {
          Map<K, V> tmpCurMap = new HashMap<K, V>();
          curMap.put((K) keys[i], (V) tmpCurMap);
          curMap = tmpCurMap;
        }
        else
        {
          curMap = (Map<K, V>) curMap.get(keys[i]);
        }
      }
      curMap.put((K) keys[keys.length - 1], value);
    }
    return value;
  }

  @Override
  public V remove(Object key)
  {
    throw new UnsupportedOperationException("remove() is not supported.");
  }

  @Override
  public void putAll(Map<? extends String, ? extends V> m)
  {
    throw new UnsupportedOperationException("putAll() is not supported.");
  }

  @Override
  public void clear()
  {
    map.clear();
  }

  @Override
  public Set<String> keySet()
  {
    return (Set<String>) map.keySet();
  }

  @Override
  public Collection<V> values()
  {
    throw new UnsupportedOperationException("values() is not supported.");
  }

  @Override
  public Set<java.util.Map.Entry<String, V>> entrySet()
  {
    throw new UnsupportedOperationException("entrySet() is not supported.");
  }

  public String[] getHierarchy(String key)
  {
    if (key != null && key.length() > 0)
    {
      return key.split(regex);
    }

    return new String[0];
  }

  public String toString()
  {
    return map.toString();
  }

  public static void main(String args[])
  {
    HierarchicalMap<String, Object> hmap = new HierarchicalMap<>("\\s*:\\s*");
    hmap.put("foo  :biz:  baz", "bar");
    System.out.println("HMAP: " + hmap);
    System.out.println("FOO: " + hmap.get("foo : biz"));
  }
}
