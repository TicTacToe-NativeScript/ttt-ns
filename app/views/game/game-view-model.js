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

        this.isPlayerOneTurn = true;
        this.iAmPlayerOne = true;

        this.gameId = "";

        el = new Everlive(globals.BS_API_KEY);
        data = el.data('Game');

        this.checkStatus();
    }

    checkStatus(callback) {
        let tempId = "1e3a7730-d88b-11e5-8bca-093f125a03a4";
        let that = this;
        data.getById(tempId) //this.gameId)
            .then(function (data) {
                var result = data.result;
                var board = result.Board;

                if (that.isPlayerOneTurn != result.isPlayer1) {
                    that.set("isPlayerOneTurn", result.IsPlayer1);
                }

                if (that.dbBoard.join('') != board.join('')) {
                    that.dbBoard = board;
                    that.rebindBoard();
                }

                result = {
                    gameOver: result.GameIsOver,
                    hasPlayerTwo: result.Player2Id != null
                };
                
                callback(result);
            }, function (err) {
                alert(JSON.stringify(err));
            });
    }

    rebindBoard() {
        for (let i = 0; i < this.dbBoard.length; i++) {
            this.set("cell" + i, marks[this.dbBoard[i]]);
        }
    }

    placeMark(pos, callback) {
        let markToPlace = this.isPlayerOneTurn ? 1 : 2;
        let that = this;
        let success = false;
        let result = {};

        if (this.dbBoard[pos] > 0) {
            return {
                success: success,
                message: 'You cannot make this move!'
            }
        }

        this.dbBoard[pos] = markToPlace;

        let tempId = "1e3a7730-d88b-11e5-8bca-093f125a03a4";
        data.updateSingle({ Id: tempId, 'IsPlayer1': !that.isPlayerOneTurn, 'Board': that.dbBoard },
            function (data) {
                that.rebindBoard();
                that.set("isPlayerOneTurn", !that.isPlayerOneTurn);
                
                result.success = true;
                
                callback(result);
            },
            function (error) {
                alert(JSON.stringify(error));
                
                result.success = false;
                result.message = error;
                
                callback(result)
            });
    }
    
    checkIfGameOver() {
        
    }
}

module.exports = {
    gameViewModel: new GameViewModel()
};