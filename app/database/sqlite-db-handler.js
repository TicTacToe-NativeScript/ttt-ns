'use strict';
let SQLite = require('nativescript-sqlite');
let globals = require('../common/globals');
let creaetTableGameResultsQuery = 'CREATE TABLE `GameResults` (`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `playerOneId`	TEXT, `playerOneUsername`	TEXT, `playerTwoId`	TEXT, `playerTwoUsername`	TEXT, `board`	TEXT, `playedOn`	TEXT);';

class SQLiteDbHandler {
  constructor() {
  }

  createDatabase() {
    let databaseExists = SQLite.exists(globals.DATABASE_NAME);
    if (!databaseExists) {
      let promise = new SQLite(globals.DATABASE_NAME);

      promise.then(function (db) {
        return db.execSQL(creaetTableGameResultsQuery);
      })
        .then(function () {
          console.log('-------Database created.');
        }, function (err) {
          console.log('-------Error while creating database.');
          console.dir(err);
        });
    }
  }

  addGameResult(gameResult) {
    console.dir(gameResult);

    let promise = new Promise(function (resolve, reject) {
      let dbPromise = new SQLite(globals.DATABASE_NAME);

      dbPromise.then(function (db) {
        return db.execSQL(
          `insert into GameResults (playerOneId, playerOneUsername, playerTwoId, playerTwoUsername, board, playedOn) values (?, ?, ?, ?, ?, ?)`,
          [gameResult.playerOneId, gameResult.playerOneUsername, gameResult.playerTwoId, gameResult.playerTwoUsername, JSON.stringify(gameResult.board), gameResult.playedOn.toString()]);
      })
        .then(function (id) {
          resolve({
            id
          });
        }, function (err) {
          console.log('-------Error while inserting game result in the database.');
          console.dir(err);
          reject(err);
        });
    });

    return promise;
  }

  getGameResultsForUser(userId) {
    let promise = new Promise(function (resolve, reject) {
      let dbPromise = new SQLite(globals.DATABASE_NAME);

      dbPromise
        .then(function (db) {
          db.resultType(SQLite.RESULTSASOBJECT);
          return db.all('select * from GameResults where playerOneId = ? or playerTwoId = ?', [userId, userId]);
        }, reject)
        .then(function (result) {
          let gameResults = [];
          result.forEach(r => {
            let mappedResult = r;
            mappedResult.playedOn = new Date(r.playedOn);
            mappedResult.board = JSON.parse(r.board);
            gameResults.push(mappedResult);
          });
          
          resolve(gameResults);
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  SQLiteDbHandler: SQLiteDbHandler,
  defaultInstance: new SQLiteDbHandler()
};