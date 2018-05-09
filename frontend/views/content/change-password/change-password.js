myApp.controller('ChangepasswordCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/change-password/change-password.html");
    TemplateService.title = "Change Password"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

});