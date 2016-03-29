//load and split the file
FileInputStream inputFile = new FileInputStream("/csv/gc.csv")
String[] lines = inputFile.text.split('\n')

List<String[]> rows = lines.collect {it.split(',')}

header = Arrays.asList(rows.remove(0))

data = [];

for (row in rows)
{
  data.add(Arrays.asList(row));
}
