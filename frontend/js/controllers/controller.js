myApp.controller('LinksCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
        $scope.template = TemplateService.getHTML("content/links.html");
        TemplateService.title = "Links"; // This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $scope.oneAtATime = true;
    })

    // Example API Controller
    .controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
        $scope.oneAtATime = true;
        apiService.getDemo($scope.formData, function (data) {
            console.log(data);

        });
    })

    .controller('MatchRateCtrl', function ($scope, TemplateService, BetService, $rootScope, NavigationService) {
        $scope.cards = {
            threeRunner: false,
            twoRunnerCache: false,
            twoRunner: false,
            suspend: false
        };

        if (!$scope.match.numWinner) {
            console.log("is undefined");
            $scope.cards.suspend = true;
        } else if ($scope.match.numWinner == 1) {
            $scope.cards.threeRunner = true;
        }

        $scope.addBetSlip = function (selectedMatch, bet, betType) {
            bet.name = $scope.match.name;
            var betSlip = {
                name: selectedMatch.name,
                betType: betType,
                bet: bet
            };
            BetService.setBet(betSlip);
        };
    });


myApp.controller('RedirectToCtrl', function ($scope, $stateParams, TemplateService, $state, $uibModal, $location) {
    var id = $stateParams.id;
    if (id) {
        $.jStorage.set("accessTokenId", id);
        $state.go('home');
    }
});

myApp.controller('sideMenuCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location, $timeout, $window, $rootScope) {
    $scope.template = TemplateService;

    $scope.home = true;
    $scope.next = false;
    // $scope.visitedCategories = [];
    $scope.previousState = [];
    $scope.getCompetitionFromBetfair = function (url, data) {
        NavigationService.apiCallWithData(url, data, function (data) {
            // console.log(data);
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.gameData = data.data;
                    $rootScope.getEventList($scope.gameData, $scope.game);
                    if ($scope.fromGame) {
                        $scope.home = true;
                        $scope.next = false;
                        $scope.fromGame = false;
                    } else {
                        $scope.home = false;
                        $scope.next = true;
                    }

                } else {
                    $scope.gameData = [];
                }
            } else {
                alert("Unable get games");
            }
        });
    };

    $scope.getGame = function () {
        $scope.game = "Cricket";
        $scope.getCompetitionFromBetfair('betfair/getCompetitionFromBetfair', {
            eventTypeId: 4,
            name: $scope.game
        });
        $scope.fromGame = true;
        NavigationService.apiCallWithData("BetFair/getGame", {}, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.eventTypes = data.data[0].result;
                    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",$scope.eventTypes);
                    $scope.home = true;
                } else {
                    $scope.eventTypes = [];
                }
            } else {
                alert("Unable get games");
            }
        });
    };
    $scope.getGame();
    //To get games


    $scope.getCompetitions = function (id, name) {
        $scope.game = name;
        $scope.getCompetitionFromBetfair('betfair/getCompetitionFromBetfair', {
            eventTypeId: id,
            name: name
        });
    };




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
        // $state.reload();
    };

    $scope.getGameName = function (value) {
        $scope.game = value;
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

myApp.controller('availableCreditCtrl', function ($scope, TemplateService, NavigationService, $rootScope, $interval) {
    $scope.template = TemplateService;
    $rootScope.getAccountFunds = function (data) {
        NavigationService.getAccountFunds(data, function (data) {
            $scope.accountFunds = data.data[0].result;
            // console.log("getAccountFunds", $scope.accountFunds);
        });
    };
    $rootScope.getAccountFunds();
    $interval(function () {
        $rootScope.getAccountFunds();
    }, 240000);

});