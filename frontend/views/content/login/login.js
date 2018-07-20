myApp.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService.getHTML("content/login/login.html");
    TemplateService.title = "Login"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    TemplateService.header = "";
    TemplateService.rightsidemenu = "";
    TemplateService.sidemenu = "";
    $scope.navigation = NavigationService.getNavigation();

    $scope.userLogin = function (value) {
        console.log(value)
        NavigationService.userLogin("BetFair/userLogin", value, function (data) {
            console.log("data", (data.data));
            if (data.value && !_.isEmpty(data.data)) {
                // $.jStorage.set("accessToken", data.data.accessToken);
                $.jStorage.set("accessToken", "abc1");
                $.jStorage.set("userId", data.data.userId);
                $state.go('home');
            } else {
                alert("unable to login");
            }
        });
        // // $.jStorage.set("accessToken", "abc1");
        // // $.jStorage.set("userId", "5ac34940f18b0e72339c5adc");
        // $state.go('home');
    };
});