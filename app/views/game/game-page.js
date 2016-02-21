'use strict';

let viewModel = require('./game-view-model').gameViewModel;
let Label = require('ui/label').Label;

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = viewModel;
    
    setInterval(countDown, 2000);
}

function pageNavigatedTo(args) {
    
}

function disableBoard() {

}

function removeCellEvent(args) {
    args.view.off('tap');
}

function handleResult(result, view) {
    if (result && result.success) {
            removeCellEvent(view);
        } else if (result && result.message) {
            alert(result.message);
        } else {
            console.log("FATAL ERROR ");
        }
}

function tapCell0(viewArgs) {
    viewModel.placeMark(0, function(result) {
        handleResult(result, viewArgs);
    });
}

function tapCell1(viewArgs) {
    viewModel.placeMark(1, function(result) {
        handleResult(result, viewArgs);
    });
}

function tapCell2(viewArgs) {
    viewModel.placeMark(2, function(result) {
        handleResult(result, viewArgs);
    });
}

function tapCell3(viewArgs) {
    viewModel.placeMark(3, function(result) {
        handleResult(result, viewArgs);
    });
}

function tapCell4(viewArgs) {
    viewModel.placeMark(4, function(result) {
        handleResult(result, viewArgs);
    });;

}

function tapCell5(viewArgs) {
    viewModel.placeMark(5, function(result) {
        handleResult(result, viewArgs);
    });
}

function tapCell6(viewArgs) {
    viewModel.placeMark(6, function(result) {
        handleResult(result, viewArgs);
    });
}

function tapCell7(viewArgs) {
    viewModel.placeMark(7, function(result) {
        handleResult(result, viewArgs);
    });
}

function tapCell8(viewArgs) {
    viewModel.placeMark(8, function(result) {
        handleResult(result, viewArgs);
    });
}

function countDown() {
    viewModel.checkStatus();
    console.log("Ping");
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