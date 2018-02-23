<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<%
import static com.dexvis.util.GroovyUtil.renderTemplate as render;
import groovy.json.*

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

<%
  println dexData.toCsvString();
  if (context && context.config && options) {
    println "// context.confg and options"
    println "var userOptions = " +
      new JsonBuilder(options).toPrettyString() + ";";
    
    println "var defaultConfig = " +
      new JsonBuilder(context.config).toPrettyString() + ";";
      
    println "var userConfig = dex.config.expandAndOverlay(userOptions, defaultConfig);"
  }
  else if (context && context.config) {
    println "// context.config"
    println "var userConfig = " +
      new JsonBuilder(context.config).toPrettyString() + ";";
  }
  else {
    println "// options"
    println "var userConfig = " +
      new JsonBuilder(options).toPrettyString() + ";";
  }
%>

var multiples = dex.charts.multiples.Multiples(dex.config.expandAndOverlay(
  {
    parent: '#ChartArea',
    csv: new dex.csv(),
    limit: 500,
    model: {
      chartConstructor: <% print context.chartConstructor %>
    }
  }, userConfig));

function save() {
  multiples.save();
}

function setValues(values) {
  values.forEach(function(config) {
    switch (config.chartName) {
      case "multiples":
      {
        multiples.attr(config.key, config.value);
        break;
      }
    }
  });
  save();
}

function getGuiDefinition()
{
  var guiDef = {
    'multiples': multiples.getGuiDefinition()
  };

  return JSON.stringify(guiDef);
}

\$(document).ready(function () {

  \$('.layout-container').layout({
    applyDemoStyles: false,
    west: {
      size: 335
    },
    onresize: multiples.resizeAsynch
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