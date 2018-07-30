myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, toastr, $http, uibDateParser, jStorageService, $location, $state, $stateParams, $rootScope, $timeout, $interval) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.sidemenu2 = "";
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.oneAtATime = true;
    $scope.matches = [];
    $scope.isDraw = true;

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });

    $scope.page = "views/content/cricket/cricket.html";


    $scope.getGamePage = function () {
        // $scope.page = "views/content/cricket/cricket.html";
        // switch (value) {
        //     case "Greyhound Racing":
        //         $scope.page = "views/content/cricket/cricket.html";
        //         break;
        //     case "Horse Racing":
        //         $scope.page = "views/content/tennis/tennis.html";
        //         break;
        //     case "Tennis":
        //         $scope.page = "views/content/cricket/cricket.html";
        //         $scope.isDraw = false;
        //         break;

        //     default:
        //         $scope.page = "views/content/cricket/cricket.html";
        // }
    };


    $scope.odds = function () {
        var obj = {}
        obj.eventId = [];
        _.each($scope.homeData, function (n) {
            obj.eventId.push(n.event.id);
        });

        NavigationService.apiCallWithData('betfair/getMarketsFromBetFair', obj, function (data) {
            // console.log(data);
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.marketData = data.data;

                    _.each($scope.marketData, function (market) {
                        market = _.sortBy(market.runners, ['sortPriority']);
                    })
                    console.log("$scope.marketData >>>>>>>>>>>>", $scope.marketData);
                    $scope.home = true;
                } else {
                    $scope.marketData = [];
                }
            } else {
                // alert("Unable get games");
            }
        });
    };

    // $interval(function () {
    //     if ($scope.isHomeData)
    //         $scope.odds();
    // }, 3000);

    $rootScope.getEventList = function (data) {
        console.log("$scope.homeData outside>>>>>>>>>>>>", data);
        var obj = {}
        obj.ids = [];
        _.each(data, function (n) {
            if (n.competition) {
                obj.ids.push(n.competition.id);
                obj.type = "competition";
            } else if (n.event) {
                obj.ids.push(n.event.id);
                obj.type = "event";
            }
        });

        NavigationService.apiCallWithData('betfair/getEventsFromBetFair', obj, function (data) {
            // console.log(data);
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.homeData = data.data;
                    console.log("$scope.homeData >>>>>>>>>>>>", $scope.homeData);
                    $scope.isHomeData = true;
                    $scope.odds();
                    $scope.home = true;
                } else {
                    $scope.homeData = [];
                }
            } else {
                alert("Unable get games");
            }
        });
    };

    $scope.getDetailedPage = function (data) {
        $state.go("detailPage", {
            eventId: data.eventId
        });
    };

    $scope.placeBet = function (price, type, market, selection) {
        var accessToken = jStorageService.getAccessToken();
        var userId = jStorageService.getUserId();
        $rootScope.$broadcast('eventBroadcastedName', {
            odds: price,
            type: type,
            eventId: market.eventId,
            event: market.name,
            selectionId: selection.selectionId,
            selectionName: selection.runnerName,
            sport: "Cricket",
            marketId: market.marketId,
            // accessToken: accessToken,
            // userId: userId
        });
    }














    // function establishSocketConnection() {
    //     $scope.mySocket1 = io.sails.connect(adminUUU);

    //     _.each($scope.marketData, function (market) {
    //         $scope.mySocket1.on("market_" + market.betfairId, function onConnect(data) {
    //             // console.log("socket data", data);
    //             _.each(market.runners, function (runner) {
    //                 _.each(data, function (rate) {
    //                     // console.log(runner.betfairId, "string", (rate.id).toString());
    //                     if (runner.betfairId == (rate.id).toString()) {
    //                         runner.back = rate.batb;
    //                         runner.lay = rate.batl;
    //                         _.each(runner.back, function (backRate) {
    //                             if (backRate[0] == 0) {
    //                                 runner.singleBackRate = backRate[1];
    //                                 runner.singleBackSize = backRate[2]
    //                             }
    //                         });

    //                         _.each(runner.lay, function (layRate) {
    //                             if (layRate[0] == 0) {
    //                                 runner.singleLayRate = layRate[1];
    //                                 runner.singleLaySize = layRate[2]
    //                             }
    //                         });
    //                     }
    //                 });
    //             });
    //             var sortedArray = _.sortBy(market.runners, ['sortPriority']);
    //             market.runners = [];
    //             _.each(sortedArray, function (n) {
    //                 market.runners[n.sortPriority - 1] = n;
    //             });
    //             // console.log("sortedArray", sortedArray);
    //             // console.log(market.betfairId + "marketodds", market);
    //             $scope.$apply();
    //         });
    //     })

    // };

    // $scope.getMarketIds = function (value) {
    //     NavigationService.apiCallWithData('Category/getMarketIds', value, function (data) {
    //         if (data.value) {
    //             if (!_.isEmpty(data.data)) {
    //                 $scope.marketData = data.data;
    //                 // $scope.marketId = "market_1.144792630";
    //                 // console.log("$scope.marketData", $scope.marketData);
    //                 // $scope.setUrl('game', '1');
    //                 $scope.home = true;
    //                 establishSocketConnection();
    //             } else {
    //                 $scope.marketData = [];
    //             }
    //         } else {
    //             // alert("Unable get markets");
    //         }
    //     });
    // };

    // $scope.getDetailedPage = function (game, event, id) {
    //     // $scope.getGameDetailPage(game);
    //     // $scope.eventName = event;
    //     // $scope.getMarketIds({
    //     //     game: game,
    //     //     parentId: id
    //     // });

    //     // $scope.$emit('detailedPage', {
    //     //     game: game,
    //     //     parentId: id
    //     // });

    //     // $state.go($state.current.name, {

    //     $state.go("detailPage", {
    //         game: game,
    //         parentId: id
    //     });
    // };





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

    // $scope.format = 'yyyy/MM/dd';
    // $scope.date = new Date();

    // $scope.placeBet = function (price, type, market, selection) {
    //     var accessToken = jStorageService.getAccessToken();
    //     var userId = jStorageService.getUserId();

    //     $rootScope.$broadcast('eventBroadcastedName', {
    //         odds: price,
    //         type: type,
    //         eventId: market.parentCategory.betfairId,
    //         event: market.parentCategory.event,
    //         selectionId: selection.betfairId,
    //         selectionName: selection.name,
    //         sport: $scope.selectedGame,
    //         marketId: market.betfairId,
    //         accessToken: accessToken,
    //         userId: userId
    //     });
    // }

});