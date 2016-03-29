headerStr = data.remove(0);

header = [ "ROW", "FILE" ];
headerStr[2].trim().split(/\s+/).each(
{
  col ->
  header += col
})

data.eachWithIndex({
  row, ri ->
  data[ri] = [ *row[0..1], *(row[2].trim().split(/\s+/)) ]
  //println row;
})