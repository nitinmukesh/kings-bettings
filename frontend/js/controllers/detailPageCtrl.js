myApp.controller('DetailPageCtrl', function ($scope, $rootScope, $stateParams, TemplateService, BetService, $state, $uibModal, $location, NavigationService, jStorageService) {

    $scope.currentGame = ($location.path()).split('/');
    console.log("$scope.selectedGame", $scope.currentGame);
    switch ($scope.currentGame[1]) {
        case "Cricket":
            $scope.page = "content/cricket-inner/cricket-inner.html";
            break;
        case "Tennis":
            $scope.page = "content/tennis-inner/tennis-inner.html";
            break;

        default:
            console.log("Invalid page selection");
    }

    function establishSocketConnection() {
        $scope.mySocket1 = io.sails.connect(adminUUU);

        console.log("socket data detail");
        _.each($scope.marketData, function (market) {
            $scope.mySocket1.on("market_" + market.betfairId, function onConnect(data) {
                console.log("socket data detail", data);

                _.each(market.runners, function (runner) {
                    _.each(data, function (rate) {
                        console.log(runner.betfairId, "string", (rate.id).toString());
                        if (runner.betfairId == (rate.id).toString()) {
                            runner.back = rate.batb;
                            runner.lay = rate.batl;
                            var back = [];
                            var lay = [];
                            _.each(runner.back, function (backRate) {
                                if (backRate[0] == 0)
                                    back[0] = backRate;
                                if (backRate[0] == 1)
                                    back[1] = backRate;
                                if (backRate[0] == 2)
                                    back[2] = backRate;
                            });

                            _.each(runner.lay, function (layRate) {
                                if (layRate[0] == 0)
                                    lay[0] = layRate;
                                if (layRate[0] == 1)
                                    lay[1] = layRate;
                                if (layRate[0] == 2)
                                    lay[2] = layRate;
                            });
                            runner.back = back;
                            runner.lay = lay;
                        }
                    });
                });
                var sortedArray = _.sortBy(market.runners, ['sortPriority']);


                market.runners = [];
                _.each(sortedArray, function (n) {
                    market.runners[n.sortPriority - 1] = n;
                });
                $scope.market = market;

                console.log("sortedArray", sortedArray);
                console.log(market.betfairId + "marketodds", market);
                $scope.$apply();
            });
        })

    };

    $scope.getMarketIds = function (value) {

        NavigationService.apiCallWithData('Category/getMarketIds', value, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.marketData = data.data;
                    $scope.home = true;
                    console.log("Category/getMarketIds detail page", $scope.marketData);
                    establishSocketConnection();
                } else {
                    $scope.marketData = [];
                }
            } else {
                // alert("Unable get markets");
            }
        });
    };

    $scope.getMarketIds({
        game: $scope.currentGame[1],
        parentId: $scope.currentGame[3]
    });

    $scope.template = TemplateService.getHTML($scope.page);
    TemplateService.title = "Cricket Inner"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

    $scope.placeBet = function (price, type, market, selection) {
        var accessToken = jStorageService.getAccessToken();
        var userId = jStorageService.getUserId();
        $rootScope.$broadcast('eventBroadcastedName', {
            odds: price,
            type: type,
            eventId: market.parentCategory.betfairId,
            event: market.parentCategory.name,
            selectionId: selection.betfairId,
            selectionName: selection.name,
            sport: $scope.currentGame[1],
            marketId: market.betfairId,
            accessToken: accessToken,
            userId: userId
        });
    }
});