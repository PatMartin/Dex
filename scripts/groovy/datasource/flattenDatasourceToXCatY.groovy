def categoryColumnLabel = 'TEST'
def categoryIndex = dex.getColumnNumber(categoryColumnLabel)

def xColumnLabel = 'THREADS'
def xi = dex.getColumnNumber(xColumnLabel)

def yColumnLabel = 'TXN/SEC'
def yi = dex.getColumnNumber(yColumnLabel)

def categoryMap = [:]
def seriesData = [:]
def uniqueXValues = []

data.each
{
  row ->

  // Category exists already.
  if (!categoryMap[row[categoryIndex]])
  {
    seriesData = [:]
    categoryMap[row[categoryIndex]] = seriesData
  }
  else
  {
    seriesData = categoryMap[row[categoryIndex]]
  }

  seriesData[row[xi]] = row[yi]
  if (!(row[xi] in uniqueXValues))
  {
    uniqueXValues.add(row[xi])
  }
}

def newData = []

uniqueXValues.eachWithIndex
{
  x, i ->

  def row = [ x ]
  categoryMap.each
  {
    category ->
    //println "ROW=$row, X=$x, CATEGORY=$category, CATEGORY[$x]="
    row << category.value[x]
  }
  newData << row
}

header = [ xColumnLabel ]
categoryMap.each { header << it.key }

data = newData;