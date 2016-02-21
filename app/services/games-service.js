'use strict';
let BaseService = require('./base-service').BaseService;
let userService = require('./user-service').defaultInstance;

class GamesService extends BaseService {
  constructor(scheme) {
    super(scheme);
  }

  createGame(playerOneId, playerOneName, isPrivate, password) {
    let that = this;
    let promise = new Promise(function (resolve, reject) {
      userService.getCurrentUser()
        .then(function (data) {
          return Promise.resolve(data);
        }, reject)
        .then(function (currentUser) {
          let games = that.everlive.data('Game');
          
          let gameToCreate = {
            Board: [0,0,0,0,0,0,0,0,0],
            IsPlayer1: true,
            IsPublic: !isPrivate,
            Player1Name: playerOneName,
            Player1Id: playerOneId,
            Passkey: password
          };
          
          games.create(gameToCreate, resolve, reject);
        }, reject);
    });
    
    return promise;
  }
}

module.exports = {
  GamesService: GamesService,
  getGamesService: function (schema) {
    return new GamesService(schema);
  },
  defaultInstance: new GamesService()
};