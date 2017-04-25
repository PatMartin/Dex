int numCols = 10
int numRows = 5

header = (1..numCols).collect{"C$it"}
data = []

(1..numRows).each
{
  r ->
  data << []
  rowLabel = "R$r"
  (1..numCols).each
  {
    c ->
    data[r-1] << "${rowLabel}C$c"
  }
}