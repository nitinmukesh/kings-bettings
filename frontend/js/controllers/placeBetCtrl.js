myApp.controller('PlaceBetCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/place-bet.html");
    TemplateService.title = "Place Bet"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

});