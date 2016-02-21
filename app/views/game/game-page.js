'use strict';
let viewModel = require('./game-view-model').gameViewModel;
let Label = require('ui/label').Label;

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

function tapCell0(args) {
    let result = viewModel.placeMark(0);

    if (result.success) {
        setCell(result, args);
    } else {

    }
    
    // get result
    // if move was valid ->
    // won?
    // dialog -> redirect to home (without back functionality)
    // switch active player's turn
    // if not current player's turn -> disableBoard?
    // start ticking down timer
    // redrawBoard
    // remove event listener of this element
}

function tapCell1(args) {
    let result = viewModel.placeMark(1);

    if (result.success) {
        setCell(result, args);
    } else {

    }
}

function tapCell2(args) {
    let result = viewModel.placeMark(2);

    if (result.success) {
        setCell(result, args);
    } else {

    }
}

function tapCell3(args) {
    let result = viewModel.placeMark(3);

    if (result.success) {
        setCell(result, args);
    } else {

    }
}

function tapCell4(args) {
    let result = viewModel.placeMark(4);

    if (result.success) {
        setCell(result, args);
    } else {
        
    }
}

function tapCell5(args) {
    let result = viewModel.placeMark(5);

    if (result.success) {
        setCell(result, args);
    } else {

    }
}

function tapCell6(args) {
    let result = viewModel.placeMark(6);

    if (result.success) {
        setCell(result, args);
    } else {

    }
}

function tapCell7(args) {
    let result = viewModel.placeMark(7);

    if (result.success) {
        setCell(result, args);
    } else {

    }
}

function tapCell8(args) {
    let result = viewModel.placeMark(8);

    if (result.success) {
        setCell(result, args);
    } else {

    }
}

function setCell(result, viewArgs) {
    let newLabel = new Label();
    newLabel.className = "game-mark";
    newLabel.text = result.mark;
    viewArgs.view.addChild(newLabel);

    viewArgs.view.off("tap");
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