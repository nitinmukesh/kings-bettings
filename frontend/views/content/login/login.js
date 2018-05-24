myApp.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService.getHTML("content/login/login.html");
    TemplateService.title = "Login"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    TemplateService.header = "";
    TemplateService.rightsidemenu = "";
    TemplateService.sidemenu = "";
    $scope.navigation = NavigationService.getNavigation();

    $scope.userLogin = function (value) {
        NavigationService.apiCallWithData("user/userLogin", value, function (data) {
            console.log("data", data);
            if (data.value) {
                $.jStorage.set("accessToken", data.data);
                $state.go('home');
            } else {
                alert("unable to login");
            }
        });
    };
});