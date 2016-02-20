var viewModel = require("./main-view-model").mainViewModel;

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = viewModel;
}

function btnSignUpTapped(args) {
  viewModel.navigateToSignUp(args);
}

function btnSignInTapped(args) {
    viewModel.navigateToSignIn(args);
}

module.exports = {
  pageLoaded,
  btnSignUpTapped,
  btnSignInTapped
};
