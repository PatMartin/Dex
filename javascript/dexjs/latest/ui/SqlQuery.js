/**
 *
 * This class creates and attaches a SqlQuery user interface onto the
 * parent node.
 *
 * @name dex.ui.SqlQuery
 * @param userConfig The following configuration options are available for configuring the
 * behavior of the SqlQuery component.<br><br>
 *
 * 'parent' : The default
 *
 * @returns {SqlQuery}
 *
 * @constructor
 *
 */
dex.ui.SqlQuery = function (userConfig) {

  var defaults =
  {
    'parent' : '#SqlQuery', // The parent container of this chart.
    // Set these when you need to CSS style components independently.
    'id'     : 'SqlQuery',
    'class'  : 'SqlQuery',
    'query'  : 'select * from dex;',
    // Our data...
    'csv'    : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = config;

  var sql = window.SQL;
  var db = new sql.Database();

  chart.render = function () {
    // Create the table only at render time.
    var createStr = "create table dex(" + csv.header.map(function (h, i) {
        var colName = h.trim();
        return "'" + colName + "' " + ((dex.csv.isColumnNumeric(csv, i)) ? "float" : "text");
      }).join(",") + ")";
    console.log("CREATESTR: " + createStr);
    db.exec("drop table if exists dex;");
    db.exec(createStr);

    var populateSql = "BEGIN;" + csv.data.map(function (row) {
        var insertStr =
          "insert into dex values(" + row.map(function (col) {
            return "'" + col.replace("'", "") + "'";
          }).join(",") + ");";
        //console.log(insertStr);
        //db.exec(insertStr);
        return insertStr;
      }).join("") + "COMMIT;";
    console.log(populateSql);
    db.exec(populateSql);
    chart.update();
  };

  chart.query = function (query) {
    var csv = [];
    var myQuery = chart.attr("query");
    if (query && query.length > 0) {
      myQuery = query;
    }
    console.log("QUERY: " + myQuery);

    csv.header = [];
    csv.data = [];

    var rs = db.exec(myQuery);

    console.log("RS:");
    console.dir(rs);
    csv.header = rs[0].columns.map(function (s) {
      return s.trim();
    });
    csv.data = rs[0].values;

    console.log(csv);
    return csv;
  }

  chart.update = function () {
  };

  return chart;
};


