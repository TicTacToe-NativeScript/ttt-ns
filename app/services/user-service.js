'use strict';
let BaseService = require('./base-service').BaseService;
let globals = require('../common/globals');
let applicationSettings = require('application-settings');

class UserService extends BaseService {
  constructor(scheme) {
    super(scheme);
  }

  signUp(email, password, username) {
    let that = this;
    let info = {
      DisplayName: username,
      Email: email,
      GamesPlayed: 0,
      GamesWon: 0,
      GamesLost: 0
    };

    let promise = new Promise(function (resolve, reject) {
      // Todo: validate input
      if (true) {
        that.everlive.Users.register(
          email,
          password,
          info,
          function (data) {
            that.login(email, password)
              .then(resolve, reject);
          },
          function (error) {
            reject(error.message || "Can't register");
          });
      } else {
        reject("Invalid input");
      }
    });

    return promise;
  }

  login(email, password) {
    let that = this;
    let promise = new Promise(function (resolve, reject) {
      that.everlive.authentication.login(email, password, function (data) {
        let token = data.result.access_token;
        let userId = data.result.principal_id;
        that.everlive.Users.getById(userId)
          .then(function (fullUser) {
            return Promise.resolve({
              fullUser: fullUser.result,
              token: token,
              userId: userId
            });
          }, reject)
          .then(function (setUserInfo) {
            return that.setCurrentUser(setUserInfo.token, setUserInfo.userId, setUserInfo.fullUser.DisplayName);
          })
          .then(resolve, reject);
      }, reject);
    });

    return promise;
  }

  logout() {
    this.everlive.authentication.clearAuthorization();
    applicationSettings.remove(globals.TOKEN_DATA_KEY);
    applicationSettings.remove(globals.USER_ID);
    applicationSettings.remove(globals.USER_USERNAME);

    let promise = Promise.resolve();

    return promise;
  }

  setCurrentUser(token, userId, username) {
    let promise = new Promise(function (resolve, reject) {
      if (!token || !userId || !username) {
        reject({
          message: 'The token, the user id and the username are required to set the current user.'
        });

        return;
      }

      applicationSettings.setString(globals.TOKEN_DATA_KEY, token);
      applicationSettings.setString(globals.USER_ID, userId);
      applicationSettings.setString(globals.USER_USERNAME, username);

      resolve();
    });

    return promise;
  }

  getFullCurrentUserInfo() {
    let that = this;
    let promise = new Promise(function (resolve, reject) {
      that.getCurrentUser()
        .then(function (currentUser) {
          return Promise.resolve(currentUser);
        }, reject)
        .then(function (currentUser) {
          that.everlive.Users.getById(currentUser.userId)
            .then(function (fullUser) {
              resolve(fullUser.result);
            }, reject);
        });
    });

    return promise;
  }

  getCurrentUser() {
    let promise = Promise.resolve({
      token: applicationSettings.getString(globals.TOKEN_DATA_KEY),
      userId: applicationSettings.getString(globals.USER_ID),
      username: applicationSettings.getString(globals.USER_USERNAME)
    });

    return promise;
  }
}

module.exports = {
  UserService: UserService,
  getUserService: function (schema) {
    return new UserService(schema);
  },
  defaultInstance: new UserService()
};