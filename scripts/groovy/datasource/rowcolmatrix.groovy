header = (1..10).collect { "H$it" }

data = []

(1..header.size()).each
{
  row ->
  
  data << []
  (1..header.size()).each
  {
    col ->
    data[row-1] << "$row,$col"
  }
}