myApp.controller('FavouritesCtrl', function ($scope, $rootScope, TemplateService, NavigationService, jStorageService) {
    $scope.template = TemplateService.getHTML("content/favourites/favourites.html");
    TemplateService.title = "Favourites"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    var user = jStorageService.getUserId();

    $scope.marketArray = [];
    $rootScope.calculateBook = function (value) {

        _.each($scope.marketData, function (data, key) {
            var book = [];
            console.log("key++++++++++++++++++++++++++", $scope.marketArray, $scope.marketData);
            $scope.marketArray[key] = _.cloneDeep(data);
            // if ((!_.isEmpty(value.lay) && value.lay[0].marketId == $scope.marketArray[key].betfairId) || (!_.isEmpty(value.back) && value.back[0].marketId == $scope.marketArray[key].betfairId)) {
            if (!_.isEmpty(value.lay)) {
                _.each(value.lay, function (n) {
                    if (n.marketId == $scope.marketArray[key].betfairId) {
                        n.unexecutedProfit = undefined;
                        book.push(n);
                    }
                });
            }

            if (!_.isEmpty(value.back)) {
                _.each(value.back, function (n) {
                    if (n.marketId == $scope.marketArray[key].betfairId) {
                        book.push(n);
                    }
                });
            }

            _.each(book, function (b) {
                if (b.type == "LAY") {
                    _.each($scope.marketArray[key].runners, function (runner) {
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
                    _.each($scope.marketArray[key].runners, function (runner) {
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

            _.each($scope.profits, function (p) {
                if (p.marketId == $scope.marketArray[key].betfairId) {
                    if (!_.isEmpty(p.runner)) {
                        _.each($scope.marketArray[key].runners, function (n) {
                            _.each(p.runner, function (m) {
                                if (m.betfairId == n.betfairId) {
                                    n.unexecutedProfit = (m.amount + n.unexecutedProfit);
                                }
                            });
                        });
                        _.each($scope.unexecutedProfit, function (n) {
                            if ($scope.marketArray[key].betfairId == n.marketId) {
                                n.runner = $scope.marketArray[key].runners;
                            }
                        });
                    } else {
                        _.each($scope.unexecutedProfit, function (n) {
                            if ($scope.marketArray[key].betfairId == n.marketId) {
                                n.runner = $scope.marketArray[key].runners;
                            }
                        });
                    }
                }
                // $scope.$apply();
            });

            // }
        });


    };

    $scope.calculatePlacedBookAmt = function (market, bookInfo) {
        _.each(market.runners, function (runner) {
            _.each(bookInfo, function (horse) {
                if (runner.betfairId == horse.horse) {
                    runner.amount = (horse.amount) / $scope.userRate;
                }
            })
        });
        _.each($scope.profits, function (n) {
            if (market.betfairId == n.marketId) {
                n.runner = market.runners;
                $scope.unexecutedProfit[key] = [];
            }
        });
        $scope.$apply();
    };

    function establishSocketConnection() {

        var user = jStorageService.getUserId();
        $scope.mySocket1 = io.sails.connect(adminUUU);
        // $scope.mySocket2 = io.sails.connect(sportsSocket);
        _.each($scope.marketData, function (market) {
            $scope.mySocket1.on("market_" + market.betfairId, function onConnect(data) {
                _.each(market.runners, function (runner) {
                    _.each(data, function (rate) {
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
                // if (!_.isEmpty($scope.bookInfo)) {
                //     // $scope.calculatePlacedBookAmt(market, $scope.bookInfo);
                // }
                $scope.$apply();
            });


            // NavigationService.apiCallWithData('Book/getUserBook', {
            //     marketId: market.betfairId,
            //     user: user
            // }, function (bookInfo) {
            //     if (bookInfo.value) {
            //         $scope.bookInfo = bookInfo.data.horse;
            //         $scope.userRate = bookInfo.data.userRate;
            //     }
            //     $scope.mySocket2 = io.sails.connect(sportsSocket);
            //     $scope.mySocket2.on("Book_" + market.betfairId + "_" + user, function onConnect(bookData) {
            //         // $scope.mySocket2.on("Book_1.145660267_5b20f7dc9730e40f79534134", function onConnect(bookData) {
            //         $scope.bookInfo = bookData.horse;
            //         $scope.userRate = 100;
            //         $scope.calculatePlacedBookAmt(market, $scope.bookInfo);
            //     });
            //     callback(null, $scope.bookInfo);
            // });
            ///////////////*************************************//////////////////
            // async.parallel([
            //     function (callback) {
            //         // console.log("book_" + market.betfairId + "_" + user);
            //         $scope.mySocket2 = io.sails.connect(sportsSocket);
            //         NavigationService.apiCallWithData('Book/getUserBook', {
            //             marketId: market.betfairId,
            //             user: user
            //         }, function (bookInfo) {
            //             if (bookInfo.value) {
            //                 $scope.bookInfo = bookInfo.data.horse;
            //                 $scope.userRate = bookInfo.data.userRate;
            //             }
            //             $scope.mySocket2 = io.sails.connect(sportsSocket);
            //             $scope.mySocket2.on("Book_" + market.betfairId + "_" + user, function onConnect(bookData) {
            //                 // $scope.mySocket2.on("Book_1.145660267_5b20f7dc9730e40f79534134", function onConnect(bookData) {
            //                 $scope.bookInfo = bookData.horse;
            //                 $scope.userRate = 100;
            //                 $scope.calculatePlacedBookAmt(market, $scope.bookInfo);
            //             });
            //             callback(null, $scope.bookInfo);
            //         });

            //     },
            //     // function (bookData, callback) {
            //     function (callback) {
            //         $scope.mySocket1 = io.sails.connect(adminUUU);
            //         // console.log("market_" + market.betfairId);
            //         $scope.mySocket1.on("market_" + market.betfairId, function onConnect(data) {
            //             _.each(market.runners, function (runner) {
            //                 _.each(data, function (rate) {
            //                     if (runner.betfairId == (rate.id).toString()) {
            //                         // runner.back = rate.batb;
            //                         // runner.lay = rate.batl;
            //                         var back = runner.back ? runner.back : [];
            //                         var lay = runner.lay ? runner.lay : [];
            //                         _.each(rate.batb, function (backRate) {
            //                             if (backRate[0] == 0)
            //                                 back[0] = backRate;
            //                             if (backRate[0] == 1)
            //                                 back[1] = backRate;
            //                             if (backRate[0] == 2)
            //                                 back[2] = backRate;
            //                         });

            //                         _.each(rate.batl, function (layRate) {
            //                             if (layRate[0] == 0)
            //                                 lay[0] = layRate;
            //                             if (layRate[0] == 1)
            //                                 lay[1] = layRate;
            //                             if (layRate[0] == 2)
            //                                 lay[2] = layRate;
            //                         });
            //                         runner.back = back;
            //                         runner.lay = lay;
            //                     }
            //                 });
            //             });
            //             var sortedArray = _.sortBy(market.runners, ['sortPriority']);
            //             market.runners = [];
            //             _.each(sortedArray, function (n) {
            //                 market.runners[n.sortPriority - 1] = n;
            //             });
            //             if (!_.isEmpty($scope.bookInfo)) {
            //                 // $scope.calculatePlacedBookAmt(market, $scope.bookInfo);
            //             }
            //             $scope.$apply();
            //         })
            //     },
            // ], function (err, data) {});
        });
    }

    $scope.getUserFavourites = function () {
        $scope.profits = [];
        $scope.unexecutedProfit = [];
        NavigationService.apiCallWithData('FavouriteMatch/getUserFavourites', {
            user: user
        }, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.marketData = data.data;
                    _.each($scope.marketData, function (market) {
                        var sortedArray = _.sortBy(market.runners, ['sortPriority']);
                        market.runners = [];
                        _.each(sortedArray, function (n) {
                            market.runners[n.sortPriority - 1] = n;
                        });
                        $scope.profits.push({
                            marketId: market.betfairId
                        });
                        $scope.unexecutedProfit.push({
                            marketId: market.betfairId
                        });
                    });
                    // $scope.marketData = _.groupBy($scope.marketData, function (n) {
                    //     return n.eventType.name
                    // });
                    establishSocketConnection();
                } else {
                    $scope.marketData = [];
                }
            } else {
                // alert("Unable get markets");
            }
        });
    };
    $scope.getUserFavourites();

    $scope.placeBet = function (price, type, market, selection, sport) {
        var accessToken = jStorageService.getAccessToken();
        var userId = jStorageService.getUserId();
        $rootScope.$broadcast('eventBroadcastedName', {
            odds: price,
            type: type,
            eventId: market.parentCategory.betfairId,
            event: market.parentCategory.name,
            selectionId: selection.betfairId,
            selectionName: selection.name,
            sport: sport,
            marketId: market.betfairId,
            accessToken: accessToken,
            userId: userId
        });
    };
});