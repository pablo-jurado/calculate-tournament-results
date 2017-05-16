// takes JSON and transform to array
function objToArray (obj, key) {
  var arr = []
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue
    var itm = obj[i]
    if (typeof key === 'string') itm[key] = i
    arr.push(itm)
  }
  return arr
}

function getFinishedGames (game) {
  return (game['status'] !== 'aborted')
}

function calculateResultsArray (tournament) {
  let arrTeams = objToArray(tournament.teams, 'team')
  let arrGames = objToArray(tournament.games, 'game').filter(getFinishedGames)

  let result = arrGames.forEach((game) => {
    let winner = ''
    if (game['scoreB'] > game['scoreA']) winner = game['teamB-id']
    if (game['scoreB'] < game['scoreA']) winner = game['teamA-id']
    if (game['scoreB'] === game['scoreA']) winner = game['teamB-id'] + ' tied ' + game['teamA-id']
    console.log(game.game, winner)
  })
}

function calculateResultsObject (tournament) {

}

// this line is needed to export your functions so they can be used by the test suite
module.exports = {
  calculateResultsArray: calculateResultsArray,
  calculateResultsObject: calculateResultsObject
}
