newData = []

data.each
{
  row -> if (row.indexOf("null") < 0) { newData << row }
}

data = newData
  