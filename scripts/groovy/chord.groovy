newHeader = header
newData = data.collect { it }

dataMap = []
headerMap = [:]

newData.eachWithIndex
{
  row, ri ->
  rowMap = [:]
  row.eachWithIndex
  {
    col, ci ->
    headerMap.put(col, col)
    rowMap.put(col, "1")
  }
  dataMap << rowMap
}

header = headerMap.keySet().sort().collect { it.toString() }

data = (1..header.size()).collect { (1..header.size()).collect { "0" } }

newData.eachWithIndex
{
  row, ri ->
  hi1 = header.findIndexOf { it == row[0]}
  hi2 = header.findIndexOf { it == row[1]}

   if (hi1 != hi2)
   {
     data[hi1][hi2] = "1"
     data[hi2][hi1] = "1"
   }
}
