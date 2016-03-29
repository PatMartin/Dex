filtering = true

newData = []

data.eachWithIndex
{
  row, ri ->
  if (row[1] =~ /PSTART/)
  {
    filtering = true;
  }
  else
  {
    if (!filtering)
    {
      newData << row
    }
  }
}

data = newData