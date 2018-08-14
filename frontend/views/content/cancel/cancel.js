myApp.controller('CancelCtrl', function ($scope, TemplateService, NavigationService, $rootScope, $interval, $state, jStorageService) {
    $scope.template = TemplateService.getHTML("content/cancel/cancel.html");
    TemplateService.title = "Cancel"; //This is the Title of the Website

});