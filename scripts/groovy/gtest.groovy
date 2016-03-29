import com.javainc.dex.DexData

def dd = new DexData([ "A", "B", "C" ], [[1, 2, 3],[4,5,6]])

println dd.select(["B"])

List<String> colList = new ArrayList<String>()

colList.add("C")

println dd.select(colList);