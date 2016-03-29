String delimiter = ";"

header = data[0][1].split(delimiter).collect { it.trim().toString() };
data.remove(0);

def newData = []

data.eachWithIndex
{
  row, ri ->
  newData << row[1].split(delimiter).collect { it.trim().toString() }
}

data = newData