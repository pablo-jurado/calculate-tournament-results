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

  function formatTeams (item) {
    return {
      'team-name': item.name,
      'team-captain': item.captain,
      'team-id': item['team-id']
    }
  }

  var teams = objToArray(tournament.teams, 'team-id')
  teams = teams.map(formatTeams)
  var games = objToArray(tournament.games, 'game-id')

  teams.forEach(function (team) {
    // reduce games array and return the numbers of games played for each team
    team['games-played'] = games.reduce(function (all, item) {
      if (item['status'] !== 'aborted') {
        if (item['teamB-id'] === team['team-id'] || item['teamA-id'] === team['team-id']) {
          all += 1
        }
      }
      return all
    }, 0)

    // check for games lost
    team['games-lost'] = games.reduce(function (all, item) {
      if (item['teamB-id'] === team['team-id']) {
        if (item['scoreB'] < item['scoreA']) {
          all += 1
        }
      } else if (item['teamA-id'] === team['team-id']) {
        if (item['scoreB'] > item['scoreA']) {
          all += 1
        }
      }
      return all
    }, 0)

    // check for games won
    team['games-won'] = games.reduce(function (all, item) {
      if (item['teamB-id'] === team['team-id']) {
        if (item['scoreB'] > item['scoreA']) {
          all += 1
        }
      } else if (item['teamA-id'] === team['team-id']) {
        if (item['scoreB'] < item['scoreA']) {
          all += 1
        }
      }
      return all
    }, 0)

    // check for tied games
    team['games-tied'] = games.reduce(function (all, item) {
      if (item['teamB-id'] === team['team-id'] || item['teamA-id'] === team['team-id']) {
        if (item['scoreB'] === item['scoreA']) {
          all += 1
        }
      }
      return all
    }, 0)

    // get points played
    team['points-played'] = games.reduce(function (all, item) {
      if (item['teamB-id'] === team['team-id'] || item['teamA-id'] === team['team-id']) {
        var result = item['scoreB'] + item['scoreA']
        all += result
      }
      return all
    }, 0)

  })

  console.log(teams)
  // return teams
} // <---- end of calculateResultsArray




function calculateResultsObject (tournament) {
  // TODO: your code goes here
}
// Feel free to add additional functions to this file as needed.

// this line is needed to export your functions so they can be used by the test suite
module.exports = {
  calculateResultsArray: calculateResultsArray
  // calculateResultsObject: calculateResultsObject
}
