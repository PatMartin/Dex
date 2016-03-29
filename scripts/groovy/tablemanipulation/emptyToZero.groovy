data.each
{
  row ->
  row.eachWithIndex
  {
    col, i ->
    if (i > 0)
    {
      if (!col) { row[i] = "0" }
      else if (col == "NONE") { row[i] = "0" }
    }
  }
}