package com.dexvis.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

public class DateUtil
{
  
  private static Map<Pattern, SimpleDateFormat> formats = new LinkedHashMap<Pattern, SimpleDateFormat>();
  
  public static void addFormat(String pattern, String format)
  {
    formats.put(Pattern.compile(pattern), new SimpleDateFormat(format));
  }
  
  public static void clearFormats()
  {
    formats.clear();
  }
  
  public static void setFormats(Map<Pattern, SimpleDateFormat> newFormats)
  {
    clearFormats();
    formats = newFormats;
  }
  
  public static Date createDate(String dateStr)
  {
    for (Pattern pattern : formats.keySet())
    {
      try
      {
        Matcher m = pattern.matcher(dateStr);
        if (m.matches())
        {
          return formats.get(pattern).parse(dateStr);
        }
      }
      catch(Exception ex)
      {
        // Try next one...
      }
    }
    
    return null;
  }
  
  public static java.sql.Date createSqlDate(String dateStr)
  {
    Date date = createDate(dateStr);
    if (date != null)
    {
      return new java.sql.Date(date.getTime());
    }
    
    return null;
  }
  
  public static SimpleDateFormat guessFormat(List<String> dateStr)
  {
    // Linked hashmap is important to preserve the order in which we try the
    // patterns, from most specific to least.
    Map<Pattern, Boolean> possibleFormats = new LinkedHashMap<Pattern, Boolean>();
    boolean allEmpty = true;
    
    for (Pattern pattern : formats.keySet())
    {
      possibleFormats.put(pattern, true);
    }
    
    for (String str : dateStr)
    {
      if (str != null && str.length() > 0)
      {
        allEmpty = false;
        for (Pattern pattern : formats.keySet())
        {
          if (possibleFormats.get(pattern))
          {
            try
            {
              Matcher m = pattern.matcher(str);
              // If it matches, try parsing the date with the associated
              // formatter.
              // Exceptions result in this formatter being dropped from
              // consideration.
              if (m.matches())
              {
                formats.get(pattern).parse(str);
              }
              // Violation, can't be this type.
              else
              {
                // System.out.println("Regex: '" + pattern + "' failed on: '"
                // + str + "'");
                possibleFormats.put(pattern, false);
              }
            }
            catch(Exception ex)
            {
              // System.out.println("Pattern: '" + pattern + "' failed on: '"
              // + str + "'");
              possibleFormats.put(pattern, false);
            }
          }
        }
      }
    }
    
    if (!allEmpty)
    {
      for (Pattern pattern : possibleFormats.keySet())
      {
        if (possibleFormats.get(pattern))
        {
          return formats.get(pattern);
        }
      }
    }
    
    return null;
  }
  
  public static SimpleDateFormat guessFormat(String dateStr[])
  {
    List<String> dateList = new ArrayList<String>();
    if (dateStr != null && dateStr.length > 0)
    {
      for (String str : dateStr)
      {
        dateList.add(str);
      }
      return guessFormat(dateList);
    }
    return null;
  }
  
  public static void formatList(SimpleDateFormat fmt, List<String> strings)
  {
    if (strings != null && strings.size() > 0)
    {
      for (String str : strings)
      {
        try
        {
          System.out.println(new Timestamp(fmt.parse(str).getTime()));
        }
        catch(Exception ex)
        {
          // ex.printStackTrace();
        }
      }
    }
  }
  
  public static SimpleDateFormat test(List<String> strings)
  {
    SimpleDateFormat fmt = DateUtil.guessFormat(strings);
    System.out.println("Format: [" + StringUtils.join(strings, ",") + "] = '"
        + ((fmt != null) ? fmt.toPattern() : "None") + "'");
    formatList(fmt, strings);
    return fmt;
  }
  
  public static void main(String args[])
  {
    // Set up formats.
    String configPath = (System.getProperties().contains("dex.config")) ? System
        .getProperties().getProperty("dex.config") : "dex.json";
    DateUtil.clearFormats();
    try
    {
      Object config = JsonUtil.pathToObject(configPath);
      
      Map<String, Object> map = (Map<String, Object>) config;
      List<Object> dateFormats = (List) map.get("dateFormats");
      
      for (Object obj : dateFormats)
      {
        Map<String, String> spec = (Map<String, String>) obj;
        String name = spec.get("name");
        String pattern = spec.get("pattern");
        String format = spec.get("format");
        System.out.println("Adding date format: name='" + name + "', pattern='"
            + pattern + "', format='" + format + "'");
        DateUtil.addFormat(pattern, format);
      }
      
      for (Object obj : dateFormats)
      {
        Map<String, Object> spec = (Map<String, Object>) obj;
        
        List<String> tests = (List<String>) spec.get("tests");
        System.out.println("=============================");
        System.out.println("TESTING: " + spec.get("name"));
        System.out.println("============================");
        SimpleDateFormat df = test(tests);
        System.out.println("Matched Format: '"
            + ((df == null) ? "" : df.toPattern()) + "'");
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
  }
}
