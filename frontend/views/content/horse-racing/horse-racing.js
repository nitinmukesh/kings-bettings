myApp.controller('HorseracingCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/horse-racing/horse-racing.html");
    TemplateService.title = "Horse Racing"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.oneAtATime1 = true;
});