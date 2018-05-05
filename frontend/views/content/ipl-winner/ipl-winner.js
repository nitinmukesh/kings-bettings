myApp.controller('IplWinnerCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/ipl-winner/ipl-winner.html");
    TemplateService.title = "Ipl Winner"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

});