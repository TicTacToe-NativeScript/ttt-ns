'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let globals = require('../../common/globals');
let Everlive = require('../../lib/everlive.all.min.js');
let applicationSettings = require('application-settings');
let el = null;
let data = null;
let sound = require('nativescript-sound');
var sqliteDb = require('../../database/sqlite-db-handler').defaultInstance;

let winSound = sound.create('~/resources/sounds/win.wav');
let lossSound = sound.create('~/resources/sounds/loss.wav');
let bopSound = sound.create('~/resources/sounds/playturn.wav');
let gamesService = require('../../services/games-service').defaultInstance;
let userService = require('../../services/user-service').defaultInstance;

let marks = [' ', 'X', 'O'];

class GameViewModel extends Observable {
  constructor() {
    super();
    this.firstPlayer = 'First Player';

    this.secondPlayer = 'Second Player';

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
    this.hasSecondPlayer = false;

    this.gameId = "";

    this.rebindBoard();

    el = new Everlive(globals.BS_API_KEY);
    data = el.data('Game');

    this.checkStatus();
  }

  checkStatus(playCallback, endGameCallback) {
    let tempId = this.gameId;
    let that = this;
    let outResult = {};

    data.getById(tempId)
      .then(function (data) {
        var result = data.result;
        var board = result.Board;

        that.set("isPlayerOneTurn", result.IsPlayer1);

        if (that.dbBoard.join('') != board.join('')) {
          that.dbBoard = board;
          that.rebindBoard();
        }

        if (!that.hasSecondPlayer) {
          console.log('No second player yet...');
          if (result.Player2Id) {
            that.set("hasSecondPlayer", true);
            that.set("secondPlayer", result.Player2Name);
            that.set("firstPlayer", result.Player1Name);

            outResult.hasSecondPlayer = true;
          }
        }

        if (!that.canMakeAnyMoves() || that.checkIfGameOver(1) == 1 || that.checkIfGameOver(2) == 2) {
          console.log("Inside end game condition");
          let winningPlayer = that.checkIfGameOver(1) == 1 ? 1 : that.checkIfGameOver(2) == 2 ? 2 : 0;
          let resultToReturn = {};
          let winningText = "Congratulations, you win!";
          let losingText = "Oh bummer, you lost! :(";
          let tieText = "It's a tie! You didn't win... but then again, you didn't lose either!";

          switch (winningPlayer) {
            case 1:
              console.log("Inside player 1 won");
              resultToReturn.message = that.iAmPlayerOne ? winningText : losingText;
              that.p1Won(resultToReturn.message, endGameCallback);

              that.iAmPlayerOne ? winSound.play() : lossSound.play();
              break;
            case 2:
              console.log("Inside player 2 won");
              resultToReturn.message = that.iAmPlayerOne ? losingText : winningText;
              that.p2Won(resultToReturn.message, endGameCallback);

              that.iAmPlayerOne ? lossSound.play() : winSound.play();
              break;
            case 0:
              console.log("Inside no player won - tie");
              that.tie(tieText, endGameCallback);

              lossSound.play();
              break;
          }

          sqliteDb.addGameResult({
            playerOneId: result.Player1Id,
            playerOneUsername: result.Player1Name,
            playerTwoId: result.Player2Id,
            playerTwoUsername: result.Player2Name,
            board: result.Board,
            playedOn: result.CreatedAt
          });

        } else {
          playCallback(outResult);
        }

      }, function (err) {
        alert(JSON.stringify(err));
      });
  }

  p1Won(message, callback) {
    let tempId = this.gameId;
    gamesService.getById(this.gameId)
      .then(function (dbGame) {
        console.dir(dbGame);
        let winnerId = dbGame.Player1Id;
        return Promise.resolve({
          winnerId
        });
      })
      .then(function (data) {
        userService.getCurrentUser()
          .then(function (user) {
            if (user.userId === data.winnerId) {
              userService.updateCurrentUserScore(1);
            }
            else {
              userService.updateCurrentUserScore(2);
            }
          });
      });
    data.updateSingle({ Id: tempId, 'Player1Won': true, 'GameIsOver': true },
      function (res) {
        callback({ message: message });
      }, function (err) {
        alert(JSON.stringify(err));
        console.log(err);
      });
  }

  p2Won(message, callback) {
    let tempId = this.gameId;
    gamesService.getById(this.gameId)
      .then(function (dbGame) {
        console.dir(dbGame);
        let winnerId = dbGame.Player2Id;
        return Promise.resolve({
          winnerId
        });
      })
      .then(function (data) {
        userService.getCurrentUser()
          .then(function (user) {
            if (user.userId === data.winnerId) {
              userService.updateCurrentUserScore(1);
            }
            else {
              userService.updateCurrentUserScore(2);
            }
          });
      });
    data.updateSingle({ Id: tempId, 'Player2Won': true, 'GameIsOver': true },
      function (res) {
        callback({ message: message });
      }, function (err) {
        alert(JSON.stringify(err));
        console.log(err);
      });
  }

  tie(message, callback) {
    let tempId = this.gameId;
    data.updateSingle({ Id: tempId, 'GameIsOver': true },
      function (res) {
        callback({ message: message });
      }, function (err) {
        alert(JSON.stringify(err));
        console.log(err);
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
    let result = {};

    if (this.dbBoard[pos] > 0) {
      return {
        success: false,
        message: 'You cannot make this move!'
      };
    }

    if (!this.hasSecondPlayer) {
      return {
        success: false,
        message: 'Wait for a player to join!'
      };
    }

    if ((!this.iAmPlayerOne && this.isPlayerOneTurn) || (this.iAmPlayerOne && !this.isPlayerOneTurn)) {
      return {
        success: false,
        message: "It's not your turn!"
      };
    }

    this.dbBoard[pos] = markToPlace;
    bopSound.play();
    //winSound.play();

    let tempId = this.gameId;
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

        callback(result);
      });
  }

  checkIfGameOver(player) {
    if ((this.dbBoard[0] == player && this.dbBoard[1] == player && this.dbBoard[2] == player) ||
      (this.dbBoard[0] == player && this.dbBoard[4] == player && this.dbBoard[8] == player) ||
      (this.dbBoard[0] == player && this.dbBoard[3] == player && this.dbBoard[6] == player) ||
      (this.dbBoard[6] == player && this.dbBoard[7] == player && this.dbBoard[8] == player) ||
      (this.dbBoard[6] == player && this.dbBoard[4] == player && this.dbBoard[2] == player) ||
      (this.dbBoard[2] == player && this.dbBoard[5] == player && this.dbBoard[8] == player) ||
      (this.dbBoard[1] == player && this.dbBoard[4] == player && this.dbBoard[7] == player) ||
      (this.dbBoard[3] == player && this.dbBoard[4] == player && this.dbBoard[5] == player)) {
      return player;
    } else {
      return 0;
    }
  }

  canMakeAnyMoves() {
    for (let i = 0; i < this.dbBoard.length; i++) {
      if (this.dbBoard[i] === 0) {
        return true;
      }
    }

    return false;
  }
}

module.exports = {
  gameViewModel: new GameViewModel()
};
