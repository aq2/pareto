// globals - gulp
var candidateExample
var categories = []
main()

function main() {
  getCSV("/data/miniergug2009.csv")  
}


function getCSV(csvFile) {
  var rawData
  var candidates = []
  d3.csv(csvFile, (dataRow) => {
    candidates.push(dataRow)
  }, () => {
    // qq we now have array of data objects!
    console.log('data loaded')
    console.table(candidates)
    // console.log(candidates[0])
    // console.log(candidates[0]['name'])
    
    // check we have some data, at least two (or three if one is names)
    if (candidates.length < 2) {
      console.log("can't compare only one candidate - bad data")
    } else {
      // all good, now process the data we've got
      processCsv(candidates[0])
    }
  })
}


function processCsv(candidate) {
  candidateExample = candidate
  showExample(candidate)
  // var measurables = selectMeasurables(candidate)
  // if (measurables) {
  //   var minimised = selectMinimised(candidate)
  // }
  showMeasurables(candidate)
}


// show example data entry
function showExample(candidate) {
  // first just show an example
  // need to manipulate innerHTML of #exampleTable
  var html = ''
  var table = document.getElementById('exampleTable')
  // html += "<table>"
  // for each prop of candidate, need row of names, then row of values
  html += "<tr><th></th>"
  for (var propertyName in candidate) {
    html += "<th>" + propertyName + "</th>"
    categories.push(propertyName)
  }
  html += "</tr><tr><td></td>"
  for (var property in candidate) {
    html += "<td>" + candidate[property] + "</td>"
  }
  html += "</tr>"
  // table.innerHTML = html
  table.insertAdjacentHTML('afterbegin', html)
}


// show and get measurable categories
function showMeasurables(candidate) {
  // console.log(candidate)
  var html = ''
  var property
  var i = 0
  html += "<tr id='rankRow'>"
  html += "<td>rankable?</td>"
  for (property in candidate) {
    html += "<td><input type='checkbox' id='meas" + i +"'></td>"
    i++
  }
  html += "</tr>"
  var n_props = Object.keys(candidate).length
  html += "<tr id='rankHelp'>"
  html += "<td colspan='" + (n_props+1) + "'>" 
  html += "select at least two criteria to be used for ranking... "
  html += "<button onclick='processMeasurables()'> done </button>"
  html += "</td></tr>"
  var table = document.getElementById('exampleTable')
  table.insertAdjacentHTML('beforeend', html)
}


function processMeasurables() {
  // console.log(candidateExample)
  // console.log(categories)
  var measurables = []
  var i = 0
  var cat, catID
  var n_props = Object.keys(candidateExample).length

  for (i; i<n_props; i++) {
    catID = 'meas' + i
    // console.log(i, catID)
    if (document.getElementById(catID).checked) {
      var name  // category name?? 
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
    el = document.getElementById('rankRow')
    el.style.background = 'blue'
    // remove #rankHelp row completely
    el = document.getElementById('rankHelp')
    
    // many ways to skin cat!
    // el.style.display = 'none'
    el.className = 'hidden'

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
  var table = document.getElementById('exampleTable')
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
    if (document.getElementById(catID).checked) {
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
