myApp.controller('LoginCtrl', function ($scope, toastr, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService.getHTML("content/login/login.html");
    TemplateService.title = "Login"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    TemplateService.header = "";
    TemplateService.rightsidemenu = "";
    TemplateService.sidemenu = "";
    $scope.navigation = NavigationService.getNavigation();

    $scope.userLogin = function (value) {
        console.log(value)
        // NavigationService.userLogin("BetFair/userLogin", value, function (data) {
        //     console.log("data", (data.data));
        //     if (data.value && !_.isEmpty(data.data)) {
        //         $.jStorage.set("accessToken", data.data.accessToken);
        //         // $.jStorage.set("accessToken", "abc1");
        //         $.jStorage.set("userId", data.data.userId);
        //         toastr.success("Logged in successfully!");
        //         $state.go('home');
        //     } else {
        //         toastr.error("Unable to login");
        //     }
        // });
        // $.jStorage.set("accessToken", "abc1");
        // $.jStorage.set("userId", "5ac34a2af18b0e72339c5adf");
        // toastr.success("Logged in successfully!");
        // $state.go('home');
    };
});