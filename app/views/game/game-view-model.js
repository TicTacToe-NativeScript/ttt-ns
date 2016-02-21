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
        this.cell0 = '';
        this.cell1 = '';
        this.cell2 = '';
        this.cell3 = '';
        this.cell4 = '';
        this.cell5 = '';
        this.cell6 = '';
        this.cell7 = '';
        this.cell8 = '';    

        this.rebindBoard();

        this.isPlayerOneTurn = true;
        this.iAmPlayerOne = false;

        this.gameId = "";

        el = new Everlive(globals.BS_API_KEY);
        data = el.data('Game');
    }

    checkStatus() {
        let tempId = "1e3a7730-d88b-11e5-8bca-093f125a03a4";
        let that = this;
        data.getById(tempId) //this.gameId)
            .then(function (data) {
                var result = data.result;
                var board = result.Board;
                that.dbBoard = board;
                
                that.rebindBoard();
                // send back to views and redraw
                // check if win condition is met
            }, function (err) {
                alert(JSON.stringify(err));
            });
      
        // Get IsPlayer1 from db
        // -> set to property
        // -> return
      
        return this.isPlayerOneTurn;
    }

    rebindBoard() {
        console.log("Inside rebind");
        for (let i = 0; i < this.dbBoard.length; i++) {
            this.set("cell" + i, marks[this.dbBoard[i]]);
        }
    }

    placeMark(pos) {
        let markToPlace = this.isPlayerOneTurn ? 1 : 2;
        let that = this;
        let success = false;
        let message = '';

        console.log("Placing at pos " + pos);
        console.log(this.dbBoard);
        
        if (this.dbBoard[pos] > 0) {
            return {
                success: success,
                message: 'You cannot make this move!'
            }
        }

        // if ((this.iAmPlayerOne && !this.isPlayerOneTurn) || (!this.iAmPlayerOne && this.isPlayerOneTurn)) {
        //     return {
        //         success: success,
        //         message: "It's not your turn!"
        //     }
        // }

        this.dbBoard[pos] = markToPlace;

        this.set("isPlayerOneTurn", !this.isPlayerOneTurn);
       
        let tempId = "1e3a7730-d88b-11e5-8bca-093f125a03a4";
        data.updateSingle({ Id: tempId, 'Board': this.dbBoard, 'IsPlayer1': !this.isPlayerOneTurn },
            function (data) {
                success = true;
                
                that.rebindBoard();
                
                return {
                    success: success,
                    mark: !that.isPlayerOneTurn ? 'X' : 'O',
                    message: message
                }
            },
            function (error) {
                alert(JSON.stringify(error));
                console.log(error);
                return {
                    success: success,
                    message: error
                };
            });
    }

    placeRandomMark() {
        // Place marker if player doesnt play their turn within 30 secs 
    }
}

module.exports = {
    gameViewModel: new GameViewModel()
};