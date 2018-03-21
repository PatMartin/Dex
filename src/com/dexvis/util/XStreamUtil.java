package com.dexvis.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

/**
 * 
 * This package contains utilities for xstream.
 * 
 */
public class XStreamUtil
{
  public static List<Object> readObjects(String path)
      throws FileNotFoundException, ClassNotFoundException
  {
    List<Object> objs = new ArrayList<Object>();
    ObjectInputStream ois = null;
    
    try
    {
      XStream xstream = new XStream(new DomDriver());
      FileReader reader = new FileReader(path);
      ois = xstream.createObjectInputStream(reader);
      
      while (true)
      {
        Object obj = ois.readObject();
        objs.add(obj);
      }
    }
    catch(IOException ioEx)
    {
      // EOF reached.
    }
    finally
    {
      try
      {
        if (ois != null)
        {
          ois.close();
        }
      }
      catch(Exception ex)
      {
        
      }
    }
    
    return objs;
  }
  
  public static void writeObjects(String path, Object... objects)
      throws IOException
  {
    if (objects == null || objects.length <= 0)
    {
      return;
    }
    
    XStream xstream = new XStream(new DomDriver());
    FileWriter writer = new FileWriter(new File(path));
    ObjectOutputStream oos = xstream.createObjectOutputStream(writer);
    
    for (Object obj : objects)
    {
      oos.writeObject(obj);
    }
    oos.close();
  }
  
  public static Object readObject(String path) throws IOException,
      ClassNotFoundException
  {
    XStream xstream = new XStream(new DomDriver());
    FileReader reader = new FileReader(path);
    ObjectInputStream ois = xstream.createObjectInputStream(reader);
    Object obj = ois.readObject();
    ois.close();
    return obj;
  }
  
  public static void writeObject(String path, Object obj) throws IOException
  {
    XStream xstream = new XStream(new DomDriver());
    FileWriter writer = new FileWriter(new File(path));
    ObjectOutputStream oos = xstream.createObjectOutputStream(writer);
    oos.writeObject(obj);
    oos.close();
  }
}
