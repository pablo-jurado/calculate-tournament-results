function calculateResultsArray (tournament) {
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

  // change format from JSON to array result format
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

  var teams = objToArray(tournament.teams, 'team-id').map(formatTeams)
  var games = objToArray(tournament.games, 'game-id').filter(filterAbortedGames)

  // main forEach for reduce by team
  teams.forEach(function (team) {
    // reduce games array and return the numbers of games played for each team
    team['games-played'] = games.reduce(function (all, item) {
      if (item['teamB-id'] === team['team-id'] || item['teamA-id'] === team['team-id']) {
        all += 1
      }
      return all
    }, 0)
  })

  // check for lost games
  teams.forEach(function (team) {
    function getGamesLost (all, item) {
      if (item['teamB-id'] === team['team-id']) {
        if (item['scoreB'] < item['scoreA']) all++
      } else if (item['teamA-id'] === team['team-id']) {
        if (item['scoreB'] > item['scoreA']) all++
      }
      return all
    }
    team['games-lost'] = games.reduce(getGamesLost, 0)
  })

  // check for games won
  teams.forEach(function (team) {
    function getGamesWon (all, item) {
      if (item['teamB-id'] === team['team-id']) {
        if (item['scoreB'] > item['scoreA']) all++
      } else if (item['teamA-id'] === team['team-id']) {
        if (item['scoreB'] < item['scoreA']) all++
      }
      return all
    }
    team['games-won'] = games.reduce(getGamesWon, 0)
  })

  // check for tied games
  teams.forEach(function (team) {
    function getGamesTied (all, item) {
      if (item['teamB-id'] === team['team-id'] || item['teamA-id'] === team['team-id']) {
        if (item['scoreB'] === item['scoreA']) all++
      }
      return all
    }
    team['games-tied'] = games.reduce(getGamesTied, 0)
  })

  // get points played
  teams.forEach(function (team) {
    function getPointPLayed (all, item) {
      if (item['teamB-id'] === team['team-id'] || item['teamA-id'] === team['team-id']) {
        var result = item['scoreB'] + item['scoreA']
        all += result
      }
      return all
    }
    team['points-played'] = games.reduce(getPointPLayed, 0)
  })
  // get points-won
  teams.forEach(function (team) {
    function getPointsWon (all, item) {
      if (item['teamB-id'] === team['team-id']) {
        all += item['scoreB']
      } else if (item['teamA-id'] === team['team-id']) {
        all += item['scoreA']
      }
      return all
    }
    team['points-won'] = games.reduce(getPointsWon, 0)
  })
    // get point lost
  teams.forEach(function (team) {
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
      victoryPoints: item['victory-points'],
      teamId: item['team-id']
    }
  }

  var reformatArr = teamsDataArr.map(reformatObj)

  // convert arr to obj, asign team id as a obj key
  function arrToObj (arr) {
    var obj = {}
    arr.forEach(function (item) {
      var key = item['teamId']
      delete item['teamId']
      obj[key] = item
    })
    return obj
  }

  var teamsObj = arrToObj(reformatArr)

  return teamsObj
}
// Feel free to add additional functions to this file as needed.

// this line is needed to export your functions so they can be used by the test suite
module.exports = {
  calculateResultsArray: calculateResultsArray,
  calculateResultsObject: calculateResultsObject
}
