'use strict';

let Observable = require('data/observable').Observable;
let globals = require('../../common/globals');
let Everlive = require('../../lib/everlive.all.min.js');
let applicationSettings = require('application-settings');
let el = null;
let data = null;
let dbBoard = [];

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

        this.board = [];
        this.isPlayerOneTurn = true;
        this.gameId = "";

        el = new Everlive(globals.BS_API_KEY);
        data = el.data('Game');
    }

    checkStatus() {
        var tempId = "1e3a7730-d88b-11e5-8bca-093f125a03a4";
        data.getById(tempId) //this.gameId)
            .then(function (data) {
                var result = data.result;
                var board = result.Board;

                dbBoard = board;
                alert(JSON.stringify(dbBoard));
                this.isPlayerOneTurn = result.IsPlayer1;

                for (var i = 0; i < board.length; i++) {
                    this.board[i] = marks[board[i]];
                }

                // alert(JSON.stringify(this.board));
            }, function (err) {
                alert(JSON.stringify(err));
            });
      
        // Get IsPlayer1 from db
        // -> set to property
        // -> return
      
        return this.isPlayerOneTurn;
    }

    getBoard() {
        // rebind all cells in this.board
    }

    placeMark(pos) {
        let markToPlace = this.isPlayerOneTurn ? 1 : 2;
        console.dir(dbBoard);
        dbBoard[pos] = markToPlace;
        this.isPlayerOneTurn = !this.isPlayerOneTurn;
        
        let tempId = "1e3a7730-d88b-11e5-8bca-093f125a03a4";
        data.updateSingle({ Id: tempId, 'Bord': dbBoard, 'IsPlayer1': this.isPlayerOneTurn },
            function (data) {
                alert(JSON.stringify(data));
                this.checkStatus();
            },
            function (error) {
                alert(JSON.stringify(error));
            });
    
        // Check if position is available
        // Check which player's turn it is
      
        // Place marker on board depending on this.isPlayerOneTurn
        // save board on db
        // check if win condition is met
      
        // this.isPlayerOneTurn = !this.isPlayerOneTurn
        // restart timer
        console.log(pos + " cell tapped");
    }

    placeRandomMark() {
        // Place marker if player doesnt play their turn within 30 secs 
    }
}

module.exports = {
    gameViewModel: new GameViewModel()
};