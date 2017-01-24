package com.dexvis.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class DateUtil
{
  private static SimpleDateFormat df[] = {
      new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"),
      new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ"),
      new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
      new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ"),
      new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss"),
      new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"),
      new SimpleDateFormat("MM/dd/yyyy'T'HH:mm:ss.SSS'Z'"),
      new SimpleDateFormat("MM/dd/yyyy'T'HH:mm:ss.SSSZ"),
      new SimpleDateFormat("MM/dd/yyyy'T'HH:mm:ss.SSS"),
      new SimpleDateFormat("MM/dd/yyyy'T'HH:mm:ssZ"),
      new SimpleDateFormat("MM/dd/yyyy'T'HH:mm:ss"),
      new SimpleDateFormat("MM/dd/yyyy HH:mm:ss"),
      new SimpleDateFormat("MM/dd/yyyy HH:mm"),
      new SimpleDateFormat("MM/dd/yyyy"),
      new SimpleDateFormat("yyyy:MM:dd HH:mm:ss"),
      new SimpleDateFormat("yyyyMMdd") };
  
  public static Date createDate(String dateStr)
  {
    Date returnDate;
    for (int i = 0; i < df.length; i++)
    {
      try
      {
        returnDate = df[i].parse(dateStr);
        return returnDate;
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
    Map<SimpleDateFormat, Boolean> possibleFormats = new LinkedHashMap<SimpleDateFormat, Boolean>();
    Date tmpDate;
    boolean allEmpty = true;
    
    for (SimpleDateFormat fmt : df)
    {
      possibleFormats.put(fmt, true);
    }
    
    for (String str : dateStr)
    {
      if (str != null && str.length() > 0)
      {
        allEmpty = false;
        for (SimpleDateFormat fmt : possibleFormats.keySet())
        {
          if (possibleFormats.get(fmt))
          {
            try
            {
              tmpDate = fmt.parse(str);
            }
            catch(Exception ex)
            {
              System.out.println("Pattern: '" + fmt.toPattern()
                  + "' failed on: '" + str + "'");
              possibleFormats.put(fmt, false);
            }
          }
        }
      }
    }
    
    if (!allEmpty)
    {
      for (SimpleDateFormat fmt : possibleFormats.keySet())
      {
        if (possibleFormats.get(fmt))
        {
          return fmt;
        }
      }
    }
    
    return null;
  }
  
  public static void main(String args[])
  {
    List<String> dateStrings = new ArrayList<String>();
    
    dateStrings.add("12/14/2015 21:14");
    // dateStrings.add("21/12/2015");
    // dateStrings.add("");
    // dateStrings.add(null);
    // dateStrings.add("22/2/2015");
    
    SimpleDateFormat fmt = DateUtil.guessFormat(dateStrings);
    System.out.println("Format: '" + fmt.toPattern() + "'");
    for (String dateStr : dateStrings)
    {
      try
      {
        System.out.println(new Timestamp(fmt.parse(dateStr).getTime()));
      }
      catch(Exception ex)
      {
        // ex.printStackTrace();
      }
    }
  }
}
