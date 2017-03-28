function calculateResultsArray (tournament) {
  // TODO: your code goes here

  function getTeams (obj) {
    var arr = []
    for (var prop in obj) {
      arr.push({[prop]: obj[prop]})
    }
    return arr
  }

  function getGames (obj) {
    var arr = []
    for (var prop in obj) {
      arr.push(obj[prop])
    }
    return arr
  }

  function getWinners (game) {
    if (game.scoreA > game.scoreB) return { [game['teamA-id']]: game.scoreA }
    if (game.scoreB > game.scoreA) return { [game['teamB-id']]: game.scoreB }
  }

  function getLoosers (game) {
    if (game.scoreA < game.scoreB) return { [game['teamA-id']]: game.scoreA }
    if (game.scoreB < game.scoreA) return { [game['teamB-id']]: game.scoreB }
    if (game.scoreA === game.scoreB) return { [game['teamA-id']]: game.scoreA, [game['teamB-id']]: game.scoreB }

  }

  var games = getGames(tournament.games)
  var teams = getTeams(tournament.teams)

  // console.log('team 1!!!', teams[0].team1)
  // console.log(games[0]['teamB-id'])

  var winners = games.map(getWinners)
  var loosers = games.map(getLoosers)
  console.log('winners!!!', winners)
  console.log('looser!', loosers)

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
