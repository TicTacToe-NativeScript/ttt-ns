'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let globals = require('../../common/globals');
let Everlive = require('../../lib/everlive.all.min.js');
let applicationSettings = require('application-settings');
let el = null;
let data = null;

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

        this.dbBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.isPlayerOneTurn = true;
        this.iAmPlayerOne = false;
        
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
                // check if win condition is met
            }, function (err) {
                alert(JSON.stringify(err));
            });
      
        // Get IsPlayer1 from db
        // -> set to property
        // -> return
      
        return this.isPlayerOneTurn;
    }

    placeMark(pos) {
        let markToPlace = this.isPlayerOneTurn ? 1 : 2;
        let that = this;
        let success = false;
        let message = '';

        if(this.dbBoard[pos] > 0) {
            return {
                success: success,
                message: 'You cannot make this move!'
            }    
        }
        
        if((this.iAmPlayerOne && !this.isPlayerOneTurn) || (!this.iAmPlayerOne && this.isPlayerOneTurn)) {
            return {
                success: success,
                message: "It's not your turn!"
            }
        }
        
        this.dbBoard[pos] = markToPlace;
        
        this.isPlayerOneTurn = !this.isPlayerOneTurn;

        let tempId = "1e3a7730-d88b-11e5-8bca-093f125a03a4";
        data.updateSingle({ Id: tempId, 'Board': this.dbBoard, 'IsPlayer1': !this.isPlayerOneTurn },
            function (data) {
                success = true;
            },
            function (error) {
                alert(JSON.stringify(error));
                console.log(error);
            });
    
        // Check if position is available
        // Check which player's turn it is
      
        // Place marker on board depending on this.isPlayerOneTurn
        // save board on db
        // check if win condition is met
      
        // this.isPlayerOneTurn = !this.isPlayerOneTurn
        // restart timer
                
        console.log(pos + " cell tapped");

        return {
            success: success,
            mark: !that.isPlayerOneTurn ? 'X' : 'O',
            message: message
        }
    }

    placeRandomMark() {
        // Place marker if player doesnt play their turn within 30 secs 
    }
}

module.exports = {
    gameViewModel: new GameViewModel()
};