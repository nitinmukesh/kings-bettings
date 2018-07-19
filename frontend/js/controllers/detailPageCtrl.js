myApp.controller('DetailPageCtrl', function ($scope, $rootScope, $stateParams, TemplateService, BetService, $state, $uibModal, $location, NavigationService, jStorageService, $timeout) {

    $scope.currentGame = ($location.path()).split('/');
    switch ($scope.currentGame[1]) {
        case "Cricket":
            $scope.page = "content/cricket-inner/cricket-inner.html";
            break;
        case "Tennis":
            $scope.page = "content/tennis-inner/tennis-inner.html";
            break;
        case "Soccer":
            $scope.page = "content/football-inner/football-inner.html";
            break;
        default:
            console.log("Invalid page selection");
    }

    var market;
    $rootScope.calculateBook = function (value) {
        var book = [];
        market = _.cloneDeep($scope.market);

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
                console.log("$scope.profits", $scope.profits);
                console.log("market.runners", market.runners);
                _.each(market.runners, function (n) {
                    _.each($scope.profits, function (m) {
                        if (m.betfairId == m.betfairId) {
                            n.unexecutedProfit = (m.amount + n.unexecutedProfit);
                        }
                    });
                });
                $scope.unexecutedProfit = market.runners;
            } else {
                $scope.unexecutedProfit = market.runners;
                console.log("$scope.unexecutedProfit", $scope.unexecutedProfit);
                console.log("market.runners", market.runners);
            }
        }
    };

    function establishSocketConnection() {


        var user = jStorageService.getUserId();
        _.each($scope.marketData, function (market) {

            async.parallel([
                function (callback) {
                    console.log("book_" + market.betfairId + "_" + user);
                    $scope.mySocket2 = io.sails.connect(sportsSocket);
                    NavigationService.apiCallWithData('Book/getUserBook', {
                        marketId: market.betfairId,
                        user: user
                    }, function (bookInfo) {
                        if (bookInfo.value) {
                            $scope.bookInfo = bookInfo.data.horse;
                            $scope.userRate = bookInfo.data.userRate;
                        }
                        $scope.mySocket1.on("book_" + market.betfairId + "_" + user, function onConnect(bookData) {
                            $scope.bookInfo = bookData.horse;
                            $scope.userRate = bookData.userRate;
                            console.log("$scope.bookInfo1", $scope.bookInfo);
                        });
                        console.log("$scope.bookInfo2", $scope.bookInfo);
                        callback(null, $scope.bookInfo);
                    });

                },
                function (bookData, callback) {
                    $scope.mySocket1 = io.sails.connect(adminUUU);
                    $scope.mySocket1.on("market_" + market.betfairId, function onConnect(data) {
                        console.log("socket data detail", data);
                        // callback(null, data);
                        _.each(market.runners, function (runner) {
                            _.each(data, function (rate) {
                                console.log(runner.betfairId, "string", (rate.id).toString());
                                if (runner.betfairId == (rate.id).toString()) {
                                    // runner.back = rate.batb;
                                    // runner.lay = rate.batl;
                                    var back = runner.back ? runner.back : [];
                                    var lay = runner.lay ? runner.lay : [];
                                    _.each(rate.batb, function (backRate) {
                                        if (backRate[0] == 0)
                                            back[0] = backRate;
                                        if (backRate[0] == 1)
                                            back[1] = backRate;
                                        if (backRate[0] == 2)
                                            back[2] = backRate;
                                    });

                                    _.each(rate.batl, function (layRate) {
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
                        if (!_.isEmpty($scope.bookInfo)) {
                            _.each($scope.market.runners, function (runner) {
                                _.each($scope.bookInfo, function (horse) {
                                    if (runner.betfairId == horse.horse) {
                                        runner.amount = horse.amount;
                                    }
                                })
                            });
                            $scope.profits = $scope.market.runners;
                        }
                        // $scope.profits = $scope.market.runners;
                        console.log("sortedArray", sortedArray);
                        console.log("$scope.market", $scope.market);
                        $scope.$apply();
                    })
                },
            ], function (err, result) {
                // if (result) {

                // if (!_.isEmpty($scope.bookInfo)) {
                //     _.each($scope.market.runners, function (runner) {
                //         _.each($scope.bookInfo, function (horse) {
                //             if (runner.betfairId == horse.horse) {
                //                 runner.profit = horse.amount;
                //             }
                //         })
                //     });
                //     $scope.profits = $scope.market.runners;
                // }
                // }
            });
        });
    }

    $scope.getMarketIds = function (value) {

        NavigationService.apiCallWithData('Category/getMarketIds', value, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.marketData = data.data;
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