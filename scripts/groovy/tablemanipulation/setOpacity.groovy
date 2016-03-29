double MAX_OPACITY= 0.5f

header << "OPACITY"
int i = 1
int numRows = data.size()
data = data.collect { row -> row << ((i++/numRows)*MAX_OPACITY).toString() }