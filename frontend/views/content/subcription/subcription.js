myApp.controller('SubcriptionCtrl', function ($scope, toastr, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService.getHTML("content/subcription/subcription.html");
    TemplateService.title = "subcription"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    TemplateService.header = "";
    TemplateService.rightsidemenu = "";
    TemplateService.sidemenu = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.loginAdminurl = adminurl;
    $scope.isfreeSubcription = $.jStorage.get("isfreeSubcription");
    var user = $.jStorage.get("userId");

    $scope.accessToken = $.jStorage.get("accessToken");
    console.log($scope.accessToken);
    if ($scope.accessToken) {
        $state.go("home");
    };
    $scope.payNow = function () {
        NavigationService.payNow("betfair/payNow", {
            id: user
        }, function (data) {
            console.log("data new", (data.data));
            window.location.href = data.data;
        });
    };

    $scope.goTologin = function () {
        NavigationService.updateUser("User/updateUser", {
            id: user
        }, function (data) {
            console.log("data new", (data.data));
            if (data.value) {
                window.location.href = data.data;
            } else {
                toastr.error(data.error.message);
            }
        });
    }
});