'use strict';
let HighscoreViewModel = require('./highscore-view-model').HighscoreViewModel;
let dialogs = require('ui/dialogs');
let frame = require('ui/frame');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  page.bindingContext = new HighscoreViewModel();
}

function pageNavigatedTo(args) {
  viewModel = new HighscoreViewModel();
}

module.exports = {
  pageLoaded,
  pageNavigatedTo
};