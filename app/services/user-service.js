'use strict';
let Everlive = require('../lib/everlive.all.min');
let globals = require('../common/globals');
let applicationSettings = require('application-settings');

class UserService {
  constructor(scheme) {
    this.everlive = new Everlive({
      appId: globals.BS_API_KEY,
      scheme: scheme || 'http'
    });
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
    console.log(email);
    console.log(password);
    let promise = new Promise(function (resolve, reject) {
      that.everlive.authentication.login(email, password, function (data) {
        let token = data.result.access_token;
        let userId = data.result.principal_id;
        that.setCurrentUser(token, userId);
        resolve();
      }, function (err) {
        console.log('-------Error when trying to login in el');
        reject(err);
      });
    });
    
    return promise;
  }
  
  logout() {
    this.everlive.authentication.clearAuthorization();
    applicationSettings.remove(globals.TOKEN_DATA_KEY);
    applicationSettings.remove(globals.USER_ID);
  }

  setCurrentUser(token, userId) {
    if (!token || !userId) {
      // TODO: return error.
      return;
    }

    applicationSettings.setString(globals.TOKEN_DATA_KEY, token);
    applicationSettings.setString(globals.USER_ID, userId);
  }

  getCurrentUser() {
    return {
      token: applicationSettings.getString(globals.TOKEN_DATA_KEY),
      userId: applicationSettings.getString(globals.USER_ID)
    };
  }
}

module.exports = {
  UserService: UserService,
  getUserService: function (schema) {
    return new UserService(schema);
  },
  defaultInstance: new UserService()
};