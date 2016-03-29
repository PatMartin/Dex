ci = dex.getColumnNumber('No_Of_Scripts_Impacted')

if (ci >= 0)
{
  data.eachWithIndex {
    row, ri ->
    try
    {
      data[ri][ci] = (data[ri][ci] as Integer)
    }
    catch (Exception ex)
    {
      data[ri][ci] = 0;
    }
  }
}