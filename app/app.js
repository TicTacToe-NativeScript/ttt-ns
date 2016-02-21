var application = require("application");
var sqliteDbHandler = require('./database/sqlite-db-handler').defaultInstance;

application.on(application.launchEvent, function (args) {
    sqliteDbHandler.createDatabase();
});

application.mainModule = "./views/start/start-page";
application.cssFile = "./styles/app.css";

application.start();
