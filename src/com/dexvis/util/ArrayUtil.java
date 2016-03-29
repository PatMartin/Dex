package com.dexvis.util;

/**
 * 
 * This package contains utilities for arrays.
 * 
 */
public class ArrayUtil
{

  /**
   * 
   * This routine joins the elements of an array seperated by a specified
   * string.
   * 
   * @param joinString
   *          The string to seperate elements by.
   * @param joinArray
   *          The array to join.
   * 
   * @return The array elements will be joined into a single string with the
   *         supplied joinString as their seperation delimiter.
   * 
   */
  public static String join(String joinString, String[] joinArray)
  {
    if (joinArray.length < 1)
      return null;

    String retStr = joinArray[0];

    for (int i = 1; i < joinArray.length; i++)
    {
      retStr = retStr + joinString + joinArray[i];
    }

    return retStr;
  }

  /**
   * 
   * This routine joins the elements of an array seperated by a specified
   * string.
   * 
   * @param array1
   *          The first array to join.
   * @param array2
   *          The second array to join.
   * 
   * @return The array elements will be joined into a single array with array1
   *         overlayed on top of array2.
   * 
   */
  public static String[] join(String array1[], String array2[])
  {
    if (array1 == null)
      array1 = new String[0];

    if (array2 == null)
      array2 = new String[0];

    String result[] = new String[array1.length + array2.length];

    System.arraycopy(array1, 0, result, 0, array1.length);
    System.arraycopy(array2, 0, result, array1.length, array2.length);

    return result;
  }

  public static boolean contains(String array[], String key)
  {
    if (array == null || array.length <= 0)
      return false;

    for (int i = 0; i < array.length; i++)
      if (array[i] != null && array[i].equals(key))
        return true;

    return false;
  }

  public static int indexOfIgnoreCase(String array[], String key)
  {
    try
    {
      for (int i = 0; i < array.length; i++)
      {
        if (array[i].equalsIgnoreCase(key))
          return i;
      }
    }
    catch(Exception ex)
    {
    }

    return -1;
  }

  public static int index(String array[], String key)
  {
    try
    {
      for (int i = 0; i < array.length; i++)
      {
        if (array[i].equals(key))
          return i;
      }
    }
    catch(Exception ex)
    {
    }
    return -1;
  }
}
