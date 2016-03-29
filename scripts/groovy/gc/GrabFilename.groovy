if (row.file =~ /.*\\(\S+)$/)
{
  m = row.file =~ /.*\\(\S+)$/
  row.file = m[0][1]
}