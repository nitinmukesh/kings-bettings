myApp.controller('MybetCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/mybet/mybet.html");
    TemplateService.title = "My Bet"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    TemplateService.rightsidemenu = "";
    $scope.navigation = NavigationService.getNavigation();



    $scope.getAccountStatement = function (data) {
        NavigationService.getAccountStatement(data, function (data) {
            console.log("data.data.error",data.data.error);
            console.log("data.data.error",data.data);
            if (data.data.result.accountStatement) {
                $scope.accountStatement = data.data.result.accountStatement;
            } else if (data.data.error) {
                $scope.error = data.data.error;
            } else {
                $scope.error = "No data Found";
            }
        });
    };
    $scope.getAccountStatement();

});