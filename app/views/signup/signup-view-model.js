'use strict';

let Observable = require("data/observable").Observable;
let frame = require("ui/frame");
let userService = require('../../services/user-service').getUserService('https');

class SignupViewModel extends Observable {
  constructor() {
    super();

    this.email = "";
    this.password = "";
    this.username = "";
    this.isLoading = false;
  }

  signUp() {
    this.isLoading = true;
    let that = this;
    let promise = new Promise(function (resolve, reject) {
      userService.signUp(that.email, that.password, that.username)
        .then(function (data) {
          that.isLoading = false;
          resolve(data);
        }, function (err) {
          that.isLoading = false;
          reject(err);
        });
    });

    return promise;
  }
}

module.exports = {
  signupViewModel: new SignupViewModel()
};