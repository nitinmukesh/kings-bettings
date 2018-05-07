myApp.controller('FootballFixturesCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/football-fixtures/football-fixtures.html");
    TemplateService.title = "Football Fixtures"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

});