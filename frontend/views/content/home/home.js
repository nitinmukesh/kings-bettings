myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, toastr, $http, uibDateParser, jStorageService, $location, $state, $stateParams, $rootScope, $timeout, $interval) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.sidemenu2 = "";
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.oneAtATime = true;
    $scope.matches = [];
    $scope.isDraw = true;

    $scope.page = "views/content/cricket/cricket.html";

});