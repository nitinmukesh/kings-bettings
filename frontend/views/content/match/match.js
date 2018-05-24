myApp.controller('MatchCtrl', function ($scope, TemplateService, NavigationService, $stateParams) {
    $scope.template = TemplateService.getHTML("content/match/match.html");
    TemplateService.title = $stateParams.game; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

    $scope.params = $stateParams;
});







































