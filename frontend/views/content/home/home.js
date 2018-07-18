myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, toastr, $http, uibDateParser, jStorageService, $location, $state, $stateParams, $rootScope) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.sidemenu2 = "";
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.oneAtATime = true;
    $scope.matches = [];

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $scope.itemArray = [{
            id: 1,
            name: 'first'
        },
        {
            id: 2,
            name: 'second'
        },
        {
            id: 3,
            name: 'third'
        },
        {
            id: 4,
            name: 'fourth'
        },
        {
            id: 5,
            name: 'fifth'
        },
    ];

    $scope.selected = {
        value: $scope.itemArray[0]
    };


    $scope.getGamePage = function (value) {
        switch (value) {
            case "Cricket":
                $scope.page = "views/content/cricket/cricket.html";
                break;
            case "Tennis":
                $scope.page = "views/content/tennis/tennis.html";
                break;
            case "Soccer":
                $scope.page = "views/content/football/football.html";
                break;

            default:
                console.log("Invalid page selection");
        }
    };


    $scope.selectedGame = $stateParams.game;
    $scope.$on('$locationChangeSuccess', function () {
        // vm.searchText = $state.params.search;
        if ($scope.mySocket1) {
            console.log("disconnect 1");
            $scope.mySocket1.disconnect();
            console.log("disconnect 2");
        }
        $scope.currentGame = ($location.path()).split('/');
        console.log("$scope.selectedGame", $scope.currentGame);
        if ($scope.currentGame[1] == "home") {
            $scope.page = "views/content/cricket/cricket.html";
            $scope.getMarketIds({
                game: "Cricket"
            });
        } else {

            $scope.getGamePage($scope.currentGame[1]);
            $scope.getMarketIds({
                game: $scope.currentGame[1],
                parentId: $scope.currentGame[2]
            });
        }

    });

    function establishSocketConnection() {
        $scope.mySocket1 = io.sails.connect(adminUUU);

        _.each($scope.marketData, function (market) {
            $scope.mySocket1.on("market_" + market.betfairId, function onConnect(data) {
                // console.log("socket data", data);
                _.each(market.runners, function (runner) {
                    _.each(data, function (rate) {
                        // console.log(runner.betfairId, "string", (rate.id).toString());
                        if (runner.betfairId == (rate.id).toString()) {
                            runner.back = rate.batb;
                            runner.lay = rate.batl;
                            _.each(runner.back, function (backRate) {
                                if (backRate[0] == 0) {
                                    runner.singleBackRate = backRate[1];
                                    runner.singleBackSize = backRate[2]
                                }
                            });

                            _.each(runner.lay, function (layRate) {
                                if (layRate[0] == 0) {
                                    runner.singleLayRate = layRate[1];
                                    runner.singleLaySize = layRate[2]
                                }
                            });
                        }
                    });
                });
                var sortedArray = _.sortBy(market.runners, ['sortPriority']);
                market.runners = [];
                _.each(sortedArray, function (n) {
                    market.runners[n.sortPriority - 1] = n;
                });

                // console.log("sortedArray", sortedArray);
                // console.log(market.betfairId + "marketodds", market);
                $scope.$apply();
            });
        })

    };

    $scope.getMarketIds = function (value) {

        NavigationService.apiCallWithData('Category/getMarketIds', value, function (data) {
            // console.log("Category/getMarketIds", data);
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.marketData = data.data;
                    // $scope.marketId = "market_1.144792630";
                    // console.log("$scope.marketData", $scope.marketData);
                    // $scope.setUrl('game', '1');
                    $scope.home = true;
                    establishSocketConnection();
                } else {
                    $scope.marketData = [];
                }
            } else {
                // alert("Unable get markets");
            }
        });
    };

    $scope.getDetailedPage = function (game, event, id) {
        // $scope.getGameDetailPage(game);
        // $scope.eventName = event;
        // $scope.getMarketIds({
        //     game: game,
        //     parentId: id
        // });

        // $scope.$emit('detailedPage', {
        //     game: game,
        //     parentId: id
        // });

        // $state.go($state.current.name, {

        $state.go("detailPage", {
            game: game,
            parentId: id
        });
    };





    // $scope.getMatchOdds = function (data) {
    //     NavigationService.getMatchOddsData('BetFair/getMatchOdds', {}, function (data) {
    //         $scope.matches = data.data;
    //         console.log("home", $scope.matches);
    //     });
    // };
    // setInterval(function(){
    //     $scope.getMatchOdds();
    //   }, 1000)

    // $scope.getMatchByCategory({
    //     'game': "5afebdc3c35ebd4a630532e6"
    // });

    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();

    $scope.placeBet = function (price, type, market, selection) {
        var accessToken = jStorageService.getAccessToken();
        var userId = jStorageService.getUserId();
        $rootScope.$broadcast('eventBroadcastedName', {
            odds: price,
            type: type,
            eventId: market.parentCategory.betfairId,
            event: market.parentCategory.event,
            selectionId: selection.betfairId,
            selectionName: selection.name,
            sport: $scope.currentGame[1],
            marketId: market.betfairId,
            accessToken: accessToken,
            userId: userId
        });
    }

});