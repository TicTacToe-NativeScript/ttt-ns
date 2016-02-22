'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let gamesService = require('../../services/games-service').defaultInstance;
let userService = require('../../services/user-service').defaultInstance;

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
    userService.getCurrentUser()
      .then(function (user) {
        gamesService.getById(selectedGame.Id)
          .then(function (dbGame) {
            if (dbGame.Player2Id && dbGame.Player1Id != user.userId && dbGame.Player2Id != user.userId) {
              dialogs.alert({
                title: 'Cannot join this game',
                message: 'This game has second player.',
                okButtonText: 'Ok'
              })
                .then(function () {
                  args.page.onPageLoad(args.page);
                });
              return;
            }

            if (!dbGame.IsPublic) {
              dialogs.prompt({
                title: 'Password for private game',
                message: 'Enter the password:',
                okButtonText: 'Ok'
              })
                .then(function (result) {
                  let password = result.text;

                  if (dbGame.Passkey === password) {
                    navigate(dbGame);
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
              navigate(dbGame);
            }
          }, function (err) {
            console.log('-------Error while getting the selected game info.');
            console.dir(err);
          });
      });
  }
}

function navigate(selectedGame) {
  let navigationEntry = {
    moduleName: "./views/game/game-page",
    context: selectedGame,
    animated: true
  };

  frame.topmost()
    .navigate(navigationEntry);
}


module.exports = {
  BrowserViewModel: BrowserViewModel,
  browserViewModel: new BrowserViewModel()
};