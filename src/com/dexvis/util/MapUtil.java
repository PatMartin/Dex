package com.dexvis.util;

import java.util.Map;

import com.dexvis.exception.ElementNotFoundException;

/**
 * 
 * 
 * This package contains miscellaneous routines for dealing with hashmaps. Most
 * are also applicable to Properties as well.
 * 
 */
public class MapUtil
{
  /**
   * 
   * Return the integer value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * 
   * @exception ElementNotFoundException
   *              This indicates that there is no element in "map: which is
   *              referenced by "key".
   * 
   * @returns The int value of the element in "map" referenced by "key".
   * 
   */
  public final static int getInt(Map map, Object key)
      throws ElementNotFoundException
  {
    if (!map.containsKey(key))
      throw new ElementNotFoundException(key + " not found.");

    return (new Integer(map.get(key).toString())).intValue();
  }

  public final static boolean getBoolean(Map map, Object key)
  {
    return getBoolean(map, key, false);
  }

  public final static boolean getBoolean(Map map, Object key,
      boolean defaultValue)
  {
    if (!map.containsKey(key))
      return defaultValue;

    if (map.get(key).toString().trim().equalsIgnoreCase("TRUE"))
      return true;

    return false;
  }

  /**
   * 
   * Return the integer value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * @param defaultValue
   *          The default value, should "map" contain no element referenced by
   *          "key".
   * 
   * @returns The int value of the element in "map" referenced by "key" or
   *          "defaultValue", should none be found.
   * 
   */
  public final static int getInt(Map map, Object key, int defaultValue)
  {
    if (!map.containsKey(key))
      return defaultValue;

    return (new Integer(map.get(key).toString())).intValue();
  }

  /**
   * 
   * Return the long value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * 
   * @exception ElementNotFoundException
   *              This indicates that there is no element in "map: which is
   *              referenced by "key".
   * 
   * @returns The long value of the element in "map" referenced by "key".
   * 
   */
  public final static long getLong(Map map, Object key)
      throws ElementNotFoundException
  {
    if (!map.containsKey(key))
      throw new ElementNotFoundException(key + " not found.");

    return (new Long(map.get(key).toString())).longValue();
  }

  /**
   * 
   * Return the long value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * @param defaultValue
   *          The default value, should "map" contain no element referenced by
   *          "key".
   * 
   * @returns The long value of the element in "map" referenced by "key" or
   *          "defaultValue", should none be found.
   * 
   */
  public final static long getLong(Map map, Object key, long defaultValue)
  {
    if (!map.containsKey(key))
      return defaultValue;

    return (new Long(map.get(key).toString())).longValue();
  }

  /**
   * 
   * Return the float value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * 
   * @exception ElementNotFoundException
   *              This indicates that there is no element in "map: which is
   *              referenced by "key".
   * 
   * @returns The float value of the element in "map" referenced by "key".
   * 
   */
  public final static float getFloat(Map map, Object key)
      throws ElementNotFoundException
  {
    if (!map.containsKey(key))
      throw new ElementNotFoundException(key + " not found.");

    return (new Float(map.get(key).toString())).floatValue();
  }

  /**
   * 
   * Return the float value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * @param defaultValue
   *          The default value, should "map" contain no element referenced by
   *          "key".
   * 
   * @returns The float value of the element in "map" referenced by "key" or
   *          "defaultValue", should none be found.
   * 
   */
  public final static float getFloat(Map map, Object key, float defaultValue)
  {
    if (!map.containsKey(key))
      return defaultValue;

    return (new Float(map.get(key).toString())).floatValue();
  }

  /**
   * 
   * Return the double value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * 
   * @exception ElementNotFoundException
   *              This indicates that there is no element in "map: which is
   *              referenced by "key".
   * 
   * @returns The double value of the element in "map" referenced by "key".
   * 
   */
  public final static double getDouble(Map map, Object key)
      throws ElementNotFoundException
  {
    if (!map.containsKey(key))
      throw new ElementNotFoundException(key + " not found.");

    return (new Double(map.get(key).toString())).doubleValue();
  }

  /**
   * 
   * Return the double value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * @param defaultValue
   *          The default value, should "map" contain no element referenced by
   *          "key".
   * 
   * @returns The double value of the element in "map" referenced by "key" or
   *          "defaultValue", should none be found.
   * 
   */
  public final static double getDouble(Map map, Object key, double defaultValue)
  {
    if (!map.containsKey(key))
      return defaultValue;

    return (new Double(map.get(key).toString())).doubleValue();
  }

  /**
   * 
   * Return the String value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * 
   * @exception ElementNotFoundException
   *              This indicates that there is no element in "map: which is
   *              referenced by "key".
   * 
   * @returns The String value of the element in "map" referenced by "key".
   * 
   */
  public final static String getString(Map map, Object key)
      throws ElementNotFoundException
  {
    if (!map.containsKey(key))
      throw new ElementNotFoundException(key + " not found.");

    return map.get(key).toString().trim();
  }

  /**
   * 
   * Return the String value of the element referenced by "key".
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * @param defaultValue
   *          The default value, should "map" contain no element referenced by
   *          "key".
   * 
   * @returns The String value of the element in "map" referenced by "key" or
   *          "defaultValue", should none be found.
   * 
   */
  public final static String getString(Map map, Object key, String defaultValue)
  {
    return getString(map, key, defaultValue, false);
  }

  /**
   * 
   * Return the String value of the element referenced by "key".
   * 
   * @param map
   *          The map to search in.
   * @param key
   *          The key of the map.
   * @param defaultValue
   *          The default value, should "map" contain no element referenced by
   *          "key".
   * @param defaultValueOnEmpty
   *          A boolean, when set to true will cause the default value to be
   *          taken when the map element exists, but is zero length.
   * 
   * @returns The String value of the element in "map" referenced by "key" or
   *          "defaultValue", should none be found.
   * 
   */
  public final static String getString(Map map, Object key, String defaultValue,
      boolean defaultValueOnEmpty)
  {
    if (!map.containsKey(key))
      return defaultValue;

    if (defaultValueOnEmpty && map.get(key).toString().trim().length() <= 0)
      return defaultValue;

    return map.get(key).toString().trim();
  }

  public static boolean containsKeys(Map map, Object keys[])
  {
    if (map == null || keys == null)
      return false;

    // Check for existence of each key.
    for (int i = 0; i < keys.length; i++)
      if (!map.containsKey(keys[i]))
        return false;

    // If we fall through to here, all keys must have existed.
    return true;
  }

  /**
   * 
   * Return the string value of the element referenced by key. If the element
   * doesn't exist, or is shorter than minLength, return the default value. If
   * the element's length exceeds maxlength, truncate the returned value to
   * maxLength characters.
   * 
   * @param map
   *          The hashmap to search.
   * @param key
   *          The key index of the element.
   * @param defaultValue
   *          The default value to fall back on.
   * @param minLength
   *          The minimum length of the element.
   * @param maxLength
   *          The maximum length of the element.
   * 
   * @return The string value of the element referenced by key.
   */
  public final static String getString(Map map, Object key, String defaultValue,
      int minLength, int maxLength)
  {
    String returnString = "";

    // Return the default value if the hashmap doesn't contain the object.
    if (!map.containsKey(key))
      return defaultValue;

    // Set the return string to the requested object.
    returnString = map.get(key).toString().trim();

    // If the object isn't of the desired length, return the default value.
    if (returnString.length() < minLength)
      return defaultValue;

    // If the object is longer than the desired length, truncate the value
    // and return the substring.
    if (returnString.length() > maxLength)
      return returnString.substring(0, maxLength);

    // Return the string.
    return returnString;
  }

  /**
   * 
   * Return the String value of the element referenced by "key" and turn it to
   * all lowercase.
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * 
   * @exception ElementNotFoundException
   *              This indicates that there is no element in "map: which is
   *              referenced by "key".
   * 
   * @return The String value of the element in "map" referenced by "key" and
   *         converted to lower case.
   * 
   */
  public final static String getLowerCaseString(Map map, Object key)
      throws ElementNotFoundException
  {
    return getString(map, key).toLowerCase();
  }

  /**
   * 
   * Return the String value of the element referenced by "key" and and
   * converted to lowercase.
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * @param defaultValue
   *          The default value, should "map" contain no element referenced by
   *          "key".
   * 
   * @returns The String value of the element in "map" referenced by "key" and *
   *          converted to lowercase or "defaultValue", should none be found.
   * 
   */
  public final static String getLowerCaseString(Map map, Object key,
      String defaultValue)
  {
    return getString(map, key, defaultValue).toLowerCase();
  }

  /**
   * 
   * Return the string value of the element referenced by key. If the element
   * doesn't exist, or is shorter than minLength, return the default value. If
   * the element's length exceeds maxlength, truncate the returned value to
   * maxLength characters. Convert the result to lowercase when finished.
   * 
   * @param map
   *          The hashmap to search.
   * @param key
   *          The key index of the element.
   * @param defaultValue
   *          The default value to fall back on.
   * @param minLength
   *          The minimum length of the element.
   * @param maxLength
   *          The maximum length of the element.
   * 
   * @return The string value of the element referenced by key and converted to
   *         lowercase.
   * 
   */
  public final static String getLowerCaseString(Map map, Object key,
      String defaultValue, int minLength, int maxLength)
  {
    return getString(map, key, defaultValue, minLength, maxLength).toLowerCase();
  }

  /**
   * 
   * Return the String value of the element referenced by "key" and turn it to
   * all uppercase.
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * 
   * @exception ElementNotFoundException
   *              This indicates that there is no element in "map: which is
   *              referenced by "key".
   * 
   * @return The String value of the element in "map" referenced by "key" and
   *         converted to upper case.
   * 
   */
  public final static String getUpperCaseString(Map map, Object key)
      throws ElementNotFoundException
  {
    return getString(map, key).toUpperCase();
  }

  /**
   * 
   * Return the String value of the element referenced by "key" and and
   * converted to uppercase.
   * 
   * @param map
   *          The hashmap to search in.
   * @param key
   *          The key of the hashmap.
   * @param defaultValue
   *          The default value, should "map" contain no element referenced by
   *          "key".
   * 
   * @returns The String value of the element in "map" referenced by "key" and *
   *          converted to uppercase or "defaultValue", should none be found.
   * 
   */
  public final static String getUpperCaseString(Map map, Object key,
      String defaultValue)
  {
    return getString(map, key, defaultValue).toUpperCase();
  }

  /**
   * 
   * Return the string value of the element referenced by key. If the element
   * doesn't exist, or is shorter than minLength, return the default value. If
   * the element's length exceeds maxlength, truncate the returned value to
   * maxLength characters. Convert the result to uppercase when finished.
   * 
   * @param map
   *          The hashmap to search.
   * @param key
   *          The key index of the element.
   * @param defaultValue
   *          The default value to fall back on.
   * @param minLength
   *          The minimum length of the element.
   * @param maxLength
   *          The maximum length of the element.
   * 
   * @return The string value of the element referenced by key and converted to
   *         uppercase.
   * 
   */
  public final static String getUpperCaseString(Map map, Object key,
      String defaultValue, int minLength, int maxLength)
  {
    return getString(map, key, defaultValue, minLength, maxLength).toUpperCase();
  }
}
