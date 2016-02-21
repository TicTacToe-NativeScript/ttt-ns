'use strict';

let viewModel = require('./profile-view-model').profileViewModel;
let GridLayout = require('ui/layouts/grid-layout').GridLayout;
let ItemSpec = require('ui/layouts/grid-layout').ItemSpec;
let GridUnitType = require('ui/layouts/grid-layout').GridUnitType;
let Label = require('ui/label').Label;
let Image = require('ui/image').Image;
let gestures = require("ui/gestures");
let Color = require('color').Color;
let moment = require('moment');
let animations = require('nativescript-effects');

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = viewModel;

  viewModel.loadGameResults()
    .then(function () {
      displayGameResult(page, 0, 'left');
    }, function (err) {
      console.dir(err);
    });
}

function displayGameResult(page, index, direction) {
  viewModel.currentGameResultIndex = index;
  let container = page.getViewById('slResultContainer');
  container.removeChildren();
  container.on(gestures.GestureTypes.swipe, function (args) {
    let direction = args.direction;
    if (direction === 1) {
      viewModel.currentGameResultIndex -= 1;
      displayGameResult(page, viewModel.currentGameResultIndex || 0, 'right');
    }
    else {
      viewModel.currentGameResultIndex += 1;
      displayGameResult(page, viewModel.currentGameResultIndex || 0, 'left');
    }
  });

  let grid = new GridLayout();
  let currentGameResult = viewModel.gameResults.getItem(index);

  let row = 0;
  for (let i = 0; i < currentGameResult.board.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      row++;
    }

    let item = currentGameResult.board[i];

    let image = new Image();

    if (item === 1) {
      image.src = '~/resources/images/circle-big.png';
    }
    else {
      image.src = '~/resources/images/x-mark-big.png';
    }

    GridLayout.setRow(image, row);
    GridLayout.setColumn(image, (i + 3) % 3);
    grid.addChild(image);
  }

  for (let i = 0; i < 3; i++) {
    grid.addRow(new ItemSpec(70, GridUnitType.pixel));
    grid.addColumn(new ItemSpec(70, GridUnitType.pixel));
  }

  let labelDescription = new Label();

  labelDescription.text = `${currentGameResult.playerOneUsername} vs ${currentGameResult.playerTwoUsername} - ${moment(currentGameResult.playedOn).format('YYYY-MM-DD hh:mm') }`;
  labelDescription.textWrap = true;

  container.addChild(labelDescription);

  container.addChild(grid);
  grid.opacity = 0;
  grid.floatIn(1000, direction);
}

module.exports = {
  pageLoaded
};
