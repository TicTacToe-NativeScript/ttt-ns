'use strict';

let Observable = require('data/observable').Observable;

class GameViewModel extends Observable {
  constructor() {
    super();
    this.firstPlayer = {
      userName: 'First Player'
    };
    
    this.secondPlayer = {
      userName: 'Second Player'
    };
  }
}

module.exports = {
  gameViewModel: new GameViewModel()
};