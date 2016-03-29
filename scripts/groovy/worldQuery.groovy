newData = []

data.eachWithIndex
{
  row, rowNum ->

  (4..(row.size()-1)).each
  {
    colNum ->
    def newRow = row[0..3].collect { it }
    newRow << header[colNum].substring(1)
    newRow << row[colNum]
    newData << newRow
  }
}

data = newData
header = header[0..3]
header << "YEAR"
header << "VALUE"