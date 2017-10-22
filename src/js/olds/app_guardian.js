
d3.csv("/data/unis_alpha.csv", function(d) {
  return {
    g_ranking: +d.Ranking,
    // need the + to convert string into number
    name: d.Institution,
    teaching: +d.teaching,
    nss: +d.nss,
    spend: +d.spend_per_student,
    // lower ratio is better - arbitrary magic number
    ratio: 40 - d.ratio,
    prospects: +d.prospects,
    value: +d.value_added,
    entry: +d.entry,
    feedback: +d.feedback,
    key: +d.key,
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
  for (var category in unis[0]) {
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
    var bestKeys = []

    // map to new 'column' array just holding uni criterion values
    var column = unis.map(uni => uni[criterion])
    var bestIndex = column.indexOf(Math.max(...column))
    var bestValue = column[bestIndex]

    // find keys of best unis in each column, and push to front if not already there
    for (var i=0, len=column.length; i<len; i++) {
      if (column[i] == bestValue) {
        var key = unis[i].key
        bestKeys.push(key)
        console.log('best ' + criterion + ': ' + unis[i].name)
        if (pareto.indexOf(key) == -1) {
          pareto.push(key)
          // console.log('pushing ' + key  )
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
    var uni = unisLeft.find(u => u.key === key)
    uni.front = frontRank
    // console.log(uni)

    // now remove uni from unisLeft
    console.log('filtering ' + 'key #' + key + ' ' + uni.name)
    newUnis = unisLeft.filter(u => u.key != key)
    // new unisLeft  = newUnis
    unisLeft = newUnis
  }

  console.log(' ')
  return newUnis
}


