'use strict';
let viewModel = require('./game-page').gameViewModel;

function pageLoaded(args) {
  let page = args.object;
  page.bindingContext = viewModel;
}

function pageNavigatedTo(args) {
  console.dir(args.context);
}

module.exports = {
  pageLoaded,
  pageNavigatedTo
};