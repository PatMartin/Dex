header = [ "WORD1", "WORD2" ]
def text = ""

data.eachWithIndex {
  row, ri ->
  text += " " + row[1];
}

text = text.trim().toLowerCase();

text = text.replaceAll(/[\.,\n]/, " ");
text = text.replaceAll(/\s\s+/, " ");
words = text.split(/\s/)

data = []

words.eachWithIndex{
  word, i ->
  if (i>0)
  {
    data << [ words[i-1], word ]
  }
}