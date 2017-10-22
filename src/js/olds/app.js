var table

// setup()

function sausage(x) {
  // table = loadTable("data/miniergug2009.csv", "csv", "header");
  preload(x)
}


function getCsvTable() {
  // var dataFile = createFileInput([sausage])
}

function preload(x) {

  // createFileInput([sausage])
  // sausage()
  // getCsvTable()
  // var localTable = loadTable(f, 'csv', 'header')
  print(x)
}

function setup() {
  //count the columns
  print(table.getRowCount() + " total rows in table")
  print(table.getColumnCount() + " total columns in table")

  // print(table.getColumn("name"));
  print(table.columns)
  print(table.rows)
  print(table)

  print(table.getString(4,5))
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

function draw() {
  // console.log('boo')
}


// function setup() {

// }

// function draw() {
//   ellipse(50, 50, 80, 80);
// }
