// var aq
var aq_dataTable       // this is a table Object
var aq_categories     // array of all category names
var aq_measurables = []   // array of measurable names
var aq_candidates // familiar table object array made from dataTables
var aq_measured = false
var aq_not_shown_yet = true

// runs before anything else, calls setup once loaded
function preload(x) {
  // get data from file
  aq_dataTable = loadTable("/data/miniergug2009.csv", 'csv', 'header')
}

// start to process file data
function setup() {
  // get our data into array of objects (object array)
  aq_candidates =aq_dataTable.getObject()
  // console.table(aq_candidates)
  // todo - maybe clean up data here - strings etc
  // todo add key field if necess

  // show the categories with checkboxes
  aq_categories = aq_dataTable.columns
  showCategories(aq_categories)

  // if (aq_measurables) {
  //   draw2()
  // }
}


// shows categories and checkboxes
function showCategories(categories) {
  // build up fieldset contents
  var html = ''
  var j = 0
  for (var c of categories) {
    html += "<div><input type='checkbox' id='cat" + j + "'"
    html += "<label for='" + c + "'>" + c + "</label></div>" 
    j++ 
  }
  document.getElementById('boxes').innerHTML = html
}

// gets called when measurables submit button pressed
function getMeasurables() {
  // if (aq_not_shown_yet = false) {
  //   // has already been shown
  //   aq_measured = true
  // }
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
  // todo error check for at least one suitable cat
  aq_measured = true
  // console.log('getMeasuables got', aq_measurables)
  // console.log('returning m', m)
  return m
}


function draw() {
  // only call processData() when ready
  if (aq_not_shown_yet && aq_measured) {
    // console.log('draw about to call process')
    processData()
  }
}

// should only get called once only
// todo except if measurables submit button reclicked
function processData() {
  aq_not_shown_yet = false
  console.log('should only get called once only - except...')
  console.log('m', aq_measurables)
  console.table(aq_candidates)
  // todo ? need to reset globals in case submit button reclicked

  // process the data! you know what to do
  // todo destringify data if necess - or do it earlier?
}




