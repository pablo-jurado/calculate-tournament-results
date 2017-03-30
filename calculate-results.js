function calculateResultsArray (tournament) {
  // TODO: your code goes here
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
  var teams = objToArray(tournament.teams, 'team-id')
  var games = objToArray(tournament.games, 'game-id')

  teams.forEach(function (team) {
    // reduce games array and return the numbers of games playes
    team['gamesPlayed'] = games.reduce(function (all, item) {
      if (item['status'] !== 'aborted') {
        if (item['teamB-id'] === team['team-id'] || item['teamA-id'] === team['team-id']) {
          all += 1
        }
      }
      return all
    }, 0)
  })

  return teams
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
