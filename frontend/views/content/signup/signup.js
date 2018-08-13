myApp.controller('SignupCtrl', function ($scope, toastr, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService.getHTML("content/signup/signup.html");
    TemplateService.title = "Signup"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    TemplateService.header = "";
    TemplateService.rightsidemenu = "";
    TemplateService.sidemenu = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.loginAdminurl = adminurl;

    $scope.userSignup = function (value) {
        console.log("save///////////", value);

        NavigationService.userSignup("User/Save", value, function (data) {
            console.log("data", (data.data));
            if (data.value) {
                // $.jStorage.set("accessToken", "abc1");
                $.jStorage.set("userId", data.data._id);
                toastr.success("Registration successfully!");
                $state.go("subcription");
            } else {
                toastr.error("Registration failed");
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