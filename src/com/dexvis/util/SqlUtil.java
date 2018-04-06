package com.dexvis.util;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.sql.DataSource;

import com.dexvis.dex.Dex;
import com.dexvis.dex.DexData;

/**
 * 
 * This class defines useful utilities for dealing with the jdbc.
 * 
 * @author Patrick E. Martin
 * @version 1.0
 * 
 */
public class SqlUtil
{
  private static Logger logger = Logger.getLogger(SqlUtil.class.getName());
  
  /**
   * 
   * Close a statement silently, handle all exceptions, should they occur.
   * 
   * @param stmt
   *          The statement to close.
   * 
   * @return Always a null value so the statement may be nulled out and closed
   *         in one line.
   * 
   */
  public final static Statement close(Statement stmt)
  {
    try
    {
      if (stmt != null)
      {
        synchronized (stmt)
        {
          stmt.close();
        }
      }
    }
    catch(Exception ex)
    {
      logger.log(Level.SEVERE, "Couldn't close statement.", ex);
    }
    return null;
  }
  
  /**
   * 
   * Close a statement silently, handle all exceptions, should they occur.
   * 
   * @param stmt
   *          The statement to close.
   * 
   * @return Always a null value so the statement may be nulled out and closed
   *         in one line.
   * 
   */
  public final static Statement close(PreparedStatement pstmt)
  {
    try
    {
      if (pstmt != null)
      {
        synchronized (pstmt)
        {
          pstmt.close();
        }
      }
    }
    catch(Exception ex)
    {
      logger.log(Level.SEVERE, "Couldn't close statement.", ex);
    }
    return null;
  }
  
  /**
   * 
   * Given an int datatype, return the java.sql.Types name for that datatype.
   * 
   * @param dataType
   *          The int datatype for which we need the string datatype name.
   * 
   * @return A string representation of the datatype name.
   * 
   */
  public static String getTypeName(int dataType)
  {
    switch (dataType)
    {
      case Types.BIGINT:
        return "BIGINT";
      case Types.BINARY:
        return "BINARY";
      case Types.BIT:
        return "BIT";
      case Types.CHAR:
        return "CHAR";
      case Types.DATE:
        return "DATE";
      case Types.DECIMAL:
        return "DECIMAL";
      case Types.DOUBLE:
        return "DOUBLE";
      case Types.FLOAT:
        return "FLOAT";
      case Types.INTEGER:
        return "INTEGER";
      case Types.LONGVARBINARY:
        return "LONGVARBINARY";
      case Types.LONGVARCHAR:
        return "LONGVARCHAR";
      case Types.NULL:
        return "NULL";
      case Types.NUMERIC:
        return "NUMERIC";
      case Types.OTHER:
        return "OTHER";
      case Types.REAL:
        return "REAL";
      case Types.SMALLINT:
        return "SMALLINT";
      case Types.TIME:
        return "TIME";
      case Types.TIMESTAMP:
        return "TIMESTAMP";
      case Types.TINYINT:
        return "TINYINT";
      case Types.VARBINARY:
        return "VARBINARY";
      case Types.VARCHAR:
        return "VARCHAR";
    }
    
    return "UNKNOWN";
  }
  
  /**
   * 
   * Close a connection silently, handle all exceptions, should they occur.
   * 
   * @param con
   *          The connection to close.
   * 
   * @return Always a null value so the connection may be nulled out and closed
   *         in one line.
   * 
   */
  public final static Connection close(Connection con)
  {
    try
    {
      if (con != null)
      {
        synchronized (con)
        {
          con.close();
        }
      }
    }
    catch(Exception ex)
    {
      logger.log(Level.SEVERE, "Couldn't close connection.", ex);
    }
    
    return null;
  }
  
  /**
   * 
   * Close a ResultSet silently, handle all exceptions, should they occur.
   * 
   * @param stmt
   *          The ResultSet to close.
   * 
   * @return Always a null value so the ResultSet may be nulled out and closed
   *         in one line.
   * 
   */
  public final static ResultSet close(ResultSet rs)
  {
    try
    {
      if (rs != null)
      {
        synchronized (rs)
        {
          rs.close();
        }
      }
    }
    catch(Exception ex)
    {
      logger.log(Level.SEVERE, "Couldn't close result set.", ex);
    }
    
    return null;
  }
  
  /**
   * 
   * Print an exception, or series of exceptions to the designated output
   * stream.
   * 
   * @param os
   *          The output stream to print to.
   * @param sqlEx
   *          The exception(s) to print.
   * 
   * 
   */
  public static void printExceptions(OutputStream os, SQLException sqlEx)
  {
    PrintWriter pw = new PrintWriter(os, true);
    while (sqlEx != null)
    {
      pw.println("----------------------------------------------");
      pw.println("ERROR CODE : " + sqlEx.getErrorCode());
      pw.println("ERROR STATE: " + sqlEx.getSQLState());
      sqlEx.printStackTrace(pw);
      sqlEx = sqlEx.getNextException();
    }
  }
  
  public static List<Map<String, Object>> getResultSet(ResultSet rs)
      throws SQLException
  {
    int i = 0;
    
    Map<String, Object> row = null;
    List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
    
    // Process the data.
    if (rs != null)
    {
      ResultSetMetaData rsmd = rs.getMetaData();
      int numCols = rsmd.getColumnCount();
      
      for (int r = 1; rs.next(); r++)
      {
        row = new HashMap<String, Object>();
        for (i = 1; i <= numCols; i++)
        {
          logger.fine(" COLUMN: '" + rsmd.getColumnName(i) + "'='"
              + rsmd.getColumnTypeName(i) + "'");
          if (rsmd.getColumnTypeName(i).equals("DATE"))
          {
            row.put(rsmd.getColumnLabel(i).trim(), rs.getTimestamp(i));
          }
          else
          {
            row.put(rsmd.getColumnLabel(i).trim(),
                "" + rs.getString(rsmd.getColumnLabel(i)));
          }
        }
        logger.finest("ROW[" + r + "]: " + row);
        resultList.add(row);
      }
    }
    
    return resultList;
  }
  
  public static List<Map<String, Object>> getResultSetNew(ResultSet rs)
      throws SQLException
  {
    int i = 0;
    Map<String, Object> row = null;
    List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
    
    // Process the data.
    if (rs != null)
    {
      ResultSetMetaData rsmd = rs.getMetaData();
      int numCols = rsmd.getColumnCount();
      
      while (rs.next())
      {
        row = new HashMap<String, Object>();
        for (i = 1; i <= numCols; i++)
        {
          if (rsmd.getColumnTypeName(i).equals("DATE"))
          {
            row.put(rsmd.getColumnLabel(i).trim(), rs.getTimestamp(i));
          }
          else
          {
            row.put(rsmd.getColumnLabel(i),
                "" + rs.getString(rsmd.getColumnLabel(i)));
          }
        }
        
        logger.finest("ROW: " + row);
        resultList.add(row);
      }
    }
    
    return resultList;
  }
  
  public static Connection getConnection(DataSource ds, String username,
      String password, int numTries, long retryWait) throws SQLException
  {
    Connection con = null;
    
    for (int i = 0; i < numTries; i++)
    {
      try
      {
        con = ds.getConnection(username, password);
      }
      catch(SQLException sqlEx)
      {
        if (i < (numTries - 1))
        {
          logger
              .severe("Attempt #"
                  + (i + 1)
                  + ", Unable to create connection from DataSource, trying again in "
                  + retryWait + " ms.");
          try
          {
            Thread.sleep(retryWait);
          }
          catch(Exception ex)
          {
          }
        }
        else
        {
          logger.severe("Unable to create connection from DataSource.");
          throw (sqlEx);
        }
      }
    }
    
    return con;
  }
  
  public static Connection getConnection(DataSource ds, int numTries,
      long retryWait) throws SQLException
  {
    Connection con = null;
    
    for (int i = 0; i < numTries; i++)
    {
      try
      {
        con = ds.getConnection();
      }
      catch(SQLException sqlEx)
      {
        if (i < (numTries - 1))
        {
          logger
              .severe("Attempt #"
                  + (i + 1)
                  + ", Unable to create connection from DataSource, trying again in "
                  + retryWait + " ms.");
          try
          {
            Thread.sleep(retryWait);
          }
          catch(Exception ex)
          {
          }
        }
        else
        {
          logger.severe("Unable to create connection from DataSource.");
          throw (sqlEx);
        }
      }
    }
    
    return con;
  }
}
