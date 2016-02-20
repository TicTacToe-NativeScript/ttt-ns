'use strict';

let Observable = require("data/observable").Observable;
let frame = require('ui/frame');

class MainViewModel extends Observable {
  constructor() {
    super();
  }
  
  navigateToSignUp(args) {
    frame.topmost()
      .navigate('./views/signup/signup-page');
  }
  
  navigateToJoinGame(args) {
    frame.topmost()
      .navigate('./views/browser/browser-page');
  }
  
  navigateToCreateGame(args) {
    frame.topmost()
      .navigate('./views/game/create-page');
  }
}

module.exports = {
  mainViewModel: new MainViewModel()
};