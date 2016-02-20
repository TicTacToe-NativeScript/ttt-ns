'use strict';

let Observable = require('data/observable').Observable;

class GameViewModel extends Observable {
  constructor() {
    super();
  }
}

module.exports = {
  gameViewModel: new GameViewModel()
};