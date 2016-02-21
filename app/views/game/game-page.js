'use strict';
let viewModel = require('./game-view-model').gameViewModel;

function pageLoaded(args) {
  let page = args.object;
  page.bindingContext = viewModel;
}

function pageNavigatedTo(args) {
}

function disableBoard() {
    
}

function removeCellEvent() {
    
}

function tapCell0() {
    let result = viewModel.placeMark(0);
    // get result
    // if move was valid ->
        // won?
            // dialog -> redirect to home (without back functionality)
        // switch active player's turn
            // if not current player's turn -> disableBoard?
        // start ticking down timer
        // redrawBoard
        // remove event listener of this element
            viewModel.checkStatus();
}

function tapCell1() {
    let result = viewModel.placeMark(1);
}

function tapCell2() {
    let result = viewModel.placeMark(2);
}

function tapCell3() {
    let result = viewModel.placeMark(3);
}

function tapCell4() {
    let result = viewModel.placeMark(4);
}

function tapCell5() {
    let result = viewModel.placeMark(5);
}

function tapCell6() {
    let result = viewModel.placeMark(6);
}

function tapCell7() {
    let result = viewModel.placeMark(7);
}

function tapCell8() {
    let result = viewModel.placeMark(8);
}

module.exports = {
  pageLoaded,
  pageNavigatedTo,
  tapCell0,
  tapCell1,
  tapCell2,
  tapCell3,
  tapCell4,
  tapCell5,
  tapCell6,
  tapCell7,
  tapCell8
};