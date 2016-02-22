'use strict';

let viewModel = require('./game-view-model').gameViewModel;
let Label = require('ui/label').Label;
let dialogs = require('ui/dialogs');
let frame = require('ui/frame');
let gamesService = require('../../services/games-service').defaultInstance;
let userService = require('../../services/user-service').defaultInstance;

let interval = null;

function pageLoaded(args) {
    let page = args.object;
    page.bindingContext = viewModel;
}

function pageNavigatedTo(args) {
    var game = args.context;
    viewModel.gameId = game.Id;

    if (game.createdByMe) {
        viewModel.set("iAmPlayerOne", true);
        viewModel.set('firstPlayer', game.Player1Id.DisplayName);
    } else {
        userService.getCurrentUser()
            .then(function (res) {
                gamesService.setPlayer2ToGame(res.userId, res.username, game.Id)
                    .then(function (res) {
                        viewModel.set("iAmPlayerOne", false);
                        viewModel.set('secondPlayer', res.username);
                    }, function (err) {
                        console.log("error in setting 2nd player to game");
                        console.log(err);
                    })
            }, function (err) {
                console.log(err);
                alert(JSON.stringify(err));
            });
    }

    interval = setInterval(ping, 2000);
}

function pageNavigatingFrom(args) {
    console.dir(args);
    console.log("At navigating from");
    clearInterval(interval);
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
    viewModel.placeMark(0, function (result) {
        handleResult(result, viewArgs);
    });
}

function tapCell1(viewArgs) {
    viewModel.placeMark(1, function (result) {
        handleResult(result, viewArgs);
    });
}

function tapCell2(viewArgs) {
    viewModel.placeMark(2, function (result) {
        handleResult(result, viewArgs);
    });
}

function tapCell3(viewArgs) {
    viewModel.placeMark(3, function (result) {
        handleResult(result, viewArgs);
    });
}

function tapCell4(viewArgs) {
    viewModel.placeMark(4, function (result) {
        handleResult(result, viewArgs);
    });;

}

function tapCell5(viewArgs) {
    viewModel.placeMark(5, function (result) {
        handleResult(result, viewArgs);
    });
}

function tapCell6(viewArgs) {
    viewModel.placeMark(6, function (result) {
        handleResult(result, viewArgs);
    });
}

function tapCell7(viewArgs) {
    viewModel.placeMark(7, function (result) {
        handleResult(result, viewArgs);
    });
}

function tapCell8(viewArgs) {
    viewModel.placeMark(8, function (result) {
        handleResult(result, viewArgs);
    });
}

function ping() {
    viewModel.checkStatus(function (result) {
        if (result.hasSecondPlayer) {
            alert("A player joined!");
        }
    }, function (endResult) {
        console.log("At clear interval");
        clearInterval(interval);

        dialogs.alert({
            title: 'Game over!',
            message: endResult.message,
            okButtonText: 'Ok'
        }).then(function () {
            frame.topmost()
                .navigate({
                    moduleName: './views/home/home-page'
                });
        });
    });

    console.log(new Date());
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