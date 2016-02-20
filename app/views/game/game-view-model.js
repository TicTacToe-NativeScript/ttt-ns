'use strict';

let Observable = require('data/observable').Observable;
let marks = [' ', 'X', 'O'];

class GameViewModel extends Observable {
  constructor() {
    super();
    this.firstPlayer = {
      userName: 'First Player'
    };
    
    this.secondPlayer = {
      userName: 'Second Player'
    };
    
    this.board = {};
    this.isPlayerOneTurn = true;
  }
  
  checkStatus() {
      // Get IsPlayer1 from db
      // -> set to property
      // -> return
      
      return this.isPlayerOneTurn;
  }
  
  getBoard() {
      // rebind all cells in this.board
  }
  
  placeMark(pos) {
      // Check if position is available
      // Check which player's turn it is
      
      // Place marker on board depending on this.isPlayerOneTurn
      // save board on db
      // check if win condition is met
      
      // this.isPlayerOneTurn = !this.isPlayerOneTurn
      // restart timer
      console.log(pos + " cell tapped");
  }
}

module.exports = {
  gameViewModel: new GameViewModel()
};