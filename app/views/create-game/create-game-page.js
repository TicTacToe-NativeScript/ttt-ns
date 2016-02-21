'use strict';
let viewModel = require('./create-game-view-model').createGameViewModel;
let dialogs = require('ui/dialogs');
let frame = require('ui/frame');

function pageLoaded(args) {
  let page = args.object;
  page.bindingContext = viewModel;
}

function btnCreateGameTapped(args) {
  viewModel.createGame()
    .then(function (data) {
      dialogs.alert({
        title: 'Game created',
        message: 'The game was created please wait for other player.',
        okButtonText: 'Ok'
      })
        .then(function () {
          frame.topmost()
            .navigate({
              moduleName: './views/game/game-page',
              context: data
            });
        });
    }, function (err) {
      console.log('------Error create game page cb.');
      console.dir(err);
    });
}

module.exports = {
  pageLoaded,
  btnCreateGameTapped
};