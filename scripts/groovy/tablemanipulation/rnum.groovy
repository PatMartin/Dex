header << "RNUM"
int i = 1
data = data.collect { row -> row << (i++).toString() }