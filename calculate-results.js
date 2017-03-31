function calculateResultsArray (tournament) {
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

  // change format from JSON to result array format
  function formatTeams (item) {
    return {
      'team-name': item.name,
      'team-captain': item.captain,
      'team-id': item['team-id']
    }
  }
  // filter aborted games
  function filterAbortedGames (item) {
    if (item.status !== 'aborted') return item
  }

  var teams = objToArray(tournament.teams, 'team-id').map(formatTeams)
  var games = objToArray(tournament.games, 'game-id').filter(filterAbortedGames)

  // filter teams that did not play
  function filterTeamsNotPlayed (item) {
    if (item['games-played'] !== 0) return item
  }

  // calculate Victory points by the Swiss format
  function getSwissPoints (win, tie, diff) {
    var points = 0
    points = (win * 3000) + (tie * 1000) + diff
    return points
  }

  // sort teams by swiss points
  function sortByPoints (a, b) {
    return b['victory-points'] - a['victory-points']
  }

  // add place number (only used after sorting)
  function addPlace (element, index, array) {
    element.place = index + 1
  }

  // main forEach for reduce by team
  teams.forEach(function (team) {
    // reduce games array and return the numbers of games played for each team
    team['games-played'] = games.reduce(function (all, item) {
      if (item['teamB-id'] === team['team-id'] || item['teamA-id'] === team['team-id']) {
        all += 1
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

  teams = teams.filter(filterTeamsNotPlayed)

  teams.sort(sortByPoints)

  // need to add place number to each team
  teams.forEach(addPlace)

  return teams
} // <---- end of calculateResultsArray

function calculateResultsObject (tournament) {
  var teamsDataArr = calculateResultsArray(tournament)

  function reformatObj (item) {
    return {
      gamesLost: item['games-lost'],
      gamesPlayed: item['games-played'],
      gamesTied: item['games-tied'],
      gamesWon: item['games-won'],
      place: item['place'],
      pointDiff: item['points-diff'],
      pointsLost: item['points-lost'],
      pointsPlayed: item['points-played'],
      pointsWon: item['points-won'],
      teamCaptain: item['team-captain'],
      teamName: item['team-name'],
      victoryPoints: item['victory-points']
    }
  }

  var teamsObj = teamsDataArr.map(reformatObj)

  console.log(teamsObj)

 //return teamsObj
}
// Feel free to add additional functions to this file as needed.

// this line is needed to export your functions so they can be used by the test suite
module.exports = {
  calculateResultsArray: calculateResultsArray,
  calculateResultsObject: calculateResultsObject
}
