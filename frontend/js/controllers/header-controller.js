myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location, $timeout, $window, $rootScope) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });

    // if (!$.jStorage.get("accessToken")) {
    //     $state.go('login');
    // }

    //To handle the reload functionality.
    window.onbeforeunload = function () {
        $.jStorage.flush();
    };

    $scope.next = true;

    // $scope.visitedCategories = [];
    $scope.previousState = [];


    $scope.getAccountFunds = function (data) {
        NavigationService.getAccountFunds(data, function (data) {
            $scope.accountFunds = data.data.result;
            // console.log("getAccountFunds", $scope.accountFunds);
        });
    };
    $scope.getAccountFunds();

    //To get games
    $scope.getCompetitionFromBetfair = function (url, data) {
        NavigationService.apiCallWithData(url, data, function (data) {
            // console.log(data);
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.gameData = data.data;
                    console.log("$scope.gameData >>>>>>>>>>>>", $scope.gameData);
                    $rootScope.getEventList($scope.gameData);
                    $scope.home = true;
                } else {
                    $scope.gameData = [];
                }
            } else {
                alert("Unable get games");
            }
        });
    };
    $scope.getCompetitionFromBetfair('betfair/getCompetitionFromBetfair', {});

    //     });
    // };

    // //To get sub Category
    $scope.getSubCategory = function (value, value2) {
        $scope.getCompetitionFromBetfair('betfair/getEventsFromBetFair', {
            ids: [value],
            type: value2
        });
    };

    $scope.getCompetition = function () {
        $state.go("home");
        $state.reload();
    };

    $scope.getGameName = function (value) {
        $scope.game = value;
    };

    $scope.getParentId = function (value) {
        $scope.previousParentId = $scope.parentId;
        $scope.parentId = value;
    }


    $scope.getPreviousCategory = function () {

        if (!_.isEmpty($scope.previousState)) {
            if (!$scope.next) {
                $scope.next = true;
                $scope.previous = false;
            } else {
                $scope.next = false;
                $scope.previous = true;
            }
            $scope.subcategory = $scope.previousState[$scope.previousState.length - 1];
            $scope.parentId = $scope.previousParentId;
            $scope.previousState.pop();
            $state.go('homeInside', {
                game: $scope.game,
                parentId: $scope.parentId
            }, {
                notify: false
            });
            // $scope.getMatchOdds({
            //     game: $scope.game,
            //     parentId: $scope.parentId
            // });
        } else {
            $scope.subcategory = [];
            $scope.previousState = [];
            $scope.home = true;
            $scope.next = false;
            $scope.previous = false;
            $state.go('home', {
                notify: false
            });
            // $scope.getMatchOdds({
            //     game: "Cricket"
            // });
        }

    };

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

});