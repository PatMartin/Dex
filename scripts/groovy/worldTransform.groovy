newHeader = header[0..3].collect { it }
newData = []

(1960..2008).each
{
  colName ->
  colList = dex.getColumn(colName.toString())

  colList.eachWithIndex
  {
    col, i ->  if (col) println "COL: '$col'"
  }
}
