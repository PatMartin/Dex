def desiredMinutes = 5
def samplesPerMinute = 4
def numRows = samplesPerMinute * desiredMinutes

if (data.size() > numRows)
{
  println "SQUASHING"
  data = data[(data.size()- numRows - 1)..(data.size()-1)]
}