// load in csv with d3

d3.csv("/data/gug2009.csv", function(d) {
  return {
    rank: +d.rank,
    // need the + to convert string into number
    name: d.name,
    // low numbers are better - arbitrary magic number
    nss: 100 - d.nss,
    research: integerize(100 - d.research),
    research: 100 - d.research,
    ratio: 40 - d.ratio,
    ratio: integerize(100 - d.ratio),
    spends: integerize(100 - d.spends),
    entry: integerize(100 - d.entry),
    completion: integerize(100 - d.completion),
    honours: integerize(100 -d.honours),
    prospects: integerize(100 - d.prospects),
    // might not need these extra attributes
    // dom_by: +0,
    // dominates: 7,
    front: -1
  }
}, (unis) => {
  console.log('original list of unis')
  console.table(unis)
  
  // main loop
  // copy unis list before mangling it
  var unisLeft = unis

  // get list of categories
  var categories = []
  for (var category in unis[1]) {
    categories.push(category)
  }
  // console.table(categories)
  
  // not all categories are measurable - eg name
  var measurables = []
  // measurables is list of measurable category names - eg ['teaching', 'spend', 'prospects']
  var howManyCategories = categories.length
  for (var i=0; i < howManyCategories; i++) {
    if ((i>1) && (i<10)) {
      // todo dodgy hard-coding
      measurables.push(categories[i])
    }
  }
  console.table(measurables)


  
})

function integerize(x) {
  return parseInt(x * 100)
}
