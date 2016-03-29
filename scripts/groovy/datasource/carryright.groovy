data.eachWithIndex
{
  row, ri ->
  row.eachWithIndex
  {
    col, ci ->


    if (col == null || col=='' && ci > 0)
    {
      row[ci] = row[ci-1]
    }
  }
  data[ri] = row
}