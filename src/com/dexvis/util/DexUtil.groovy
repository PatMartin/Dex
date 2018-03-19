package com.dexvis.util

import java.io.StringWriter;
import java.util.Map

import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import com.dexvis.dex.DexData;
import com.dexvis.dex.DexMatcher;
import com.dexvis.dex.wf.DexTask;


/**
 * 
 * Useful routines for manipulating DexData.
 * 
 * @author Patrick Martin
 * 
 */
public class DexUtil {
  public static Map<String, Map> getConnectionMap(DexData dexData) {
    Map<String, Map> rootMap = new HashMap<String, Map>()
    Map<String, Map> curMap
    
    for (int row = 0; row < dexData.data.size(); row++) {
      curMap = rootMap
      
      for (int col = 0; col < dexData.header.size(); col++) {
        if (!curMap.containsKey(dexData.data.get(row).get(col))) {
          Map<String, Map> newMap = new HashMap<String, Map>()
          curMap.put(dexData.data.get(row).get(col), newMap)
        }
        
        curMap = curMap.get(dexData.data.get(row).get(col))
      }
    }
    
    return rootMap
  }

  public static DexTask copyTask(DexTask task) {
    
    StringWriter sw = new StringWriter();
    Serializer serializer = new Persister(new DexMatcher());
    DexTask copy = null;
    
    try {
      copy = dexTaskFromString(task.getClass(), dexTaskToString(task))
    }
    // Could not copy via serialization, use local copy instead
    catch(Exception ex) {
      copy = new DexTask(task.getCategory(), task.getName(), task.getHelpFile())
      copy.setActive(task.getActive())
      try
      {
        // REM: Copy the configuration of the task here too.
      }
      catch (Exception iex1)
      {
        // Ignore...best effort, prop sheet ignored.
        iex1.printStackTrace()
      }
    }
    
    return copy
  }
  
  public static String dexTaskToString(DexTask task) {
    
    StringWriter sw = new StringWriter();
    Serializer serializer = new Persister(new DexMatcher());
    serializer.write(task, sw);
    //println "DexTask.toString()   = " + sw.toString();
    return sw.toString();
  }

  public static DexTask dexTaskFromString(Class clazz, String taskStr)
  {
    //println "DexTask.fromString() = $taskStr"
    Serializer serializer = new Persister(new DexMatcher());
    return (DexTask) serializer.read(clazz, taskStr)
  }
  
  public static String getJSONStringBody(Map<String, Map> connectionMap) {
    List<String> nodeList = new ArrayList<String>()
    
    if (!connectionMap) {
      return ""
    }
    
    for (String key : connectionMap.keySet()) {
      if (!connectionMap.get(key) || connectionMap.get(key).size() == 0) {
        nodeList.add("{ \"name\": \"$key\" }")
      }
      else {
        nodeList.add("{ \"name\": \"$key\", \"children\": [" + getJSONStringBody(connectionMap.get(key)) + "] }")
      }
    }
    
    return nodeList.join(",")
  }
  
  public static String getJSONStringBody(Map<String, Map> connectionMap, Closure method) {
    List<String> nodeList = new ArrayList<String>()
    def value;
    
    if (connectionMap == null) {
      return ""
    }
    
    for (String key : connectionMap.keySet()) {
      try {
        value = connectionMap.get(key);
        if (value && value.size() == 0) {
          nodeList.add("{ \"name\": \"$key\"" + method(key, value) + "}")
        }
        else {
          nodeList.add("{ \"name\": \"$key\"," + method(key, value) +
              " \"children\": [" + getJSONStringBody(value, method) + "] }")
        }
      }
      catch (Exception ex) {
        ex.printStackTrace()
      }
    }
    
    return nodeList.join(",")
  }
  
  public static String getSizedJSONStringBody(Map<String, Map> connectionMap) {
    println "CMAP: $connectionMap"
    List<String> nodeList = new ArrayList<String>()
    
    connectionMap.each { key, childMap ->
      
      //println " CHILD[$key]: $childMap"
      if (childMap.size() == 0)
      {
        nodeList.add("{ \"name\": \"$key\" }")
      }
      else
      {
        //println "CHILDMAP: $childMap"
        if (childMap.size() == 1)
        {
          Map<String, Map> grandchildMap = childMap.values().iterator().next()
          if (grandchildMap.size() == 0)
          {
            nodeList.add("{ \"name\": \"$key\", \"size\": \"${childMap.keySet().iterator().next()}\" }")
          }
          else
          {
            nodeList.add("{ \"name\": \"$key\", \"children\": [" + getSizedJSONStringBody(connectionMap.get(key)) + "] }")
          }
        }
        else
        {
          nodeList.add("{ \"name\": \"$key\", \"children\": [" + getSizedJSONStringBody(connectionMap.get(key)) + "] }")
        }
      }
    }
    
    return nodeList.join(",")
  }
  
  public static String getSizedJSONStringBody(Map<String, Map> connectionMap, Integer size)
  {
    List<String> nodeList = new ArrayList<String>()
    
    for (String key : connectionMap.keySet())
    {
      if (connectionMap.get(key).size() == 0)
      {
        nodeList.add("{ \"name\": \"$key\", \"size\": $size }")
      }
      else
      {
        nodeList.add("{ \"name\": \"$key\", \"children\": [" + getSizedJSONStringBody(connectionMap.get(key), size) + "] }")
      }
    }
    
    return nodeList.join(",")
  }
  
  public static String getProcessingJsString(DexData dexData)
  {
    String retStr = "dexHeader = new String[] {" +
        dexData.header.collect { "\"$it\"" }.join(",") + "};\n"
    retStr += "dexData = new String[][] {"
    def rows = []
    dexData.data.eachWithIndex
    { row, ri ->
      rows << "{" + row.collect { "\"$it\"" }.join(",") + "}"
    }
    retStr += rows.join(",") + "};"
    return retStr
  }
  
  public static String getJSONString(DexData data)
  {
    return "jsonData = { \"name\": \"${data.header[0]}\", \"children\": [" +
        getJSONStringBody(getConnectionMap(data)) + "]};\n"
  }
  
  public static String getSizedJSONString(DexData data)
  {
    return "jsonData = { \"name\": \"${data.header[0]}\", \"children\": [" +
        getSizedJSONStringBody(getConnectionMap(data)) + "]};\n"
  }
  
  public static String getSizedJSONString(DexData data, Integer size)
  {
    return "jsonData = { \"name\": \"${data.header[0]}\", \"children\": [" +
        getSizedJSONStringBody(getConnectionMap(data), size) + "]};\n"
  }
  
  public static String getJSONString(DexData data, Closure method)
  {
    println "DATA: $data"
    return "jsonData = { \"name\": \"${data.header[0]}\", \"children\": [" +
        getJSONStringBody(getConnectionMap(data), method) + "]};\n"
  }
  
  public static String getFlatJSONString(DexData dexData)
  {
    def rowList = []
    
    dexData.data.each
    { row ->
      def List<String> nvpList = []
      dexData.header.eachWithIndex
      { h, i ->
        nvpList << "\"$h\":\"${row[i]}\""
      }
      rowList << "{" + nvpList.join(",") + "}"
    }
    
    return "[" + rowList.join(",") + "];"
  }
  
  public static String getFlatDataString(DexData dexData)
  {
    def rowList = []
    dexData.data.each
    { row ->
      rowList << "[" + row.collect { "\"$it\"" }.join(",") + "]"
    }
    
    return "[" + rowList.join(",") + "];"
  }
  
  public static String getHeaderString(DexData dexData)
  {
    return "[" + dexData.header.collect { "\"$it\"" }.join(",") + "];"
  }
  
  public static String getCsvString(DexData dexData)
  {
    def rowList = ["[" + dexData.header.collect { "\"$it\"" }.join(",") + "]"]
    
    dexData.data.each
    { row ->
      rowList << "[" + row.collect { "\"$it\"" }.join(",") + "]"
    }
    
    return "[" + rowList.join(",") + "];"
  }
  
  public static void main(String[] args)
  {
    DexData data = new DexData()
    data.header << "COL1"
    data.header << "COL2"
    data.header << "COL3"
    data.header << "SIZE"
    ('A'..'C').eachWithIndex
    { val, i ->
      data.data << ["${val}1", "${val}2", "${val}3", "${i+1}"]
    }
    
    //println "JSON String      : ${getJSONString(data)}"
    println "Sized JSON String: ${getSizedJSONString(data)}"
  }
}