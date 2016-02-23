'use strict';
let nativescriptEffects = require('nativescript-effects');
let BrowserViewModel = require('./browser-view-model').BrowserViewModel;
let applicationSettings = require('application-settings');
let viewModel;

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = new BrowserViewModel();
}

function pageNavigatedTo(args) {
    viewModel = new BrowserViewModel();
}

function onItemLoading(args) {
    let item = args.object;
    // item.opacity = 0;
    // item.floatIn(700, 'right');
}


module.exports = {
    pageLoaded,
    onItemLoading,
    pageNavigatedTo
};