def group = 'Investment Category'
def groupCol = dex.getColumnNumber(group)

def sumHeaders = [ 'E0', 'E1', 'E2', 'E2R3' ]

def sums = [:]
def sumCol = sumHeaders.collect { dex.getColumnNumber(it) }

data.eachWithIndex
{
  row, ri ->
  if (!sums[row[groupCol]])
  {
    sumCol.eachWithIndex
    {
      col, ci ->
      row[col] = row[col] as Double
    }
    sums[row[groupCol]] = row
  }
  else
  {
    sumCol.eachWithIndex
    {
      col, ci ->
      sums[row[groupCol]][col] += row[col] as Double
    }
  }
}
def newData = []

sums.each
{
  key, value ->
  newData << sums[key]
}

data = newData
