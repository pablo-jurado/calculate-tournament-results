function calculateResultsArray (tournament) {
  // TODO: your code goes here

  // function getData (obj) {
  //   var arr = []
  //   for (var prop in obj) {
  //     arr.push({[prop]: obj[prop]})
  //   }
  //   return arr
  // }
  // var games = getData(tournament.games)
  // var teams = getData(tournament.teams)

  function getWinners (game) {
    if (game.scoreA > game.scoreB) return { [game['teamA-id']]: game.scoreA }
    if (game.scoreB > game.scoreA) return { [game['teamB-id']]: game.scoreB }
  }

  function getLoosers (game) {
    if (game.scoreA < game.scoreB) return { [game['teamA-id']]: game.scoreA }
    if (game.scoreB < game.scoreA) return { [game['teamB-id']]: game.scoreB }
    if (game.scoreA === game.scoreB) return { [game['teamA-id']]: game.scoreA, [game['teamB-id']]: game.scoreB }
  }

  var gamesArr = Object.keys(tournament.games).map(function (item) {
    return tournament.games[item]
  })

  var teamsArr = Object.keys(tournament.teams).map(function (item) {
    return tournament.teams[item]
  })
  console.log(teamsArr)
  // console.log('hi!!!', gamesArr[0])

  // var winners = games.map(getWinners)
  // var loosers = games.map(getLoosers)
  // console.log('winners!!!', winners)
  // console.log('looser!', loosers)

} // <---- end of calculateResultsArray

function calculateResultsObject (tournament) {
  // TODO: your code goes here
}
// Feel free to add additional functions to this file as needed.

// this line is needed to export your functions so they can be used by the test suite
module.exports = {
  calculateResultsArray: calculateResultsArray,
  calculateResultsObject: calculateResultsObject
}
