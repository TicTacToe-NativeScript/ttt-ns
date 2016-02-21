'use strict';

let Observable = require("data/observable").Observable;
let ObservableArray = require("data/observable-array").ObservableArray;
let sqliteDbHandler = require('../../database/sqlite-db-handler').defaultInstance;
let userService = require('../../services/user-service').defaultInstance;

class ProfileViewModel extends Observable {
  constructor() {
    super();
    
    this.gameResults = new ObservableArray([]);
    this.currentGameResultIndex = 0;
    this.currentGameResult = null;
    this.currentUser = null;
  }

  loadGameResults() {
    let that = this;
    let promise = new Promise(function (resolve, reject) {
      userService.getCurrentUser()
        .then(function (currentUser) {
          that.set('currentUser', currentUser);
          return Promise.resolve(currentUser);
        })
        .then(function (user) {
          return sqliteDbHandler.getGameResultsForUser(1);
        }, reject)
        .then(function (data) {
          data.forEach(function (element, index) {
            if (index === 0) {
              that.currentGameResultIndex = 0;
              that.currentGameResult = element;
            }

            that.gameResults.push(element);
          });

          resolve(true);
        }, function (err) {
          console.log('-------Error in get game results for user.');
          console.dir(err);
          reject(err);
        });
    });

    return promise;
  }
}

module.exports = {
  profileViewModel: new ProfileViewModel()
};