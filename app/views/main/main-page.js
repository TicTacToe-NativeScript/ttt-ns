var viewModel = require("./main-view-model").mainViewModel;
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = viewModel;
}

function btnCreateGameTapped(args) {
  viewModel.navigateToCreateGame(args);
}

function btnJoinGameTapped(args) {
  viewModel.navigateToJoinGame(args);
}

function btnSignUpTapped(args) {
  viewModel.navigateToSignUp(args);
}

module.exports = {
  pageLoaded,
  btnJoinGameTapped,
  btnCreateGameTapped,
  btnSignUpTapped
};
