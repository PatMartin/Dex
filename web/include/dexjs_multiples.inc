<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<%
import static com.dexvis.util.GroovyUtil.renderTemplate as render;

println render("web/include/styles_multiples.inc", [:])

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
println render("web/include/scripts_multiples.inc", [:])
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
    <div class='ui-layout-west'>
      <div id='ConfigurationPane'></div>
    </div>
    <div class='ui-layout-center'>
      <div id='ChartArea'></div>
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

<% println dexData.toCsvString(); %>

var base = ${context.base}({});
base.load();

var multiples = dex.charts.multiples.GridsterMultiples({
    'parent': '#ChartArea',
    'csv': csv,
    'gridsterConfig.widget_base_dimensions' : [ 50, 50 ],
    'gridsterConfig.widget_margins' : [ 1, 1 ],
    'cell.width' : 8,
    'cell.height' : 8,
    'baseChart': base
  }); 

function save()
{
  //multiples.save();
  //base.save();
}

function setValues(values)
{
  values.forEach(function(config) {
    switch (config.chartName) {
      case "multiples":
      {
        multiples.attr(config.key, config.value);
        break;
      }
      case "basechart":
      {
        base.attrSave(config.key, config.value);
        break;
      }
    }
  });
  save();
}

function getGuiDefinition()
{
  var guiDef = {
    'multiples': multiples.getGuiDefinition(),
    'basechart': multiples.attr("charts")[0].getGuiDefinition()
  };

  return JSON.stringify(guiDef);
}

\$(document).ready(function () {

  \$('.layout-container').layout({
    applyDemoStyles: false,
    west: {
      size: 335
    },
    onresize: function () {
       multiples.render();
    }
  });

  multiples.load();
  multiples.render();

  configPane = dex.ui.ConfigurationPane({
    "parent": "#ConfigurationPane",
    "csv": csv,
    "components": [ multiples ]
  }).render();
});
</script>
</body>
</html>