'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let userService = require('../../services/user-service').defaultInstance;

class HighscoreViewModel extends Observable {
  constructor() {
    super();
    this.topUsers = new ObservableArray([]);
    
    this.getTopUsers();
  }
  
  getTopUsers() {
    let that = this;
    
    userService.getTopUsers(10)
      .then(function (users) {
        users.forEach(function (item, index) {
          console.log(index);
          if (index === 0) {
            item.trophy = '~/resources/images/gold-trophy.png';
          }
          else if (index === 1) {
            item.trophy = '~/resources/images/silver-trophy.png';
          }
          else if (index === 2) {
            item.trophy = '~/resources/images/bronze-trophy.png';
          }
          
          console.dir(item);
          
          that.topUsers.push(item);
        });
      }, function (err) {
        console.log('-------Error while loading the top users.');
        console.dir(err);
      });
  }
}

module.exports = {
  highscoreViewModel: new HighscoreViewModel(),
  HighscoreViewModel: HighscoreViewModel
};