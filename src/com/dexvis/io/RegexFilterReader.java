package com.dexvis.io;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.regex.Pattern;

public class RegexFilterReader extends BufferedReader
{
  private Pattern pattern = null;
  
  public RegexFilterReader(Reader in, String pattern)
  {
    super(in);
    this.pattern = Pattern.compile(pattern);
  }
  
  public final String readLine() throws IOException
  {
    String line;
    do
    {
      line = super.readLine();
      //System.out.println("MATCH: " + pattern.matcher(line).matches() + ", LINE: " + line);
    }
    while ((line != null) && !pattern.matcher(line).matches());
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
            args[0]);
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
