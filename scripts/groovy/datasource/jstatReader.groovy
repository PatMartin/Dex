m = (data[0][1] =~ /^\s*(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*$/)
header = []

len = data.size() - 1
newData = data[1..len]
data = []

header = m[0][1..16]
newData.each
{
  row ->
  println "ROW: $row"
  try
  {
    m =  (row[1] =~ /^\s*(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*$/)
    data << m[0][1..16]
  }
  catch (Exception ex)
  {
    ex.printStackTrace()
  }
}