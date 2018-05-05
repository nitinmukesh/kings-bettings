myApp.controller('IplInnerCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/ipl-inner/ipl-inner.html");
    TemplateService.title = "Ipl Inner"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

});