def toIndex = dex.getColumnNumber("Took office")
def loIndex = dex.getColumnNumber("Left office")

if (toIndex < 0 || loIndex < 0)
{
  return
}

data.eachWithIndex {
  row, ri ->
  
  def toMatch = row[toIndex] =~ /\s*(\d+)\s*\/\s*(\d+)\s*\/\s*(\d+)\s*$/
  if (toMatch.matches())
  {
    data[ri][toIndex] = "${toMatch[0][2]}/${toMatch[0][1]}/${toMatch[0][3]}"
  }
  
  def loMatch = row[loIndex] =~ /\s*(\d+)\s*\/\s*(\d+)\s*\/\s*(\d+)\s*$/
  if (loMatch.matches())
  {
    data[ri][loIndex] = "${loMatch[0][2]}/${loMatch[0][1]}/${loMatch[0][3]}"
  }
}