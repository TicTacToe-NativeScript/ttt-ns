'use strict';
var viewModel = require("./signup-view-model").signupViewModel;
var frame = require("ui/frame");
var dialogs = require("ui/dialogs");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = viewModel;
}

function btnSignUpTapped(args) {
    // TODO: vM Register logic -> Login -> navigate to Home
    viewModel.signUp().then(function (data) {
        frame.topmost().navigate("./views/main/main-page");
        dialogs.alert({
            title: "SUCCESS!!!",
            message: "Registered successfully! You may now play the ultimate TTT game!",
            okButtonText: "Yaay!"
        });
    },
        function (error) {
            console.log("Error registering");
            alert(error);
        });
}

module.exports = {
    pageLoaded,
    btnSignUpTapped
};