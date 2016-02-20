'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');

class BrowserViewModel extends Observable {
  constructor() {
    super();
    this.games = addGames(0, 20);
  }

  loadMoreItems(args) {
    addGames(this.games.length, 10).forEach(game => this.games.push(game));
  }

  navigateToGamePage(args) {
    let selectedGame = this.games.getItem(args.index);
    if (selectedGame.isPrivate) {
      dialogs.prompt({
        title: 'Password for private game',
        message: 'Enter the password:',
        okButtonText: 'Ok'
      })
        .then(function(result) {
          let password = result.text;
          
          if (selectedGame.password === password) {
            navigate(selectedGame);
          }
          else {
            dialogs.alert('The password is incorrect. Please try again.');
          }
        });
    }
    else {
      navigate(selectedGame);
  }
}
}

function navigate(selectedGame)
{
  let navigationEntry = {
        moduleName: "./views/game/game-page",
        context: selectedGame,
        animated: true
      };
      
      frame.topmost()
        .navigate(navigationEntry);
}

function addGames(start, count) {
  let games = new ObservableArray([]);

  for (let i = 0; i < count; i++) {
    let game = {
      id: start + i,
      isPrivate: i % 2 === 0 ? true : false,
      password: '123',
      creator: {
        userName: `Player ${start + i + 1}`,
        wins: Math.random() * 10 | 0,
        losses: Math.random() * 10 | 0
      }
    };

    games.push(game);
  }

  return games;
}

module.exports = {
  browserViewModel: new BrowserViewModel()
};