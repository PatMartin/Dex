package com.dexvis.util;

import java.sql.Timestamp;

/**
  *  This class provides time related utilities.
  *
  *  @author  Patrick E. Martin
  *  @version 1.0
  *
  **/
public class SqlTimeFactory
{
  /**
    *
    *  This routine returns a timestamp containing the current time.
    *
    *  @return A Timestamp containing the current time as known
    *          by the machine on which this routine is called.
    *
    **/
  public static Timestamp currentTime()
  {
    return new Timestamp((new java.util.Date()).getTime());
  }

  /**
    *
    *  This routine returns a timestamp containing the current time offset
    *  by a specified number of milliseconds.
    *
    *  @param offset The number of milliseconds to offset this time by.
    *
    *  @return A Timestamp containing the current time offset
    *          by the given offset.  Current time is the current time
    *          as known by the machine on which this routine is called.
    *
    **/
  public static Timestamp relativeTime(long offset)
  {
    return new Timestamp((new java.util.Date()).getTime() + offset);
  }

  /**
    *
    *  This is a convenience function to convert a java.util.date to a
    *  Timestamp.
    *
    *  @param date The date to convert.
    *
    *  @return A Timestamp equivalent to the given date.
    *
    **/
  public static Timestamp date2Timestamp(java.util.Date date)
  {
    //return new Timestamp(date.getYear(), date.getMonth(),
    //			   date.getDate(), date.getHours(),
    //			   date.getMinutes(), date.getSeconds(), 0);
    return new Timestamp(date.getTime());
  }
}
