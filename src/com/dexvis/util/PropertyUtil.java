package com.dexvis.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import com.dexvis.exception.MissingPropertyException;

/**
 * 
 * This class offers convenience functions for retrieving properties.
 * 
 * @author Patrick E. Martin
 * @version 1.0
 * 
 */
public class PropertyUtil
{
  private SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd-yyyy");

  public static String getString(Properties properties, String property)
      throws MissingPropertyException
  {
    if (properties.containsKey(property))
    {
      return properties.getProperty(property);
    }

    throw new MissingPropertyException("Property: '" + property
        + "' has not been defined.");
  }

  public static String getString(Properties properties, String property,
      String defaultValue)
  {
    if (properties.containsKey(property))
    {
      return properties.getProperty(property);
    }

    return defaultValue;
  }

  public boolean getBoolean(Properties properties, String property)
      throws MissingPropertyException
  {
    if (properties.containsKey(property))
    {
      return properties.getProperty(property).equalsIgnoreCase("true");
    }

    throw new MissingPropertyException("Property: '" + property
        + "' has not been defined.");
  }

  public boolean getBoolean(Properties properties, String property,
      boolean defaultValue)
  {
    if (properties.containsKey(property))
    {
      return properties.getProperty(property).equalsIgnoreCase("true");
    }

    return defaultValue;
  }

  public Integer getInteger(Properties properties, String property)
      throws MissingPropertyException
  {
    if (properties.containsKey(property))
    {
      return new Integer(properties.getProperty(property));
    }

    throw new MissingPropertyException("Property: '" + property
        + "' has not been defined.");
  }

  public Integer getInteger(Properties properties, String property,
      int defaultValue)
  {
    return getInteger(properties, property, new Integer(defaultValue));
  }

  public Integer getInteger(Properties properties, String property,
      Integer defaultValue)
  {
    if (properties.containsKey(property))
    {
      return new Integer(properties.getProperty(property));
    }

    return defaultValue;
  }

  public Double getDouble(Properties properties, String property)
      throws MissingPropertyException
  {
    if (properties.containsKey(property))
    {
      return new Double(properties.getProperty(property));
    }

    throw new MissingPropertyException("Property: '" + property
        + "' has not been defined.");
  }

  public Double getDouble(Properties properties, String property,
      double defaultValue)
  {
    return getDouble(properties, property, new Double(defaultValue));
  }

  public Double getDouble(Properties properties, String property,
      Double defaultValue)
  {
    if (properties.containsKey(property))
    {
      return new Double(properties.getProperty(property));
    }

    return defaultValue;
  }

  public Date getDate(Properties properties, String property)
      throws MissingPropertyException, ParseException
  {
    if (properties.containsKey(property))
    {
      return dateFormat.parse(properties.getProperty(property));
    }

    throw new MissingPropertyException("Property: '" + property
        + "' has not been defined.");
  }

  public Date getDate(Properties properties, String property, Date defaultValue)
  {
    return getDate(properties, property, defaultValue);
  }
}
