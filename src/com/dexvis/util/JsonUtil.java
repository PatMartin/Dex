package com.dexvis.javafx.scene.control;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonNumber;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonString;
import javax.json.JsonStructure;
import javax.json.JsonValue;

/**
 * 
 * A rather meager class containing JSON utilities.
 * 
 * @author Patrick Martin
 *
 */
public class JsonUtil
{
  /**
   * 
   * Given a string containing valid JSON, return it's Java object
   * representation.
   * 
   * @param jsonStr
   *          The JSON string to parse.
   * 
   * @return The java object equivalent to the JSON string.
   * 
   */
  public static Object parseJsonString(String jsonStr)
  {
    try
    {
      System.out.println("PARSING-JSON: '" + jsonStr);
      JsonReader reader = Json.createReader(new StringReader(jsonStr));
      JsonStructure jsonStruct = reader.read();
      return parseJsonValue(jsonStruct);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
      Object empty[] = new Object[0];
      return empty;
    }
  }
  
  /**
   * 
   * Given a JSON Value, return it's Java object representation.
   * 
   * @param value
   *          The JSON value to convert.
   * 
   * @return The Java object value of the converted JSON.
   * 
   */
  public static Object parseJsonValue(JsonValue value)
  {
    if (value == null)
    {
      return null;
    }
    switch (value.getValueType())
    {
      case ARRAY:
        return parseJsonArray((JsonArray) value);
      case OBJECT:
        return parseJsonObject((JsonObject) value);
      case STRING:
        return ((JsonString) value).getString();
      case NUMBER:
        String num = ((JsonNumber) value).toString();
        try
        {
          return Integer.parseInt(num);
        }
        catch(Exception ex)
        {
          try
          {
            return Double.parseDouble(num);
          }
          catch(Exception iEx)
          {
            iEx.printStackTrace();
            return num;
          }
        }
      case TRUE:
        return true;
      case FALSE:
        return false;
      case NULL:
        return null;
    }
    return null;
  }
  
  /**
   * 
   * Given a JsonArray, convert it to a list of objects.
   * 
   * @param array
   *          The JsonArray to convert.
   * 
   * @return A list of objects.
   * 
   */
  public static List<Object> parseJsonArray(JsonArray array)
  {
    List<Object> objects = new ArrayList<Object>();
    if (array == null)
    {
      return objects;
    }
    for (JsonValue value : array)
    {
      objects.add(parseJsonValue(value));
    }
    return objects;
  }
  
  /**
   * 
   * Given a JsonObject, return it's equivalent as a Map.
   * 
   * @param obj
   *          The JSON object to convert.
   * @return An equivalent representation expressed as a Map<String, Object.
   */
  public static Map<String, Object> parseJsonObject(JsonObject obj)
  {
    Map<String, Object> objMap = new HashMap<String, Object>();
    if (obj == null)
    {
      return objMap;
    }
    
    for (String key : obj.keySet())
    {
      objMap.put(key, parseJsonValue(obj.get(key)));
    }
    return objMap;
  }
  
  public static void main(String args[])
  {
    System.out.println(parseJsonString("[ {\"foo\": \"bar\"} ]"));
  }
}
