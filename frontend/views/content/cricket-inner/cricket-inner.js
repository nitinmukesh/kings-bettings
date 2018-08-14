myApp.controller('CricketinnerCtrl', function ($scope, TemplateService, NavigationService, $state, $interval, $stateParams, $rootScope) {
    $scope.template = TemplateService.getHTML("content/cricket-inner/cricket-inner.html");
    TemplateService.title = "Cricket Inner"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.page = "content/cricket-inner/cricket-inner.html";

    $rootScope.calculateBook = function (value) {
        var book = [];
        var market = _.cloneDeep($scope.market);

        if (market.betfairId) {
            if (!_.isEmpty(value.lay)) {
                _.each(value.lay, function (n) {
                    if (n.marketId == market.betfairId) {
                        n.unexecutedProfit = undefined;
                        book.push(n);
                    }
                });
            }

            if (!_.isEmpty(value.back)) {
                _.each(value.back, function (n) {
                    if (n.marketId == market.betfairId) {
                        book.push(n);
                    }
                });
            }

            _.each(book, function (b) {
                if (b.type == "LAY") {
                    _.each(market.runners, function (runner) {
                        if (b.selectionId == runner.betfairId) {
                            if (runner.unexecutedProfit)
                                runner.unexecutedProfit = (runner.unexecutedProfit + (b.liability * -1));
                            else
                                runner.unexecutedProfit = -1 * b.liability;
                        } else {
                            if (runner.unexecutedProfit)
                                runner.unexecutedProfit = runner.unexecutedProfit + b.stake;
                            else
                                runner.unexecutedProfit = b.stake;
                        }

                    });
                } else if (b.type == "BACK") {
                    _.each(market.runners, function (runner) {
                        if (b.selectionId == runner.betfairId) {
                            if (runner.unexecutedProfit)
                                runner.unexecutedProfit = (runner.unexecutedProfit + b.profit);
                            else
                                runner.unexecutedProfit = b.profit;
                        } else {
                            if (runner.unexecutedProfit)
                                runner.unexecutedProfit = (runner.unexecutedProfit + (b.stake * -1));
                            else
                                runner.unexecutedProfit = (b.stake) * -1;
                        }
                    });
                }
            });
            if (!_.isEmpty($scope.profits)) {
                _.each(market.runners, function (n) {
                    _.each($scope.profits, function (m) {
                        if (m.betfairId == n.betfairId) {
                            n.unexecutedProfit = (m.amount + n.unexecutedProfit);
                        }
                    });
                });
                $scope.unexecutedProfit = market.runners;
            } else {
                $scope.unexecutedProfit = market.runners;
            }
        }
    };

    $scope.odds = function (data) {
        var obj = {}
        obj.eventId = [];
        var id = $stateParams.eventId;
        obj.eventId.push(id);

        NavigationService.apiCallWithData('betfair/getMarketsFromBetFair', obj, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.market = data.data[0];
                    $scope.profits = [];
                    $scope.market.runners = _.sortBy($scope.market.runners, ['sortPriority']);
                    _.each($scope.market.runners, function (runner) {
                        if (runner.ifWin)
                            $scope.profits.push({
                                amount: runner.ifWin
                            })
                    });
                    // $scope.home = true;
                } else {
                    $scope.market = [];
                }
            } else {
                // alert("Unable get games");
            }
        });
    };
    $scope.odds();
    $interval.cancel(globalInteval);
    globalInteval = $interval(function () {
        $scope.odds();
    }, 5000);
    $scope.placeBet = function (price, type, market, selection) {
        // var accessToken = jStorageService.getAccessToken();
        // var userId = jStorageService.getUserId();
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
    };

});