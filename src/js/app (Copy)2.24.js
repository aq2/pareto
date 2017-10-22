// var aq
var aq_dataTable       // this is a table Object
var aq_categories     // array of all category names
var aq_measurables   // array of measurable names
var aq_candidates // familiar table object array made from dataTables
var aq_measured = false
var aq_shown_already = false

function preload(x) {
  aq_dataTable = loadTable("/data/miniergug2009.csv", 'csv', 'header')
}

function setup() {
  // console.table(dtable)
  // print(dtable.columns)
  // print(dtable.getColumnCount() + " total columns in table")
  // print(dtable.rows)
  // print(dtable.getRowCount() + " total rows in table")
  // print(dtable.getString(4,5))

  // get our data
  aq_candidates =aq_dataTable.getObject()
  // console.table(candidates)
  
  // show the categries -- are they measurable
  aq_categories = aq_dataTable.columns
  showCategories(aq_categories)
  // we should have measurables by now as a global
  // console.log('m', measurables)
  
  // if (aq_measurables) {
  //   draw2()
  // }

  // if (aq_measurables) {
  //   var gotten = getMeasurables()
  //   console.log('gotten', gotten)

  //   if (gotten) {
  //     console.log(measurables)
  //     console.table('c ', candidates)
  //   // do the rest....
  // }

  // if (aq_measurables) {
  //   var gotten = getMeasurables()
  //   console.log('gotten', gotten)
  // }
  // if (gotten) {
  //   console.log(aq_measurables)
  //   console.table('c ', aq_candidates)
  //   // do the rest....
  // }
}



function getMeasurables() {
  // read selectBox values
  var m = []
  aq_measurables = []
  var i = 0
  for (var cat of aq_categories) {
    var catID = 'cat' + i 
    if (document.getElementById(catID).checked) {
      aq_measurables.push(cat)
      m.push(cat)
    }
    i++
  }
  aq_measured = true
  console.log('getMeasuables got', aq_measurables)
  console.log('returning m', m)
  return m
}




function showCategories(categories) {
  // build table
  // var html = '<table><caption>Categories in datafile</caption>'
  // html += '<tbody>'
  // // table headings
  // html += '<tr>';
  // for (var cat of categories ) {
  //   html += '<th>' + cat + '</th>'
  // }
  // html += '</tr>'
  // // now new row
  // html += '<tr>'
  // var i = 0
  // for (var ca of categories ) {
  //   html += '<td>' + 'b' + i
  //   html += "<input type='checkbox' id='cat" + i +"'"
  //   html += '</td>'
  //   i++
  // }
  // html += '</tr>'
  
  // // for( var i = 0; i < rows.length; i++) {
  // //   html += '<tr>';
  // //   for( var j in rows[i] ) {
  // //     html += '<td>' + rows[i][j] + '</td>';
  // //   }
  // //  }
  // html += '</table>';
  // document.getElementById('catTable').innerHTML = html

  html = ''
  j = 0
  for (var c of categories) {
    html += "<div><input type='checkbox' id='cat" + j + "'"
    html += "<label for='" + c + "'>" + c + "</label></div>" 
    j++ 
  }
  document.getElementById('boxes').innerHTML = html
}

function draw2() {
  console.log('boo once only')
  aq_shown_already = true
  console.log(aq_measurables)
  console.table('c ', aq_candidates)

  // var measured = false
  // if (aq_measured) { 
  //   var gotten = getMeasurables()
  //   console.log('gotten', gotten)
  // }
  // if (gotten) {
  //   console.log(aq_measurables)
  //   console.table('c ', aq_candidates)
  //   // do the rest....
  // }
}



function draw() {
  if (aq_shown_already) {
    console.log('draw about to call draw2')
    draw2()
  }

  // console.log('boo')
  // var measured = false
  // if (aq_measured) { 
  //   var gotten = getMeasurables()
  //   console.log('gotten', gotten)
  // }
  // if (gotten) {
  //   console.log(aq_measurables)
  //   console.table('c ', aq_candidates)
  //   // do the rest....
  // }
}
