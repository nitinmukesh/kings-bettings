myApp.controller('MybetCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/mybet/mybet.html");
    TemplateService.title = "My Bet"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();



    $scope.getAccountStatement = function (data) {
        NavigationService.getAccountStatement(data, function (data) {
            $scope.accountStatement = data.data.result.accountStatement ;
            console.log("$scope.accountStatement", $scope.accountStatement);
        });
    };
    $scope.getAccountStatement();

});