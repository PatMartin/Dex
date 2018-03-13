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
  private static final String START = "^";
  private static final String END = "$";
  private static final String MM = "((0[1-9])|(1[0-2]))";
  private static final String DD = "((0[1-9])|([12][0-9])|(3[01]))";
  private static final String HH = "\\d{2}";
  private static final String mm = "\\d{2}";
  private static final String ss = "\\d{2}";
  private static final String YYYY = "\\d{4}";
  
  private static Map<Pattern, SimpleDateFormat> formats = new LinkedHashMap<Pattern, SimpleDateFormat>()
  {
    {
      // 8 digits assumed to be yyyyMMdd
      put(Pattern.compile(START + YYYY + MM + DD + END), new SimpleDateFormat(
          "yyyyMMdd"));
      
      // dd.MM.yyyy variations
      put(Pattern.compile(START + DD + "-" + MM + "-" + YYYY + END),
          new SimpleDateFormat("dd-MM-yyyy"));
      put(Pattern.compile(START + DD + "/" + MM + "/" + YYYY + END),
          new SimpleDateFormat("dd/MM/yyyy"));
      
      // MM.dd.yyyy variations
      put(Pattern.compile(START + MM + "-" + DD + "-" + YYYY + END),
          new SimpleDateFormat("MM-dd-yyyy"));
      put(Pattern.compile(START + MM + "/" + DD + "/" + YYYY + END),
          new SimpleDateFormat("MM/dd/yyyy"));
      
      // yyyy.MM.dd variations
      put(Pattern.compile(START + YYYY + "-" + MM + "-" + DD + END),
          new SimpleDateFormat("yyyy-MM-dd"));
      put(Pattern.compile(START + YYYY + "/" + MM + "/" + DD + END),
          new SimpleDateFormat("yyyy/MM/dd"));
      
      // yyyy.dd.MM variations
      put(Pattern.compile(START + YYYY + "-" + DD + "-" + MM + END),
          new SimpleDateFormat("yyyy-dd-MM"));
      put(Pattern.compile(START + YYYY + "/" + DD + "/" + MM + END),
          new SimpleDateFormat("yyyy/dd/MM"));
      
      // MM.yyyy variations
      put(Pattern.compile(START + MM + "-" + YYYY + END), new SimpleDateFormat(
          "MM-yyyy"));
      put(Pattern.compile(START + MM + "/" + YYYY + END), new SimpleDateFormat(
          "MM/yyyy"));
      put(Pattern.compile(START + MM + "\\s" + YYYY + END),
          new SimpleDateFormat("MM yyyy"));
      
      // yyyy.MM variations
      put(Pattern.compile(START + YYYY + "-" + MM + END), new SimpleDateFormat(
          "yyyy-MM"));
      put(Pattern.compile(START + YYYY + "/" + MM + END), new SimpleDateFormat(
          "yyyy/MM"));
      put(Pattern.compile(START + YYYY + "\\s" + MM + END),
          new SimpleDateFormat("yyyy MM"));
      
      put(Pattern.compile(START + YYYY + "-" + MM + "-" + DD + "T" + HH + ":"
          + mm + ":" + ss + "Z" + END), new SimpleDateFormat(
          "yyyy-MM-dd'T'HH:mm:ss'Z'"));
      put(Pattern.compile(START + YYYY + "/" + MM + "/" + DD + "T" + HH + ":"
          + mm + ":" + ss + "Z" + END), new SimpleDateFormat(
          "yyyy/MM/dd'T'HH:mm:ss'Z'"));
      
      put(Pattern.compile(START + YYYY + "-" + MM + "-" + DD + "T" + HH + ":"
          + mm + ":" + ss + END), new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"));
      put(Pattern.compile(START + YYYY + "/" + MM + "/" + DD + "T" + HH + ":"
          + mm + ":" + ss + END), new SimpleDateFormat("yyyy/MM/dd'T'HH:mm:ss"));
      
      put(Pattern.compile(START + YYYY + "-" + MM + "-" + DD + "T" + HH + ":"
          + mm + END), new SimpleDateFormat("yyyy-MM-dd'T'HH:mm"));
      put(Pattern.compile(START + YYYY + "/" + MM + "/" + DD + "T" + HH + ":"
          + mm + END), new SimpleDateFormat("yyyy/MM/dd'T'HH:mm"));
      
      put(Pattern.compile(START + YYYY + "-" + MM + "-" + DD + "\\s" + HH + ":"
          + mm + END), new SimpleDateFormat("yyyy-MM-dd HH:mm"));
      put(Pattern.compile(START + YYYY + "/" + MM + "/" + DD + "\\s" + HH + ":"
          + mm + END), new SimpleDateFormat("yyyy/MM/dd HH:mm"));
      
      // put(Pattern.compile("^\\d{1,2}\\s[a-z]{4,}\\s\\d{4}$"),
      // new SimpleDateFormat("dd MMMM yyyy"));
      // put(Pattern.compile("^\\d{12}$"), new
      // SimpleDateFormat("yyyyMMddHHmm"));
      // put(Pattern.compile("^\\d{8}\\s\\d{4}$"), new SimpleDateFormat(
      // "yyyyMMdd HHmm"));
      // put(Pattern.compile("^\\d{1,2}-\\d{1,2}-\\d{4}\\s\\d{1,2}:\\d{2}$"),
      // new SimpleDateFormat("dd-MM-yyyy HH:mm"));
      // put(Pattern.compile("^\\d{4}-\\d{1,2}-\\d{1,2}\\s\\d{1,2}:\\d{2}$"),
      // new SimpleDateFormat("yyyy-MM-dd HH:mm"));
      // put(Pattern.compile("^\\d{1,2}/\\d{1,2}/\\d{4}\\s\\d{1,2}:\\d{2}$"),
      // new SimpleDateFormat("MM/dd/yyyy HH:mm"));
      // put(Pattern.compile("^\\d{4}/\\d{1,2}/\\d{1,2}\\s\\d{1,2}:\\d{2}$"),
      // new SimpleDateFormat("yyyy/MM/dd HH:mm"));
      // put(Pattern.compile("^\\d{1,2}\\s[a-z]{3}\\s\\d{4}\\s\\d{1,2}:\\d{2}$"),
      // new SimpleDateFormat("dd MMM yyyy HH:mm"));
      // put(Pattern.compile("^\\d{1,2}\\s[a-z]{4,}\\s\\d{4}\\s\\d{1,2}:\\d{2}$"),
      // new SimpleDateFormat("dd MMMM yyyy HH:mm"));
      // put(Pattern.compile("^\\d{14}$"), new
      // SimpleDateFormat("yyyyMMddHHmmss"));
      // put(Pattern.compile("^\\d{8}\\s\\d{6}$"), new SimpleDateFormat(
      // "yyyyMMdd HHmmss"));
      // put(Pattern
      // .compile("^\\d{1,2}-\\d{1,2}-\\d{4}\\s\\d{1,2}:\\d{2}:\\d{2}$"),
      // new SimpleDateFormat("dd-MM-yyyy HH:mm:ss"));
      // put(Pattern
      // .compile("^\\d{4}-\\d{1,2}-\\d{1,2}\\s\\d{1,2}:\\d{2}:\\d{2}$"),
      // new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
      // put(Pattern
      // .compile("^\\d{1,2}/\\d{1,2}/\\d{4}\\s\\d{1,2}:\\d{2}:\\d{2}$"),
      // new SimpleDateFormat("MM/dd/yyyy HH:mm:ss"));
      // put(Pattern
      // .compile("^\\d{4}/\\d{1,2}/\\d{1,2}\\s\\d{1,2}:\\d{2}:\\d{2}$"),
      // new SimpleDateFormat("yyyy/MM/dd HH:mm:ss"));
      // put(Pattern
      // .compile("^\\d{1,2}\\s[a-z]{3}\\s\\d{4}\\s\\d{1,2}:\\d{2}:\\d{2}$"),
      // new SimpleDateFormat("dd MMM yyyy HH:mm:ss"));
      // put(Pattern
      // .compile("^\\d{1,2}\\s[a-z]{4,}\\s\\d{4}\\s\\d{1,2}:\\d{2}:\\d{2}$"),
      // new SimpleDateFormat("dd MMMM yyyy HH:mm:ss"));
      
    }
  };
  
  public static void addFormat(String pattern, String format)
  {
    formats.put(Pattern.compile(pattern), new SimpleDateFormat(format));
  }
  
  public static void setFormats(Map<Pattern, SimpleDateFormat> newFormats)
  {
    formats.clear();
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
    for (String str : dateStr)
    {
      dateList.add(str);
    }
    return guessFormat(dateList);
  }
  
  public static void formatList(SimpleDateFormat fmt, String strings[])
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
  
  public static void test(String strings[])
  {
    SimpleDateFormat fmt = DateUtil.guessFormat(strings);
    System.out.println("Format: [" + StringUtils.join(strings, ",") + "] = '"
        + ((fmt != null) ? fmt.toPattern() : "None") + "'");
    formatList(fmt, strings);
  }
  
  public static void main(String args[])
  {
    // Basic ISO Date
    // test(new String[] { "19991231" });
    
    // Test 1: MM-dd-yyyy
    // test(new String[] { "12-21-2016" });
    // test(new String[] { "12/21/2016" });
    
    // Test 2: dd-MM-yyyy
    // test(new String[] { "21-12-2016" });
    // test(new String[] { "21/12/2016" });
    
    // Test 3: yyyy.MM.dd variations
    // test(new String[] { "2015-12-21" });
    // test(new String[] { "2015/12/21" });
    
    // Test 4: yyyy.dd.MM variations
    // test(new String[] { "2015-21-12" });
    // test(new String[] { "2015-21-12" });
    
    // Test 5: MM.yyyy
    // test(new String[] { "12/2015" });
    // test(new String[] { "12-2015" });
    // test(new String[] { "12 2015" });
    
    // Test 6: MM.yyyy
    // test(new String[] { "2015-12" });
    // test(new String[] { "2015/12" });
    // test(new String[] { "2015 12" });
    
    // Test 7: yyyy.MM.dd'T'HH:mm:ss'Z' variations
    // ISO_INSTANT
    //test(new String[] { "1968-07-29T08:30:12Z" });
    //test(new String[] { "1968/07/29T08:30:12Z" });
    
    // Test 8: yyyy.MM.dd'T'HH:mm:ss variations
    // test(new String[] { "1968-07-29T08:30:12" });
    // test(new String[] { "1968/07/29T08:30:12" });
    
    // Test 9: yyyy.MM.dd'T'HH:mm variations
    // test(new String[] { "1968-07-29T08:30" });
    // test(new String[] { "1968/07/29T08:30" });
    
    // Test 10: yyyy.MM.dd HH:mm variations
    // test(new String[] { "1968-07-29 08:30" });
    // test(new String[] { "1968/07/29 08:30" });
    
    // Test 4: MM/dd/yyyy hh:ss
    // test(new String[] { "12/21/2015 21:14" });
    
    // dateStrings.add("21-12-2015");
    // dateStrings.add("21/12/2015");
    //
    // dateStrings.add("");
    // dateStrings.add(null);
    // dateStrings.add("22/2/2015");
    
  }
}
