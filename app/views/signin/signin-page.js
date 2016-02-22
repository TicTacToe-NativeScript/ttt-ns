'use strict';
let viewModel = require('./signin-view-model').signinViewModel;
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');

function pageLoaded(args) {
  let page = args.object;
  page.bindingContext = viewModel;
}

function btnLoginTap(args) {
  viewModel.login()
    .then(function () {
      dialogs.alert({
        title: 'Success!',
        message: 'Login successfull!',
        okButtonText: 'Ok'
      }).then(function () {
        frame.topmost()
          .navigate({
            moduleName: './views/home/home-page',
            clearHistory: true
          });
      });
    }, function (err) {
      dialogs.alert({
        title: 'Error',
        message: err.message
      });
    });
}

module.exports = {
  pageLoaded,
  btnLoginTap
};