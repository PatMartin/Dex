header = data.remove(0)[1].split(",")

data.eachWithIndex
{
  row, ri ->

  data[ri] = row[1].split(",")
}