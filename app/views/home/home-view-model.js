'use strict';

let Observable = require("data/observable").Observable;
let frame = require('ui/frame');
let userService = require('../../services/user-service').defaultInstance;
let dialogs = require('ui/dialogs');

class HomeViewModel extends Observable {
  constructor() {
    super();
  }

  navigateToJoinGame(args) {
    frame.topmost()
      .navigate('./views/browser/browser-page');
  }

  navigateToCreateGame(args) {
    frame.topmost()
      .navigate('./views/create-game/create-game-page');
  }

  logout(args) {
    userService.logout()
      .then(function () {
        dialogs.alert({
          title: 'Success',
          message: 'Logout successful!',
          okButtonText: 'Ok'
        }).then(function () {
          frame.topmost()
            .navigate({
              moduleName: './views/start/start-page'
            });
        });
      });
  }
}

module.exports = {
  homeViewModel: new HomeViewModel()
};