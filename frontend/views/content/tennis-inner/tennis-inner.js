myApp.controller('TennisinnerCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/tennis-inner/tennis-inner.html");
    TemplateService.title = "Tennis Inner"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

});