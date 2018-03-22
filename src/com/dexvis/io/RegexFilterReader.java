package com.dexvis.io;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.regex.Pattern;

public class RegexFilterReader extends BufferedReader
{
  private Pattern pattern = null;
  private boolean firstLineIsHeader = false;
  private boolean firstLine = true;
  
  public RegexFilterReader(Reader in, String pattern)
  {
    super(in);
    this.pattern = Pattern.compile(pattern);
  }
  
  public RegexFilterReader(Reader in, String pattern, boolean firstLineIsHeader)
  {
    super(in);
    this.pattern = Pattern.compile(pattern);
    this.firstLineIsHeader = firstLineIsHeader;
  }
  
  public final String readLine() throws IOException
  {
    String line = null;
    if (firstLineIsHeader && firstLine)
    {
      firstLine = false;
      do
      {
        line = super.readLine();
      }
      while (line == null);
    }
    else {
      do
      {
        line = super.readLine();
      }
      while ((line != null) && !pattern.matcher(line).matches());
    }

    return line;
  }
  
  public static class Test
  {
    public static void main(String args[])
    {
      try
      {
        if (args.length != 2)
          throw new IllegalArgumentException("Wrong number of arguments");
        RegexFilterReader in = new RegexFilterReader(new FileReader(args[1]),
            args[0], true);
        String line;
        while ((line = in.readLine()) != null)
          System.out.println(line);
        in.close();
      }
      catch(Exception e)
      {
        System.err.println(e);
        System.out
            .println("Usage: java RegexFilterReader$Test <pattern> <file>");
      }
    }
  }
}
