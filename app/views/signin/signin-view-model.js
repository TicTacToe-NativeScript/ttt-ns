'use strict';
let Observable = require('data/observable').Observable;
let globals = require('../../common/globals');
let Everlive = require('../../lib/everlive.all.min.js');
let applicationSettings = require('application-settings');

class SignInViewModel extends Observable {
  constructor() {
    super();
    this.username = '';
    this.password = '';
  }
  
  login() {
    let that = this;
    let el = new Everlive(globals.BS_API_KEY);
    let promise = new Promise(function (resolve, reject) {
      el.authentication.login(that.username, that.password, function (data) {
        let token = data.result.access_token;
        let userId = data.result.principal_id;
        applicationSettings.setString(globals.TOKEN_DATA_KEY, token);
        applicationSettings.setString(globals.USER_ID, userId);
        
        resolve();
      }, function (err) {
        console.log('-------Error when trying to login in el');
        reject(err);
      });
    });
    
    return promise;
  }
}

module.exports = {
  signinViewModel: new SignInViewModel()
};