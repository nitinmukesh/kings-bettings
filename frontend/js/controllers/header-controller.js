myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location, $timeout, $window, $rootScope) {
    $scope.template = TemplateService;


    $scope.logout = function () {
        $.jStorage.flush();
        $state.go('login');
    }

    $scope.mybet = function () {
        var win = window.open("https://myactivity.betfair.com/#/sportsbook", '_blank');
        win.focus();
    }

    $scope.next = true;

    // $scope.visitedCategories = [];
    $scope.previousState = [];

    // //Go to home menu
    $scope.goTohome = function () {
        $scope.subcategory = [];
        $scope.previousState = [];
        $scope.home = true;
        $scope.next = false;
        $scope.previous = false;
        $state.go('home', {
            notify: false
        });
    };

    $scope.accessTokenId = $.jStorage.get("accessTokenId");
    if (!$scope.accessTokenId) {
        console.log("demo");
        $state.go("login");
    };




});