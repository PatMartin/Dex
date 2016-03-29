package com.dexvis.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import com.dexvis.exception.MissingOptionException;

/**
 * 
 * This class offers a mechanism for reading arguments from the command line.
 * 
 * @author Patrick E. Martin
 * @version 1.0
 * 
 */
public class Options
{
  private Map<String, String> defaultOptions;
  private Properties options;
  private SimpleDateFormat    dateFormat = new SimpleDateFormat("MM-dd-yyyy");

  public Options(String args[])
  {
    this(args, new HashMap<String, String>());
  }

  public Options(String args[], Map<String, String> defaultOptions)
  {
    this.defaultOptions = defaultOptions;

    this.options = new Properties();
    String curOption = "UNDEFINED";

    for (int i = 0; i < args.length; i++)
    {
      // It's an option specifier.
      if (args[i].startsWith("-"))
      {
        curOption = args[i].substring(1).trim();
        options.put(curOption, Boolean.TRUE.toString());
      }
      // It's an option, set it.
      else
      {
        options.put(curOption, args[i]);
      }
    }
  }

  public String getString(String option) throws MissingOptionException
  {
    if (options.containsKey(option))
    {
      return options.getProperty(option);
    }
    if (defaultOptions.containsKey(option))
    {
      return defaultOptions.get(option);
    }
    throw new MissingOptionException("Option: '" + option
        + "' has not been defined.");
  }

  public String getString(String option, String defaultOption)
  {
    if (options.containsKey(option))
    {
      return options.getProperty(option);
    }
    if (defaultOptions.containsKey(option))
    {
      return defaultOptions.get(option);
    }
    return defaultOption;
  }

  public boolean getBoolean(String option) throws MissingOptionException
  {
    if (options.containsKey(option))
    {
      return options.getProperty(option).equalsIgnoreCase("true");
    }
    if (defaultOptions.containsKey(option))
    {
      return defaultOptions.get(option).equalsIgnoreCase("true");
    }
    throw new MissingOptionException("Option: '" + option
        + "' has not been defined.");
  }

  public boolean getBoolean(String option, boolean defaultOption)
  {
    if (options.containsKey(option))
    {
      return options.getProperty(option).equalsIgnoreCase("true");
    }
    if (defaultOptions.containsKey(option))
    {
      return defaultOptions.get(option).equalsIgnoreCase("true");
    }
    return defaultOption;
  }
  
  public Integer getInteger(String option) throws MissingOptionException
  {
    if (options.containsKey(option))
    {
      return new Integer(options.getProperty(option));
    }
    if (defaultOptions.containsKey(option))
    {
      return new Integer(defaultOptions.get(option));
    }
    throw new MissingOptionException("Option: '" + option
        + "' has not been defined.");
  }

  public Integer getInteger(String option, int defaultOption)
  {
    return getInteger(option, new Integer(defaultOption));
  }

  public Integer getInteger(String option, Integer defaultOption)
  {
    if (options.containsKey(option))
    {
      return new Integer(options.getProperty(option));
    }
    if (defaultOptions.containsKey(option))
    {
      return new Integer(defaultOptions.get(option));
    }
    return defaultOption;
  }

  public Double getDouble(String option) throws MissingOptionException
  {
    if (options.containsKey(option))
    {
      return new Double(options.getProperty(option));
    }
    if (defaultOptions.containsKey(option))
    {
      return new Double(defaultOptions.get(option));
    }
    throw new MissingOptionException("Option: '" + option
        + "' has not been defined.");
  }

  public Double getDouble(String option, double defaultOption)
  {
    return getDouble(option, new Double(defaultOption));
  }

  public Double getDouble(String option, Double defaultOption)
  {
    if (options.containsKey(option))
    {
      return new Double(options.getProperty(option));
    }
    if (defaultOptions.containsKey(option))
    {
      return new Double(defaultOptions.get(option));
    }
    return defaultOption;
  }

  public Date getDate(String option) throws MissingOptionException,
      ParseException
  {
    if (options.containsKey(option))
    {
      return dateFormat.parse(options.getProperty(option));
    }
    if (defaultOptions.containsKey(option))
    {
      return dateFormat.parse(defaultOptions.get(option));
    }

    throw new MissingOptionException("Option: '" + option
        + "' has not been defined.");
  }

  public Date getDate(String option, Date defaultOption)
  {
    return getDate(option, defaultOption);
  }
  
  public Properties getProperties()
  {
    return options;
  }
}
