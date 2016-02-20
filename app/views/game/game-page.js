'use strict';
let viewModel = require('./game-view-model').gameViewModel;

function pageLoaded(args) {
  let page = args.object;
  page.bindingContext = viewModel;
}

function pageNavigatedTo(args) {
}

module.exports = {
  pageLoaded,
  pageNavigatedTo
};