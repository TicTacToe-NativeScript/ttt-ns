'use strict';

let Observable = require("data/observable").Observable;
let frame = require("ui/frame");
let appSettings = require("application-settings");
let globals = require("../../common/globals");
let Everlive = require("../../lib/everlive.all.min.js"); 

class SignupViewModel extends Observable {
    constructor() {
        super();

        this.email = "";
        this.password = "";
        this.username = "";
        this.isLoading = false;
    }

    navigateToSignIn(args) {
        frame.topmost()
            .navigate({
                animated: true,
                transition: "flip"
            });
    }

    signUp() {
        console.log("Inside signUp");

        this.isLoading = true;

        let that = this;

        let info = {
            DisplayName: this.username,
            Email: this.email
        }
            
        let el = new Everlive({
                appId: '46mdgkw9d134t4ao',
                scheme: 'https',
            });

        return new Promise(function (resolve, reject) {
            // Todo: validate input
            if (true) {
                el.Users.register(
                    that.email,
                    that.password,
                    info,
                    function (data) {
                        el.Users.login(that.email, that.password,
                            function (data) {
                                appSettings.setString(globals.TOKEN_DATA_KEY, data.result.access_token);
                                appSettings.setString(globals.USER_ID, data.result.principal_id)

                                this.isLoading = false;
                                
                                // TODO: Clear fields
                                console.log("About to resolve... Any moment now!");
                                resolve();
                            },
                            function (error) {
                                reject(error.message || "Can't log in! Please try again!");
                            });
                    },
                    function (error) {
                        this.isLoading = false;
                        reject(error.message || "Can't register");
                    });
            } else {
                reject("Invalid input");
            }
        });
    }
}

module.exports = {
    signupViewModel: new SignupViewModel()
};