xrange = (-5..5)
header = [ "X", "Y" ]
data = []

xrange.each
{
  x ->
  data << [ x, x*x ]
}