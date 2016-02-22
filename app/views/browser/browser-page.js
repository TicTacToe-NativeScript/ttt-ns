'use strict';
let nativescriptEffects = require('nativescript-effects');
let BrowserViewModel = require('./browser-view-model').BrowserViewModel;
let applicationSettings = require('application-settings');
let viewModel;

function pageLoaded(args) {
    let page = args.object;
    if (viewModel == null) {
        viewModel = new BrowserViewModel();
    }

    page.bindingContext = viewModel;
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