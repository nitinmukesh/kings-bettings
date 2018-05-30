myApp.controller('MatchDetailCtrl', function ($scope, TemplateService, $stateParams, NavigationService) {
    $scope.template = TemplateService.getHTML("content/match-detail/match-detail.html");
    TemplateService.title = $stateParams.match + " Inner"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

    $scope.params = $stateParams;


});