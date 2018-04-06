package com.dexvis.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.dexvis.dex.DexConfig;
import com.dexvis.dex.DexData;
import com.dexvis.util.DateUtil;
import com.dexvis.util.SqlUtil;

public class JdbcTable
{
  private Connection con = null;
  private Statement stmt = null;
  private boolean strictTypes = false;
  private Map<String, String> typeMap = null;
  private List<String> dbTypes = new ArrayList<String>();
  private String tableName = null;
  private String insertSql = null;
  private Map<String, DateFormat> dateFmtMap = null;
  private boolean CREATED = false;
  private PreparedStatement insertPStmt = null;
  private List<String> columnTypes = new ArrayList<String>();
  private List<String> columnNames = null;
  private int rowCount = 0;
  private int errorCount = 0;
  private int maxStringSize = 4000;
  
  public JdbcTable(String dbName, String tableName)
      throws ClassNotFoundException, SQLException
  {
    this((Map<String, String>) DexConfig.getDatabase(dbName).get("typeMap"),
        (String) DexConfig.getDatabase(dbName).get("driver"),
        (String) DexConfig.getDatabase(dbName).get("url"), (String) DexConfig
            .getDatabase(dbName).get("username"), (String) DexConfig
            .getDatabase(dbName).get("password"), tableName);
  }
  
  public JdbcTable(String dbName, String driver, String url, String username,
      String password, String tableName) throws SQLException,
      ClassNotFoundException
  {
    this((Map<String, String>) DexConfig.getDatabase(dbName).get("typeMap"),
        driver, url, username, password, tableName);
  }
  
  public JdbcTable(Map<String, String> typeMap, String driver, String url,
      String username, String password, String tableName) throws SQLException,
      ClassNotFoundException
  {
    // Get a connection and set autocommit to false
    Class.forName(driver);
    con = DriverManager.getConnection(url, username, password);
    con.setAutoCommit(true);
    
    // Setup instance variables.
    this.stmt = con.createStatement();
    this.typeMap = typeMap;
    setTableName(tableName);
    
    // Drop the old table.
    try
    {
      stmt.execute("DROP TABLE " + tableName);
    }
    catch(Exception ex)
    {
      // Ignore
    }
  }
  
  public void create(DexData dex) throws SQLException
  {
    Map<String, DateFormat> dateFmtMap = new HashMap<String, DateFormat>();
    if (strictTypes)
    {
      columnTypes = dex.guessTypes();
    }
    else
    {
      for (String hdr : dex.getHeader())
      {
        columnTypes.add("string");
      }
    }
    
    for (int i = 0; i < columnTypes.size(); i++)
    {
      String dbType = typeMap.get(columnTypes.get(i));
      System.out.println(dex.getHeader().get(i) + " is a '"
          + columnTypes.get(i) + " mapped to a " + dbType);
      
      switch (columnTypes.get(i))
      {
        case "date":
        {
          dbTypes.add(dbType);
          dateFmtMap.put(dex.getHeader().get(i),
              DateUtil.guessFormat(dex.getColumn(i)));
          break;
        }
        case "string":
        {
          dbTypes.add(dbType + "(" + maxStringSize + ")");
          break;
        }
        // integer, double, anything else
        default:
        {
          dbTypes.add(dbType);
        }
      }
    }
    
    List<String> fieldSql = new ArrayList<String>();
    columnNames = toDbNames(dex.getHeader());
    
    // Put the SQL table creation statement together.
    for (int i = 0; i < columnNames.size(); i++)
    {
      fieldSql.add(columnNames.get(i) + " " + dbTypes.get(i));
    }
    
    String createTableSql = "CREATE TABLE " + tableName + "("
        + StringUtils.join(fieldSql, ",") + ")";
    
    System.out.println("Create Table SQL: '" + createTableSql + "'");
    stmt.execute(createTableSql);
    
    String repeated = new String(new char[dex.getHeader().size() - 1]).replace(
        "\0", "?,");
    insertSql = "INSERT INTO " + tableName + " ("
        + StringUtils.join(columnNames, ",") + ") VALUES (" + repeated + "?)";
    insertPStmt = con.prepareStatement(insertSql);
    System.out.println("INSERT SQL: " + insertSql);
    CREATED = true;
  }
  
  public void append(DexData dex) throws SQLException
  {
    if (!CREATED)
    {
      create(dex);
    }
    List<String> header = dex.getHeader();
    List<List<String>> data = dex.getData();
    for (int ri = 0; ri < data.size(); ri++)
    {
      try
      {
        insertPStmt.clearParameters();
        for (int ci = 0; ci < header.size(); ci++)
        {
          String param = data.get(ri).get(ci);
          switch (columnTypes.get(ci))
          {
            case "integer":
            {
              if (param == null)
              {
                insertPStmt.setNull(ci + 1, java.sql.Types.INTEGER);
              }
              else
              {
                try
                {
                  insertPStmt.setInt(ci + 1, Integer.parseInt(param));
                }
                catch(Exception ex)
                {
                  insertPStmt.setNull(ci + 1, java.sql.Types.INTEGER);
                }
              }
              break;
            }
            case "double":
            {
              if (param == null)
              {
                insertPStmt.setNull(ci + 1, java.sql.Types.DOUBLE);
              }
              else
              {
                try
                {
                  insertPStmt.setDouble(ci + 1, Double.parseDouble(param));
                }
                catch(Exception ex)
                {
                  insertPStmt.setNull(ci + 1, java.sql.Types.DOUBLE);
                }
              }
              break;
            }
            case "date":
            {
              Date date = null;
              try
              {
                date = dateFmtMap.get(header.get(ci)).parse(param);
              }
              catch(Exception ex)
              {
                // Null date out instead.
              }
              if (date != null)
              {
                try
                {
                  // println "Creating Timestamp"
                  insertPStmt.setTimestamp(ci + 1,
                      new java.sql.Timestamp(date.getTime()));
                }
                catch(Exception ex)
                {
                  // println "Downgrading to Date..."
                  insertPStmt
                      .setDate(ci + 1, new java.sql.Date(date.getTime()));
                }
              }
              else
              {
                insertPStmt.setNull(ci + 1, java.sql.Types.DATE);
              }
              break;
            }
            default:
            {
              insertPStmt.setString(ci + 1, (param == null) ? "" : param);
            }
          }
        }
        
        rowCount++;
        insertPStmt.execute();
      }
      catch(Exception ex)
      {
        errorCount++;
        if (errorCount < 10)
        {
          System.out.println("OFFENDING ROW: "
              + StringUtils.join(data.get(ri), ","));
          ex.printStackTrace();
        }
      }
    }
  }
  
  public List<String> toDbNames(List<String> names)
  {
    List<String> columnNames = new ArrayList<String>();
    if (names != null)
    {
      for (String name : names)
      {
        String columnName = name
            .replaceAll("[\\s\\/\\-\\(\\)\\?<>,#\\.\\*]", "").toUpperCase()
            .replaceAll("^DESC$", "DESCRIPTION").replaceAll("^[_*+]+", "");
        columnNames.add(columnName);
      }
    }
    return columnNames;
  }
  
  public void close()
  {
    SqlUtil.close(insertPStmt);
    SqlUtil.close(stmt);
    SqlUtil.close(con);
  }
  
  public Map<String, String> getTypeMap()
  {
    return typeMap;
  }
  
  public void setTypeMap(Map<String, String> typeMap)
  {
    this.typeMap = typeMap;
  }
  
  public List<String> getColumnTypes()
  {
    return columnTypes;
  }
  
  public void setColumnTypes(List<String> columnTypes)
  {
    this.columnTypes = columnTypes;
  }
  
  public List<String> getColumnNames()
  {
    return columnNames;
  }
  
  public void setColumnNames(List<String> columnNames)
  {
    this.columnNames = columnNames;
  }
  
  public int getRowCount()
  {
    return rowCount;
  }
  
  public void setRowCount(int rowCount)
  {
    this.rowCount = rowCount;
  }
  
  public int getErrorCount()
  {
    return errorCount;
  }
  
  public void setErrorCount(int errorCount)
  {
    this.errorCount = errorCount;
  }
  
  public int getMaxStringSize()
  {
    return maxStringSize;
  }
  
  public void setMaxStringSize(int maxStringSize)
  {
    this.maxStringSize = maxStringSize;
  }
  
  public String getTableName()
  {
    return tableName;
  }
  
  public void setTableName(String tableName)
  {
    this.tableName = tableName;
  }
  
  public boolean isStrictTypes()
  {
    return strictTypes;
  }
  
  public void setStrictTypes(boolean strictTypes)
  {
    this.strictTypes = strictTypes;
  }
  
  public List<String> getDbTypes()
  {
    return dbTypes;
  }
  
  public void setDbTypes(List<String> dbTypes)
  {
    this.dbTypes = dbTypes;
  }
  
}
