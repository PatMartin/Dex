<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<%
import static com.dexvis.util.GroovyUtil.renderTemplate as render;

println render("web/include/styles.inc", [:])
if (context.styles) {
  context.styles.each {
    style ->

    println "<style>";
    println new File(style).text;
    println "</style>";
  }
}

if (context.scripts) {
  context.scripts.each {
    script ->

    println "<script>"
    println new File(script).text;
    println "</script>"
  }
}
println render("web/include/scripts.inc", [:])
if (context.postscripts) {
  context.postscripts.each {
    script ->

    println "<script>"
    println new File(script).text;
    println "</script>"
  }
}
%>
  <title>${context.title}</title>
</head>
<body>
  <div class='layout-container'>
    <div class='ui-layout-center'>
      <div id='ChartArea'></div>
    </div>
    <div class='ui-layout-west'>
      <div id='ConfigurationPane'></div>
    </div>
  </div>

<!-- Enable Firebug 
<script type="text/javascript"
src="https://getfirebug.com/firebug-lite.js">
{
    overrideConsole: true,
    startInNewWindow: false,
    startOpened: true,
    enableTrace: true
}
</script>
-->

<script>
function save()
{
  chart.save();
}

function setValues(values)
{
  values.forEach(function(config) {
    switch (config.chartName) {
      case "${context.type}":
      {
        chart.attrSave(config.key, config.value);
        break;
      }
    }
  });
  save();
}

function getGuiDefinition()
{
  var guiDef = {
    '${context.type}': chart.getGuiDefinition()
  };

  return JSON.stringify(guiDef);
}
<%
  println dexData.toCsvString();
%>

// Limit initial view to 100 rows for performance.
var chart = ${context.chart}({
    parent : "#ChartArea",
    csv : csv.limitRows(100)
  });

\$(document).ready(function () {

  \$('.layout-container').layout({
    applyDemoStyles: false,
    west: {
      size: 335
    },
    onresize: function () {
       chart.resize();
    }
  });

  chart.load();
  chart.render();

  configPane = dex.ui.ConfigurationPane({
    "parent": "#ConfigurationPane",
    "csv": csv,
    "components": [ chart ]
  }).render();
});
</script>
</body>
</html>