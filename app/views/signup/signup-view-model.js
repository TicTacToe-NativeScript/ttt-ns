'use strict';

let Observable = require("data/observable").Observable;
let frame = require("ui/frame");
let Everlive = require("../../lib/everlive.all.min.js"); 

class SignupViewModel extends Observable {
    constructor() {
        super();

        this.email = "";
        this.password = "";
        this.username = "";
        this.isLoading = false;
    }

    signUp() {
        this.isLoading = true;

        let that = this;

        let info = {
            DisplayName: this.username,
            Email: this.email
        };
            
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
                                that.isLoading = false;
                                // TODO: Clear fields
                                resolve(data);
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