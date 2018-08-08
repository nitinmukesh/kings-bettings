myApp.controller('LoginCtrl', function ($scope, toastr, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService.getHTML("content/login/login.html");
    TemplateService.title = "Login"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    TemplateService.header = "";
    TemplateService.rightsidemenu = "";
    TemplateService.sidemenu = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.loginAdminurl = adminurl;

    $scope.userLogin = function (value) {
        // $state.go('home');
       
        NavigationService.userSignup("User/findUser", value, function (data) {
            console.log("data", (data.data));
            if (data.data.email == value.email && data.data.password == value.password) {
                var win = window.open("https://identitysso.betfair.com/view/vendor-login?client_id=61755&response_type=code&redirect_uri=api/user/betfairLoginRedirect",'_self');
            } else {
                toastr.error("Invalid Creditionals");
            }
        });
        // $.jStorage.set("accessToken", "abc1");
        // $.jStorage.set("userId", "5ac34a2af18b0e72339c5adf");
        // toastr.success("Logged in successfully!");
        // $state.go('home');
    };

    $scope.accessToken = $.jStorage.get("accessToken");
    console.log($scope.accessToken);
    if ($scope.accessToken) {
        $state.go("home");
    };
});