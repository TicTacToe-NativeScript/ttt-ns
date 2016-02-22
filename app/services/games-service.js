'use strict';
let BaseService = require('./base-service').BaseService;
let userService = require('./user-service').defaultInstance;
let pageSize = 10;

class GamesService extends BaseService {
  constructor(scheme) {
    super(scheme);
  }

  getGamesWaitingForPlayerForPage(page) {
    page = page || 1;
    let query = new this.el.Query()
      .where({
        'Player2Id': null
      })
      .order({
        'CreatedAt': -1
      })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .expand({
        Player1Id: true,
        Player2Id: true
      });
      
    let promise = new Promise((resolve, reject) => {
      this.everlive.data('Game').get(query)
        .then(function (data) {
          resolve(data.result);
        }, reject);
    });

    return promise;
  }

  getAllGamesForPage(page) {
    page = page || 1;
    let query = new this.el.Query()
      .order({ 'CreatedAt': -1 })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .expand({
        Player1Id: true,
        Player2Id: true
      });

    this.everlive.data('Game').get(query)
      .then(function (data) {
        console.log('-----All games');
        console.dir(data);
      }, function (err) {
        console.log('-----Error');
        console.dir(err);
      });
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
            Board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
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