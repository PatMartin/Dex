def colNum = dex.getColumnNumber("DATE")

header += [ "DAY", "MONTH", "YEAR" ]

data.eachWithIndex
{
  row, ri ->
  def m = row[colNum] =~ /^(\d+)\/(\d+)\/(\d+)$/
  row << m[0][1]
  row << m[0][2]
  row << m[0][3]
}