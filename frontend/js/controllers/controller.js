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


myApp.controller('BetfairLoginCtrl', function ($scope, $rootScope, $stateParams, TemplateService, BetService, $state, $uibModal, $location, NavigationService, jStorageService, $timeout, $interval) {


    console.log(window.location.href.split("=")[1]);

    NavigationService.apiCallWithData("betfair/getBetfairAccessToken", {
        code: window.location.href.split("=")[1]
    }, function (data) {
        // console.log(data);
        if (data.value) {
            $state.go('home');
        } else {
            $state.go('login');
        }
    });
});
myApp.controller('sideMenuCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location, $timeout, $window, $rootScope) {
    $scope.template = TemplateService;


    $scope.next = true;

    // $scope.visitedCategories = [];
    $scope.previousState = [];

    //To get games
    $scope.getCompetitionFromBetfair = function (url, data) {
        NavigationService.apiCallWithData(url, data, function (data) {
            // console.log(data);
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.gameData = data.data;
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

myApp.controller('availableCreditCtrl', function ($scope, TemplateService, NavigationService, $rootScope) {
    $scope.template = TemplateService;
    $rootScope.getAccountFunds = function (data) {
        NavigationService.getAccountFunds(data, function (data) {
            $scope.accountFunds = data.data.result;
            // console.log("getAccountFunds", $scope.accountFunds);
        });
    };
    $rootScope.getAccountFunds();

});