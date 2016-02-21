'use strict';

let Observable = require('data/observable').Observable;
let gamesService = require('../../services/games-service').defaultInstance;
let userService = require('../../services/user-service').defaultInstance;

class CreateGameViewModel extends Observable {
  constructor() {
    super();
    this.isPrivate = false;
    this.password = '';
  }

  createGame() {
    let that = this;
    let promise = new Promise(function (resolve, reject) {
      userService.getCurrentUser()
        .then(function (data) {
          return Promise.resolve(data);
        }, reject)
        .then(function (currentUser) {
          return gamesService.createGame(currentUser.userId, currentUser.username, that.isPrivate, that.password);
        })
        .then(resolve, reject);
    });

    return promise;
  }
}

module.exports = {
  createGameViewModel: new CreateGameViewModel()
};