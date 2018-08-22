myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location, $timeout, $window, $rootScope) {
    $scope.template = TemplateService;

    $scope.expDate = $.jStorage.get("expDate");

    $scope.logout = function () {
        $.jStorage.flush();
        $state.go('login');
    }

    $scope.myAccountStatement = function () {
        var win = window.open("https://myaccount.betfair.com/summary/accountstatement", '_blank');
        win.focus();
    };

    $scope.mybet = function () {
        $state.go('mybet');
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