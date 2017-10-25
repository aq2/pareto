// globals - gulp
var categories = []
var candidateExample

function setup() {
  var dropZone = select('#dropZone')
                 .dragOver(highlight)
                 .dragLeave(unhighlight)
                 .drop(gotFile, unhighlight);
  
  main()
}

function gotFile(file) {
  var maxBytes = 10000
  // createP(file.name)
  // createP(file.type)
  createP(file.size)
  // createP(file.data)

  // check for text file
  if (file.type != 'text') {
    // give graphic indication of problem
    alert('can only process textual files such as csv')
    return 
  }

  // filesize check?
  if (file.size > maxBytes) {
    alert('file too big')
    return 
  }

  // todo rollup dropZone div

  const fileData = file.data
  const rows = fileData.split("\n");
  // console.log(splitString)
  console.table(rows)




  // print out first 5 lines of data
}


function main() {


  // getCSV("/data/miniergug2009.csv")  
}

// todo highlight toggle
function highlight() {
  this.style('background-color','#ccc')
}
function unhighlight() {
  this.style('background-color','#555')

}


function getCSV(csvFile) {
  var candidates = []

  d3.csv(csvFile, (dataRow) => {
    candidates.push(dataRow)
  }, (d) => {
    // qq push d onto array directly?
    console.log('data loaded')
    console.table(candidates)
    
    // check we have some data, at least two (or three if one is names)
    if (candidates.length < 2) {
      console.log("can't compare only one candidate - bad data")
    } else {
      // all good, now process the data we've got
      candidateExample = candidates[0]
      processCsv(candidateExample)
    }
  })
}


function processCsv(candidate) {
  showExample(candidate)
  showMeasurables(candidate)
}


// show example data entry
function showExample(candidate) {
  // first just show an example
  var html = ''
  var property, propertyName
  var table = getEl('exampleTable')

  html += "<tr><th></th>"
  for (propertyName in candidate) {
    html += "<th>" + propertyName + "</th>"
    categories.push(propertyName)
  }
  html += "</tr><tr><td></td>"
  for (property in candidate) {
    html += "<td>" + candidate[property] + "</td>"
  }
  html += "</tr>"
  // table.innerHTML = html
  table.insertAdjacentHTML('afterbegin', html)
}


// show and get measurable categories
function showMeasurables(candidate) {
  var i = 0
  var html = ''
  var table = getEl('exampleTable')
  var n_props = Object.keys(candidate).length

  html += "<tr id='rankRow'>"
  html += "<td>rankable?</td>"
  for (i; i<n_props; i++) {
    html += "<td><input type='checkbox' id='meas" + i +"'></td>"
  }
  html += "</tr>"
  html += "<tr id='rankHelp'>"
  html += "<td colspan='" + (n_props+1) + "'>" 
  html += "select at least two criteria to be used for ranking... "
  html += "<br>eg don't include names etc... "
  html += "<button onclick='processMeasurables()'> done </button>"
  html += "</td></tr>"
  table.insertAdjacentHTML('beforeend', html)
}


function processMeasurables() {
  var measurables = []
  var i = 0
  var cat, catID
  var n_props = Object.keys(candidateExample).length

  for (i; i<n_props; i++) {
    // catID = 'meas' + i
    if (document.getElementById('meas' + i).checked) {
      measurables.push(categories[i])
    }
  }
  // console.log(measurables)

  // only one constraint - at least one measurable?
  if (measurables.length > 1) {
    var el
    console.log('got measurables:', measurables)
    // return measurables
    // change css colour of #rankRow
    el = getEl('rankRow')
    // el.style.background = $gray
    el.className  = 'rowLit'
    // remove #rankHelp row completely
    el = getEl('rankHelp')
    
    // many ways to skin cat!
    // el.style.display = 'none'
    el.className = 'hidden'

    el = getEl('rankRow')
    el.className = 'rowDone'

    // todo - make boxes read-only?


    selectMinimised(candidateExample)    
  } else {
    console.log('not enough measurables! - try again')
    // todo - how to try again?
    // return false
  }
}

// show and get measurable categories
function selectMinimised(candidate) {
  // console.log(candidate)
  var html = ''
  var i = 0
  html += "<tr id='minRow'>"
  html += "<td>minimised?</td>"
  var n_props = Object.keys(candidate).length
  
  for (i; i<n_props; i++) {
    html += "<td><input type='checkbox' id='min" + i +"'></td>"
  }

  html += "</tr>"
  // var helpText = "select the criteria to be used for ranking"
  html += "<tr id='rankExp'>"
  html += "<td colspan='" + (n_props+1) + "'>" 
  html += "select criteria where low values are better... "
  html += "<button onclick='processMinimised()'> done </button>"
  html += "</td></tr>"
  var table = getEl('exampleTable')
  table.insertAdjacentHTML('beforeend', html)
  // make rows change colour

}



function processMeasurablesO() {
  // need at least two measurables
  // how to count measurables?
  // go through boxes checking how?
  var measurables = []
  var i = 0
  var cat
  for (cat in candidateExample) {
    var catID = 'cat' + i 
    if (getEl(catID).checked) {
      measurables.push(cat)
    }
    i++
  }

  // only one constraint - at least one measurable?
  if (measurables.length) {
    // get measurables
    console.log('got measurables:', measurables)
    return measurables    
  }
  console.log('no measurables! - try again')
  // todo - how to try again?
  return false
}

function processID() {
  // must have one ID field
  var id = document.querySelector('input[name="id"]:checked').value
  if (id) {
    return id
  }
  console.log('must choose an ID field')
  return false
}


function processKey() {
  // must have one ID field
  var key = document.querySelector('input[name="key"]:checked').value
  if (key) {
    return key
  }
  console.log('must choose an key field')
  return false
}


/* HELPER FN's
    maybe move to another file?
*/


// pinched from interwebs
function deepClone(o) {
   var output, v, key
   output = Array.isArray(o) ? [] : {}
   for (key in o) {
       v = o[key]
       output[key] = (typeof v === "object") ? deepClone(v) : v
   }
   return output
}

function getEl(element) {
  return document.getElementById(element)
} 
