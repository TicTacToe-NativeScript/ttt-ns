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

  navigateToSignIn(args) {
    frame.topmost()
      .navigate({
        moduleName: './views/signin/signin-page',
        animated: true,
        transition: "flip"
      });
  }
}

module.exports = {
  mainViewModel: new MainViewModel()
};