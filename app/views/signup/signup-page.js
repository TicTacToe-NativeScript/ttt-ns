'use strict';
var viewModel = require("./signup-view-model").signupViewModel;
var frame = require("ui/frame");
let appSettings = require("application-settings");
let globals = require("../../common/globals");

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = viewModel;
}

function btnSignUpTapped(args) {
  // TODO: vM Register logic -> Login -> navigate to Home
  viewModel.signUp().then(function (data) {
    appSettings.setString(globals.TOKEN_DATA_KEY, data.result.access_token);
    appSettings.setString(globals.USER_ID, data.result.principal_id);
    frame.topmost().navigate("./views/main/main-page");
  },
    function (error) {
      console.log("Error registering");
      alert(error);
    });
}

function btnSignInTapped(args) {
  viewModel.navigateToSignIn(args);
}

module.exports = {
  pageLoaded,
  btnSignUpTapped,
  btnSignInTapped
};