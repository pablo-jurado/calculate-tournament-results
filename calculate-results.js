function calculateResultsArray (tournament) {
  // TODO: your code goes here

  function getCollection (obj) {
    var arr = []
    for (var prop in obj) {
      arr.push(obj[prop])
    }
    return arr
  }

  var games = getCollection(tournament.games)
  var teams = getCollection(tournament.teams)

  // console.log(games)
  console.log(teams)
}

function calculateResultsObject (tournament) {
  // TODO: your code goes here
}
// Feel free to add additional functions to this file as needed.

// this line is needed to export your functions so they can be used by the test suite
module.exports = {
  calculateResultsArray: calculateResultsArray,
  calculateResultsObject: calculateResultsObject
}
