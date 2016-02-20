var viewModel = require("./signup-view-model").signupViewModel;
var frame = require("ui/frame");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = viewModel;
}

function btnSignUpTapped(args) {
    // TODO: vM Register logic -> Login -> navigate to Home
    console.log("Before signup")
    viewModel.signUp().then(function(){
        console.log("Succesful signup");
        frame.topmost().navigate("../main/main-page");
    },
    function(error) {
        console.log("Error registering");
        alert(error);
    });
}

function btnSignInTapped(args) {
    viewModel.navigateToSignIn(args);
}

module.exports = {
    pageLoaded,
    btnSignUpTapped,
    btnSignInTapped
};