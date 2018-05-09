myApp.controller('TransferstatementCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/transfer-statement/transfer-statement.html");
    TemplateService.title = "Transfer Statement"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

});