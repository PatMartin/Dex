package com.dexvis.dex.wf;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;

public class DexEnvironment
{
  private final static DexEnvironment INSTANCE = new DexEnvironment();
  
  private DexEnvironment()
  {
  }
  
  public static DexEnvironment getInstance()
  {
    return INSTANCE;
  }
  
  private static final String SYMBOLIC_VALUE_MARKER_START = "${";
  private static final String SYMBOLIC_VALUE_MARKER_END = "}";
  
  private Map<String, String> env = new HashMap<String, String>();
  
  public boolean isDefined(String name)
  {
    return env.containsKey(name);
  }
  
  public void setVariable(String name, String value)
  {
    env.put(name, value);
  }
  
  public String getVariable(String name)
  {
    return env.get(name);
  }
  
  public Set<String> keySet() {
    return env.keySet();
  }
  
  public String singleInterpolate(String templateString)
  {
    // pre-conditions
    if (env == null)
      return templateString;
    if (templateString == null)
      return templateString;
    if (templateString.length() < 1)
      return templateString;
    if (env.isEmpty())
      return templateString;
    
    // default the returned String to the templateString
    String returnString = templateString;
    String nextKey = null;
    String substitutionValue = null;
    String nextValueToBeSubstituted = null;
    
    // get a list of substitution valuesMap
    Iterator keys = env.keySet().iterator();
    
    while (keys.hasNext())
    {
      nextKey = (String) keys.next();
      substitutionValue = StringUtils.defaultString((String) env.get(nextKey));
      nextValueToBeSubstituted = SYMBOLIC_VALUE_MARKER_START + nextKey
          + SYMBOLIC_VALUE_MARKER_END;
      
      returnString = StringUtils.replace(returnString,
          nextValueToBeSubstituted, substitutionValue);
    }
    return returnString;
  }
  
  public String singleInterpolateAndAnnotate(String templateString)
  {
    // pre-conditions
    if (env == null)
      return templateString;
    if (templateString == null)
      return templateString;
    if (templateString.length() < 1)
      return templateString;
    if (env.isEmpty())
      return templateString;
    
    // default the returned String to the templateString
    String returnString = templateString;
    String nextKey = null;
    String substitutionValue = null;
    String nextValueToBeSubstituted = null;
    
    // get a list of substitution valuesMap
    Iterator keys = env.keySet().iterator();
    
    while (keys.hasNext())
    {
      nextKey = (String) keys.next();
      substitutionValue = "[" + nextKey + "="
          + StringUtils.defaultString((String) env.get(nextKey) + "]");
      nextValueToBeSubstituted = SYMBOLIC_VALUE_MARKER_START + nextKey
          + SYMBOLIC_VALUE_MARKER_END;
      
      returnString = StringUtils.replace(returnString,
          nextValueToBeSubstituted, substitutionValue);
    }
    return returnString;
  }
  
  public String interpolate(String templateString)
  {
    // pre-conditions
    if (env == null)
      return templateString;
    if (templateString == null)
      return templateString;
    if (templateString.length() < 1)
      return templateString;
    if (env.isEmpty())
      return templateString;
    
    String currentResult = templateString;
    String previousResult = null;
    while (!StringUtils.equals(currentResult, previousResult))
    {
      previousResult = currentResult;
      currentResult = singleInterpolate(previousResult);
    }
    
    return currentResult;
  }
  
  // TODO: Perfect time to merge routines and use some functional programming.
  // Path of least resistance for now.
  public String interpolateAndAnnotate(String templateString)
  {
    // pre-conditions
    if (env == null)
      return templateString;
    if (templateString == null)
      return templateString;
    if (templateString.length() < 1)
      return templateString;
    if (env.isEmpty())
      return templateString;
    
    System.out.println("Template String: '" + templateString + "'");
    String currentResult = templateString;
    String previousResult = null;
    while (!StringUtils.equals(currentResult, previousResult))
    {
      previousResult = currentResult;
      currentResult = singleInterpolateAndAnnotate(previousResult);
      System.out.println("Current Result: " + previousResult);
    }
    
    return currentResult;
  }
  
  public static void main(String args[])
  {
    DexEnvironment env = DexEnvironment.getInstance();
    env.setVariable("FOO", "BAR");
    env.setVariable("BAR", "BAZ");
    String str = "Hello World from ${${FOO}}!";
    System.out.println("STR: '" + env.interpolate(str) + "'");
  }
}
