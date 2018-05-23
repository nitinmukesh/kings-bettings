myApp.controller('ProfitlossCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/profit-loss/profit-loss.html");
    TemplateService.title = "Profit Loss"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

});