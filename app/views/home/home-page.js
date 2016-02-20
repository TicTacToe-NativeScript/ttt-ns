var viewModel = require("./home-view-model").homeViewModel;

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

module.exports = {
  pageLoaded,
  btnJoinGameTapped,
  btnCreateGameTapped,
};
