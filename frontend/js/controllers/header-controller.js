myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location, $timeout, $window, $rootScope) {
    $scope.template = TemplateService;


    $scope.logout = function () {
        $.jStorage.flush();
        $state.go('login');
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

    $scope.accessToken = $.jStorage.get("accessToken");
    // console.log($scope.accessToken);
    // if (!$scope.accessToken) {
    //     console.log("demo");
    //     $state.go("login");
    // };
});