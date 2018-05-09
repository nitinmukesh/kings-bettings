myApp.controller('GreyhoundracingCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/greyhound-racing/greyhound-racing.html");
    TemplateService.title = "Greyhound Racing"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.oneAtATime1 = true;
});