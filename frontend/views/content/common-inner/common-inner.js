myApp.controller('CommonInnerCtrl', function ($scope, TemplateService, NavigationService, $stateParams) {
    $scope.template = TemplateService.getHTML("content/common-inner/common-inner.html");
    TemplateService.title = "Common Inner"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.pagePath = "views/content/" + $stateParams.game + "-inner/" + $stateParams.game + "-inner.html";
    console.log(" $scope.pagePath $scope.pagePath $scope.pagePath", $scope.pagePath);

});