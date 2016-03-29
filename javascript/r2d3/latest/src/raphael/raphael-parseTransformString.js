//========================================
// Parse Transform String
// Converts transform functions to raphael transform strings, ie translate(x,y) => tx,y

var rParseTransformString = Raphael.parseTransformString;
Raphael.parseTransformString = function(TString) {
if(/translate|rotate|scale/i.test(TString)) TString = toRTransformString(TString);
return rParseTransformString(TString);
};

function toRTransformString(TString) {
return TString.replace(/translate\(/gi, "t")
              .replace(/rotate\(/gi, "r")
              .replace(/scale\(/gi, "s")
              .replace(/[)]/g, "");
};
