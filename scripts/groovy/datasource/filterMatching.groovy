def targetCol = dex.getColumnNumber("ACTIVITY_DESC")
def newData = []

data.eachWithIndex
{
  row, ri ->

  if (data[ri][targetCol] =~ /^.*Project Summary.*$/)
  {
  }
  else
  {
    newData << row
  }
}

data = newData