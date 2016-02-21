'use strict';

var frame = require("ui/frame");
let appSettings = require("application-settings");
let globals = require("~/common/globals");

function pageLoaded(args) {
    var token = appSettings.getString(globals.TOKEN_DATA_KEY);
    if (!token) {
        frame.topmost().navigate("./views/main/main-page");       
    } else {
        frame.topmost().navigate("./views/home/home-page");    
    }
}

module.exports = {
    pageLoaded
};