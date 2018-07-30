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