def newHeader = [ "DESCRIPTION", "PROJECT", "RELEASE", "CLASS", "DATE", "PM", "E0", "E1", "E2", "ACTUAL" ]

def indices = []

newHeader.each
{
  h ->

  indices << dex.getColumnNumber(h)
}

def newData = []

dex.data.eachWithIndex
{
  row, ri ->
  dex.data[ri] = row[indices]
}

header = newHeader