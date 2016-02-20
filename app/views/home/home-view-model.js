'use strict';

let Observable = require("data/observable").Observable;
let frame = require('ui/frame');
let applicationSettings = require('application-settings');
let globals = require('../../common/globals');
let Everlive = require('../../lib/everlive.all.min.js');
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
      .navigate('./views/game/create-page');
  }

  logout(args) {
    let el = new Everlive(globals.BS_API_KEY);
    el.authentication.clearAuthorization();
    applicationSettings.remove(globals.TOKEN_DATA_KEY);
    applicationSettings.remove(globals.USER_ID);

    dialogs.alert({
      title: 'Success',
      message: 'Logout successful!',
      okButtonText: 'Ok'
    }).then(function(){
      frame.topmost()
        .navigate({
          moduleName: './views/start/start-page'
        });
    });
  }
}

module.exports = {
  homeViewModel: new HomeViewModel()
};