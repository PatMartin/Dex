def estimateCol = dex.getColumnNumber("ESTIMATE")
def defaultValue = 0

data.eachWithIndex
{
  row, ri ->
  if (!data[ri][estimateCol])
  {
    data[ri][estimateCol] = defaultValue
  }
}