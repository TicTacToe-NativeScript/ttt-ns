'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let gamesService = require('../../services/games-service').defaultInstance;

class BrowserViewModel extends Observable {
  constructor() {
    super();
    
    this.games = new ObservableArray([]);
    this.page = 0;
    this.loadMoreItems();
  }

  loadMoreItems(args) {
    this.page += 1;
    let that = this;
    gamesService.getGamesWaitingForPlayerForPage(this.page)
      .then(function (availableGames) {
        // console.dir(availableGames);
        availableGames.forEach(game => {
          that.games.push(game);
        });
      }, function (err) {
        console.log('------Error while loading the available games.');
        console.dir(err);
      });
  }

  navigateToGamePage(args) {
    let selectedGame = this.games.getItem(args.index);
    if (!selectedGame.IsPublic) {
      dialogs.prompt({
        title: 'Password for private game',
        message: 'Enter the password:',
        okButtonText: 'Ok'
      })
        .then(function (result) {
          let password = result.text;

          if (selectedGame.Passkey === password) {
            navigate(selectedGame);
          }
          else {
            dialogs.alert({
              title: 'Incorrect pass',
              message: 'The password is incorrect.'
            });
          }
        });
    }
    else {
      navigate(selectedGame);
    }
  }
}

function navigate(selectedGame) {
  let navigationEntry = {
    moduleName: "./views/game/game-page",
    context: selectedGame,
    animated: true,
    backstackVisible: false
  };

  frame.topmost()
    .navigate(navigationEntry);
}


module.exports = {
  BrowserViewModel: BrowserViewModel,
  browserViewModel: new BrowserViewModel()
};