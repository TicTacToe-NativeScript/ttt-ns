'use strict';
let Observable = require('data/observable').Observable;
let userService = require('../../services/user-service').defaultInstance;

class SignInViewModel extends Observable {
  constructor() {
    super();
    this.email = '';
    this.password = '';
  }

  login() {
    return userService.login(this.email, this.password);
  }
}

module.exports = {
  signinViewModel: new SignInViewModel()
};