myApp.controller('ThankyouCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/thankyou/thankyou.html");
    TemplateService.title = "Thank you"; //This is the Title of the Website
});