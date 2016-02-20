var application = require("application");

/*
 * Globals and constants
*/

global.BS_API_KEY = "46mdgkw9d134t4ao";
global.BS_URL = "";
global.TOKEN_DATA_KEY = "authenticationToken";
global.EVERLIVE = require('~/lib/everlive.all.min.js');

/*
 * Application setup
*/

application.mainModule = "./views/main/main-page";
application.cssFile = "./styles/app.css";

application.start();
