'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;

class BrowserViewModel extends Observable {
  constructor() {
    super();
    this.games = addGames(0, 20);
  }
  
  loadMoreItems(args) {
    addGames(this.games.length, 10).forEach(game => this.games.push(game));
  }
}

function addGames(start, count) {
  let games = new ObservableArray([]);
  
  for(let i = 0; i < count; i++) {
    let game = {
      isPrivate: i % 2 === 0 ? true: false,
      creator: {
        userName: `Player ${start + i + 1}`,
        wins: Math.random() * 10 | 0,
        losses: Math.random() * 10 | 0
      }
    };
    
    games.push(game);
  }
  
  return games;
}

module.exports = {
  browserViewModel: new BrowserViewModel()
};