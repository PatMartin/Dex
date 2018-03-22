import smile.association.ARM
import smile.association.AssociationRule

FREQUENCY_THRESHOLD = 0.04
CONFIDENCE=0.96

def itemsets = new int[data.size()][header.size()]

int curCat = 0

def key2Cat = [:]
def cat2Key = [:]

// Create mappings between unique values with a column header namespace
data.eachWithIndex {
  row, ri ->
  row.eachWithIndex {
    col, ci ->
    def key = "${header[ci]}='${col}'"
    if (!key2Cat.containsKey(key)) {
      key2Cat[key] = curCat
      cat2Key[curCat] = key
      curCat++
    }
  }
}

data.eachWithIndex {
  row, ri ->
  row.eachWithIndex {
    col, ci ->
    itemsets[ri][ci] = key2Cat["${header[ci]}='${col}'"]
  }
}

println itemsets

ARM arm = new ARM((itemsets as int[][]), ((int) (data.size() * FREQUENCY_THRESHOLD)))

def rules = arm.learn(CONFIDENCE)

header = [ "antecedent", "consequent", "confidence" ]
data = []

rules.eachWithIndex {
  rule, ri ->
  def antecedents = rule.antecedent.collect { return cat2Key[it] }
  def consequents = rule.consequent.collect { return cat2Key[it] }
  data << [ "${antecedents}", "${consequents}", "${rule.confidence > 1 ? 1 : rule.confidence}" ]
}

