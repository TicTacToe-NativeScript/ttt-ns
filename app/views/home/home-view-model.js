'use strict';

let Observable = require("data/observable").Observable;
let frame = require('ui/frame');

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
}

module.exports = {
  homeViewModel: new HomeViewModel()
};