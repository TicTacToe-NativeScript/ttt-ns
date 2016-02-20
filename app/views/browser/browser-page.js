'use strict';
let nativescriptEffects = require('nativescript-effects');
let viewModel = require('./browser-view-model').browserViewModel;
let applicationSettings = require('application-settings');

function pageLoaded(args) {
  let page = args.object;
  page.bindingContext = viewModel;
}

function onItemLoading(args) {
  let item = args.object;
  // item.opacity = 0;
  // item.floatIn(700, 'right');
}


module.exports = {
  pageLoaded,
  onItemLoading
};