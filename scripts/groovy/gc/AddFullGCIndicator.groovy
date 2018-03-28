def fgci = dex.getColumnNumber("FGC")

header << "Major Collection"

data.eachWithIndex {
  row, ri ->
  data[ri] << ((data[ri+1] && ((data[ri+1][fgci] as int) > (data[ri][fgci] as int))) ? "1" : "0")
}