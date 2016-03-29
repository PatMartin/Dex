MAX_SIZE = 100
COLNUM = 0
header << "BUBBLE_SIZE"
int i = 1
double max = Double.MIN_VALUE
double min = Double.MAX_VALUE
double val

data.each
{
  row ->
  val = Double.parseDouble(row[COLNUM])
  if (min > val)
  {
    min = val
  }
  if (max < val)
  {
    max = val
  }
  println "MAX: $max, MIN: $min"
}

double range = Math.abs(max - min)

data = data.collect { row -> row << (((Double.parseDouble(row[COLNUM]) - min) / range) * MAX_SIZE + 1).toString() }