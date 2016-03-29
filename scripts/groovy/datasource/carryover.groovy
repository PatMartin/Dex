def prevRow

data.eachWithIndex
{
  row, ri ->
  row.eachWithIndex
  {
    col, ci ->
    
    if (col == null || col=='')
    {
      if (prevRow)
      {
        row[ci] = prevRow[ci]
      }
    }
  }
  prevRow = row
  data[ri] = row
}
