data.each
{
  row ->
  row.eachWithIndex
  {
    col, i ->
    if (i > 0)
    {
      try
      {
        Double.parseDouble(col)
      }
      catch (Exception ex)
      {
        row[i] = "0"
      }
    }
  }
}