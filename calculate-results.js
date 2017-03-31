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

  var teams = objToArray(tournament.teams, 'team-id').map(formatTeams)
  var games = objToArray(tournament.games, 'game-id')

  filteredGames = games.filter(function () {
    // TODO: filter teams or games that did not play
  })

  // change format from JSON to result array format
  function formatTeams (item) {
    return {
      'team-name': item.name,
      'team-captain': item.captain,
      'team-id': item['team-id']
    }
  }
  // calculate Victory points by the Swiss format
  function getSwissPoints (win, tie, diff) {
    var points = 0
    points = (win * 3000) + (tie * 1000) + diff
    return points
  }

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
      if (item['status'] !== 'aborted') {
        if (item['teamB-id'] === team['team-id']) {
          if (item['scoreB'] < item['scoreA']) {
            all += 1
          }
        } else if (item['teamA-id'] === team['team-id']) {
          if (item['scoreB'] > item['scoreA']) {
            all += 1
          }
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

    // get points-won
    team['points-won'] = games.reduce(function (all, item) {
      if (item['teamB-id'] === team['team-id']) {
        all += item['scoreB']
      } else if (item['teamA-id'] === team['team-id']) {
        all += item['scoreA']
      }
      return all
    }, 0)

    // get point lost
    team['points-lost'] = team['points-played'] - team['points-won']

    // get point diff
    team['points-diff'] = team['points-won'] - team['points-lost']

    // get swiss points
    team['victory-points'] = getSwissPoints(team['games-won'], team['games-tied'], team['points-diff'])
  }) // <----- end of main forEach

  // sort teams by swiss points
  teams.sort(function (a, b) {
    return b['victory-points'] - a['victory-points']
  })

  // teams.forEach(function (element, index, array) {
  //   console.log('a[' + index + '] = ', element['victory-points'])
  // })

  function addPlace (element, index, array) {
    element.place = index + 1
  }
  // need to add place number to each team
  teams.forEach(addPlace)

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
