var ajq = {
  title: 'hello world',
  hi: function(x) {
    console.log('hello ' + x)
  },
  gotFile: (f) => {
    if (f) {
      console.log('got global')
      console.log(f)
      // ajq.csvFile = f
      return f
    }
  },
  // table: null
  // alertTwo: {}
  csvFile: null
}


var openFile = function(event) {
  var input = event.target
  var reader = new FileReader()
  reader.onload = function() {
    var dataUrl = reader.result
    // var output = document.getElementById('output')
    // output.src = dataUrl
    ajq.dataUrl = dataUrl
    console.log('openFIle got it ', dataUrl)
    preload()
  }
  reader.readAsDataURL(input.files[0])
}






function simpleFile() {
  table = loadTable("data/miniergug2009.csv", "csv", "header");

}

function fileSubmit(file) {
  if (file) {
    // var pFile = new p5.File
    // var newFile = ajq.gotFile()
    console.log('submitted')
    // console.log(file[0])
    // console.log(file)
    ajq.csvFile = file[0]
    ajq.pFile = file
    console.log(ajq.csvFile)
    preload()
  }
}

// what do we do again?
// goto parse csv data, using p5
// must must do in preload


function preload() {

  // createFileInput([sausage])
  // sausage()
  // getCsvTable()

  // can access globals;
  var table
  var cfile = ajq.csvFile
  var pfile = ajq.pFile
  var dUrl = ajq.dataUrl
  if (dUrl) {
    // var pfile = ajq.pFile[0]
    // var dfile = "data/miniergug2009.csv"
    console.log('preload got it')
    // console.log(cfile)
    // console.log(dfile)
    console.log(dUrl)
    // console.log(cfile.file) // = null
    table = loadTable(dUrl, "csv", "header");
    console.log(table)
    ajq.table = table
    // table = loadTable("data/miniergug2009.csv", "csv", "header");
    setup()
  } 
}


function setup() {
  if (ajq.table) {


  //count the columns
  var table = ajq.table
  print(table.getRowCount() + " total rows in table")
  print(table.getColumnCount() + " total columns in table")

  // print(table.getColumn("name"));
  print(table.columns)
  print(table.rows)
  print(table)

  // print(table.getString(4,5))
  print(table.rows[4])
  print(table)
  console.table(table)

  var tableObject = table.getObject()
  console.table(tableObject)
  print(tableObject.columns)


  //   //cycle through the table
  //   for (var r = 0; r < table.getRowCount(); r++)
  //     for (var c = 0; c < table.getColumnCount(); c++) {
  //       // print(table.getString(r, c));
  //     }


}
}


ajq.hi('from csv...waiting for file input')
// functions defined here can be used in other files
// but this must be called first

function alertNumber(number, caller) {
  alert(number + caller)
}

// can't call fns in later files
// should be able to somehow...
// alertTwo(2)


// alertNumber('xxx', ' from getCSV')




// alertOne()



// function preload(f) {
  // var localTable = loadTable(f, 'csv', 'header')

// }


// pass over file


// function gotFile(file) {
//   console.log('got it')
// }



// this script gets the CSV from input 
// do it in pure JS HTML
// or pure HTML
