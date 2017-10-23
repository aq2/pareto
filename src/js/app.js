// var aq
var aq_dataTable       // this is a table Object
var aq_categories     // array of all category names
var aq_measurables = []   // array of measurable names
var aq_candidates // familiar table object array made from dataTables
var aq_measured = false
var aq_not_shown_yet = true
var aq_fronts // includes superiors/inferior/front data

// runs before anything else, calls setup once loaded
function preload(x) {
  // get data from file
  aq_dataTable = loadTable("/data/miniergug2009.csv", 'csv', 'header')
}

// start to process file data
function setup() {
  // get our data into object of objects - buit i want array of objects
  aq_candidates =aq_dataTable.getObject()
  console.table(aq_candidates)
  // todo - maybe clean up data here - strings etc
  // todo add key field if necess
  // console.log(aq_candidates[1])

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
    html += "<div><input type='radio' id='cat" + j + "'"
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
  // console.log('should only get called once only - except...')
  console.log('m', aq_measurables)
  // console.table(aq_candidates)
  // todo ? need to reset globals in case submit button reclicked

  // process the data! you know what to do
  // todo destringify data if necess - or do it earlier/later?

  // need new datatable = aq_fronts
  addFrontData(aq_candidates)

  

  var input = {
    0: {name: "camb", ratio: "132.4", honours: '5'},
    1: {name: "exeter", ratio: "32.4", honours:'3'},
    2: {name: "salf", ratio: "12.4", honours: '2'}
  }

  // first, get props of input
  for (var o in input) {
    console.log(o)
    for (var p in o) {
      console.log(p)
    }
  }

  // var candidate
  // var result = Object.keys(input).map(function(e) {
  //   // for each measurable...
  //   candidate = input[e]
  //   honours = candidate['honours']
  //   // console.log('props ')
  //   var name = candidate['name']
  //   console.log(name)
  //   for (var prop in candidate) {
  //     console.log(prop)
  //     // if prop in measurables
  //     if (aq_measurables.includes(prop)) {
  //       var value = candidate[prop]
  //       console.log(value)
  //       console.log('yay')
  //     }

  //   }

  //   return {key: +e, candidate: input[e], honours: honours}
  // })

  // console.log(result)
  // console.table(result)


}

// makes new datatable with de-stringed measurables and dom info
function addFrontData(candidates) {
  // for each row, add front, add key, name, and destringed meas
  // console.table(candidates)
  // var i = 0
  // var n_cand = candidates.length
  // for (i;i<)
  
}


