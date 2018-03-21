package com.dexvis.util;

import java.io.File;

/**
 * 
 * This package contains utilities for file paths.
 * 
 */
public class PathUtil
{
  public static String getRelativePath(File file)
  {
    if (file == null)
    {
      return null;
    }
    
    String filePath = file.getAbsolutePath();
    String userDir = System.getProperty("user.dir");
    
    if (userDir != null && userDir.length() > 0 && filePath.startsWith(userDir))
    {
      // Including the file separator.
      filePath = filePath.substring(userDir.length() + File.separator.length());
    }
    return filePath;
  }
}
