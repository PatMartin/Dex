package com.dexvis.util;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Writer;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

/**
 * 
 * This class provides utilities for dealing with objects.
 * 
 * 
 */
public class ObjectUtil
{
  /**
   * 
   * This routine will print an object. If the object is an array or hashtable,
   * it will recursively print the contents as well.
   * 
   * @param obj
   *          The object to print.
   * 
   */
  public static void printObject(Object obj)
  {
    printObject("", obj);
  }
  
  /**
   * 
   * This routine will print an object. If the object is an array or hashtable,
   * it will recursively print the contents as well. The default outputstream is
   * System.out.
   * 
   * @param prepend
   *          A String to label the object with.
   * @param obj
   *          The object to print.
   * 
   */
  public static void printObject(String prepend, Object obj)
  {
    printObject(new PrintWriter(System.out, true), prepend, obj);
  }
  
  /**
   * 
   * This routine will print an object. If the object is an array or hashtable,
   * it will recursively print the contents as well.
   * 
   * @param out
   *          The output stream.
   * @param prepend
   *          A String to label the object with.
   * @param obj
   *          The object to print.
   * 
   */
  public static void printObject(OutputStream out, String prepend, Object obj)
  {
    printObject(new PrintWriter(out, true), prepend, obj);
  }
  
  public static void printObject(Writer out, String prepend, Object obj)
  {
    printObject(new PrintWriter(out, true), prepend, obj);
  }
  
  /**
   * 
   * This routine will print an object. If the object is an array or hashtable,
   * it will recursively print the contents as well.
   * 
   * @param out
   *          The output PrintWriter stream.
   * @param prepend
   *          A String to label the object with.
   * @param obj
   *          The object to print.
   * 
   */
  public static void printObject(PrintWriter out, String prepend, Object obj)
  {
    if (obj == null)
    {
      out.println(prepend + " NULL");
      return;
    }
    
    if (obj instanceof Object[])
    {
      Object objArray[] = (Object[]) obj;
      
      out.println(prepend + " Array Dump:");
      for (int i = 0; i < objArray.length; i++)
      {
        printObject(out, "   " + prepend + "[" + i + "]", objArray[i]);
      }
    }
    if (obj instanceof Object[][])
    {
      Object objArray[][] = (Object[][]) obj;
      
      out.println(prepend + " Array of Array Dump:");
      for (int i = 0; i < objArray.length; i++)
      {
        for (int j = 0; j < objArray[i].length; j++)
          printObject(out, "   " + prepend + "[" + i + "][" + j + "]",
              objArray[i][j]);
      }
    }
    else if (obj instanceof java.util.Vector)
    {
      Vector vec = (Vector) obj;
      
      out.println(prepend + " Vector Dump:");
      for (int i = 0; i < vec.size(); i++)
        printObject(out, "   " + prepend + "[" + i + "]", vec.elementAt(i));
    }
    else if (obj instanceof java.util.Map)
    {
      Object keys[] = ((Map) obj).keySet().toArray();
      
      out.println(prepend + " Map Dump:");
      for (int i = 0; i < keys.length; i++)
      {
        if (prepend.length() > 0)
          printObject(out, "   " + prepend + "." + keys[i],
              ((Map) obj).get(keys[i]));
        else
          printObject(out, "   " + keys[i], ((Map) obj).get(keys[i]));
      }
    }
    else if (obj instanceof java.util.Hashtable)
    {
      Enumeration keys = ((Hashtable) obj).keys();
      Object key;
      
      out.println(prepend + " Hashtable Dump:");
      while (keys.hasMoreElements())
      {
        key = keys.nextElement();
        if (prepend.length() > 0)
          printObject(out, "   " + prepend + "." + key,
              ((Hashtable) obj).get(key));
        else
          printObject(out, "   " + key, ((Hashtable) obj).get(key));
      }
    }
    else if (obj instanceof java.util.Collection)
    {
      Iterator iterator = ((Collection) obj).iterator();
      Object item;
      
      out.println(prepend + " Collection Dump:");
      while (iterator.hasNext())
      {
        item = iterator.next();
        if (prepend.length() > 0)
          printObject(out, "   " + prepend + "[]", item);
        else
          printObject(out, "   []", item);
      }
    }
    else if (obj instanceof Enumeration)
    {
      Enumeration iterator = (Enumeration) obj;
      Object item;
      
      out.println(prepend + " Enumeration Dump:");
      while (iterator.hasMoreElements())
      {
        item = iterator.nextElement();
        if (prepend.length() > 0)
          printObject(out, "   " + prepend + "[]", item);
        else
          printObject(out, "   []", item);
      }
    }
    else
    {
      out.println(prepend + "=" + obj);
    }
  }
  
  /**
   * 
   * This method returns an integer representation of a variety of different
   * object types such as Integer and BigDecimal.
   * 
   * @param obj
   *          The object to decipher.
   * 
   * @return An int representation of the object.
   * 
   */
  public static int getInt(Object obj)
  {
    if (obj instanceof java.lang.Integer)
      return ((Integer) obj).intValue();
    else if (obj instanceof java.math.BigDecimal)
      return ((BigDecimal) obj).intValue();
    else
      return (new Integer(obj.toString())).intValue();
  }
  
  public static String toString(Object obj) throws IllegalArgumentException
  {
    if (obj == null)
    {
      throw new IllegalArgumentException("obj is null");
    }
    
    return "" + obj;
  }
  
  public static Double toDouble(Object obj) throws IllegalArgumentException
  {
    if (obj == null)
    {
      throw new IllegalArgumentException("obj is null");
    }
    
    if (obj instanceof Double)
    {
      return (Double) obj;
    }
    
    if (obj instanceof Float)
    {
      return new Double((Float) obj);
    }
    
    if (obj instanceof String)
    {
      return new Double((String) obj);
    }
    
    if (obj instanceof Integer)
    {
      return new Double((Integer) obj);
    }
    
    if (obj instanceof Long)
    {
      return new Double((Long) obj);
    }
    
    if (obj instanceof BigDecimal)
    {
      return new Double(((BigDecimal) obj).doubleValue());
    }
    
    if (obj instanceof Short)
    {
      return new Double((Short) obj);
    }
    
    throw new IllegalArgumentException("Unable to convert object of type '"
        + obj.getClass() + "' to Double.");
  }
  
  public static Boolean toBoolean(Object obj) throws IllegalArgumentException
  {
    if (obj == null)
    {
      throw new IllegalArgumentException("obj is null");
    }
    
    if (obj instanceof Boolean)
    {
      return (Boolean) obj;
    }
    
    if (obj instanceof String)
    {
      String str = (String) obj;
      return new Boolean(str.equalsIgnoreCase("true")
          || str.equalsIgnoreCase("t") || str.equalsIgnoreCase("y")
          || str.equalsIgnoreCase("yes") || str.equalsIgnoreCase("1"));
    }
    
    throw new IllegalArgumentException("Unable to convert object of type '"
        + obj.getClass() + "' to Boolean.");
  }
  
  public static Date toDate(Object obj)
  {
    if (obj instanceof java.util.Date)
    {
      return (Date) obj;
    }
    
    if (obj instanceof java.sql.Date)
    {
      java.sql.Date sqlDate = (java.sql.Date) obj;
      return new Date(sqlDate.getTime());
    }
    
    if (obj instanceof Calendar)
    {
      Calendar cal = (Calendar) obj;
      return new Date(cal.getTimeInMillis());
    }
    
    if (obj instanceof java.sql.Time)
    {
      java.sql.Time sqlTime = (java.sql.Time) obj;
      return new Date(sqlTime.getTime());
    }
    
    if (obj instanceof java.sql.Timestamp)
    {
      java.sql.Timestamp sqlTimestamp = (java.sql.Timestamp) obj;
      return new Date(sqlTimestamp.getTime());
    }
    
    throw new IllegalArgumentException("Unable to convert object of type '"
        + obj.getClass() + "' to Date.");
  }
}
