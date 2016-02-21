var viewModel = require("./home-view-model").homeViewModel;

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = viewModel;
}

function btnJoinGameTapped(args) {
  viewModel.navigateToJoinGame(args);
}

function btnCreateGameTapped(args) {
  viewModel.navigateToCreateGame(args);
}

function btnProfileTapped(args) {
  viewModel.navigateToProfile(args);
}

function btnLogoutTapped(args) {
  viewModel.logout(args);
}

module.exports = {
  pageLoaded,
  btnJoinGameTapped,
  btnCreateGameTapped,
  btnLogoutTapped,
  btnProfileTapped
};
