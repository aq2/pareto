
d3.csv("/data/gug2009.csv", function(d) {
  return {
    rank: +d.rank,
    // need the + to convert string into number
    name: d.name,
    // low numbers are better - arbitrary magic number
    nss: 100 - d.nss,
    research: integerize(100 - d.research),
    // research: 100 - d.research,
    // ratio: 40 - d.ratio,
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
  // console.table(measurables)


  // start with the first front
  var front = 1
  // get it
  while (unisLeft.length > 0) {
    var nextFront = getNextFront(unisLeft, measurables)
    unisLeft = addToFrontandRemove(nextFront, front, unisLeft)
    front++
  }
  console.table(unis)
})

// find and return non-dominated unis
function getNextFront(unis, measurables) {
  var pareto = []  // contains g_ratings of best unis - todo use 'set'?
    
  // for each measurable, find the best
  for (var criterion of measurables) {
    // todo - break out into getBest(criterion)
    var bestRanks = []

    // map to new 'column' array just holding uni criterion values
    var column = unis.map(uni => uni[criterion])
    var bestIndex = column.indexOf(Math.max(...column))
    var bestValue = column[bestIndex]

    // find keys of best unis in each column, and push to front if not already there
    for (var i=0, len=column.length; i<len; i++) {
      if (column[i] == bestValue) {
        var key = unis[i].rank
        var name = unis[i].name
        bestRanks.push(key)
        console.log('best ' + criterion + ': ' + name)
        if (pareto.indexOf(key) == -1) {
          pareto.push(key)
          console.log('pushing ' + key + ': ' + name)
        }
      }
    }
  }

  // imp
  // i'm assuming that all pareto members are the best
  // ie - can't find non-dominated that isn't the best
    
  // console.table(pareto)
  return pareto
}


// add front ranking to front members
function addToFrontandRemove(bestUnis, frontRank, unisLeft) {
  // for each uni in bestUnis, add frontRank score
  var newUnis = [] // unis left over, not in front, for next iteration
  // var allUnis = unisLeft // ??
  console.log(' ---- ----  ')
  console.log('frontRank ' + frontRank)
  console.table(bestUnis)
  
  for (var key of bestUnis) {
    // find uni with key, and add frontRank
    var uni = unisLeft.find(u => u.rank === key)
    uni.front = frontRank
    // console.log(uni)

    // now remove uni from unisLeft
    console.log('filtering ' + 'key #' + key + ' ' + uni.name)
    newUnis = unisLeft.filter(u => u.rank != key)
    // new unisLeft  = newUnis
    unisLeft = newUnis
  }

  console.log(' ')
  return newUnis
}


function integerize(x) {
  return parseInt(x * 100)
}
