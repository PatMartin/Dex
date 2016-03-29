import com.javainc.dex.wf.DexEnvironment

env = DexEnvironment.getInstance()

env.setVariable("COLUMNS", dex.getColumn("COLUMN_NAME").join(","))
