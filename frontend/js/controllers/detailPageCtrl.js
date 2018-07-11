myApp.controller('DetailPageCtrl', function ($scope, $rootScope, $stateParams, TemplateService, BetService, $state, $uibModal, $location, NavigationService, jStorageService) {

    $scope.currentGame = ($location.path()).split('/');
    // console.log("$scope.selectedGame", $scope.currentGame);
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


    $rootScope.$on('bookEvent', function (event, data) {
        // console.log("book data", data);
        alert("hiii");
        $scope.calculateBook(data);
    });

    $scope.calculateBook = function (value) {
        var book = [];
        // console.log("inside cal book", $scope.marketData);
        console.log("got marketid", JSON.stringify(value));
        var market = $scope.marketData[0];
        if (market.betfairId) {
            if (!_.isEmpty(value.lay)) {
                _.each(value.lay, function (n) {
                    if (n.marketId == market.betfairId)
                        book.push(n);
                });
            }

            if (!_.isEmpty(value.back)) {
                _.each(value.back, function (n) {
                    if (n.marketId == market.betfairId)
                        book.push(n);
                });
            }


            // if ($scope.previousSelection == value.selectionId && $scope.previousSelectionType == value.type) {

            //     console.log("inside if")
            //     if (value.type == "LAY") {
            //         _.each(market.runners, function (runner) {
            //             if (value.selectionId == runner.betfairId) {
            //                 if (runner.profit) {
            //                     runner.profit = runner.profit + ((value.liability) * -1);
            //                 } else {
            //                     runner.profit = -1 * value.liability;
            //                 }
            //                 $scope.previousSelection = value.selectionId;
            //                 $scope.previousSelectionType = value.type;
            //             } else {
            //                 if (runner.profit)
            //                     runner.profit = runner.profit + value.stake;
            //                 else
            //                     runner.profit = value.stake;
            //             }
            //         });
            //     } else if (value.type == "BACK") {
            //         _.each(market.runners, function (runner) {
            //             if (value.selectionId == runner.betfairId) {
            //                 if (runner.profit)
            //                     runner.profit = (runner.profit + value.profit);
            //                 else
            //                     runner.profit = value.profit;
            //                 $scope.previousSelection = value.selectionId;
            //                 $scope.previousSelectionType = value.type;
            //             } else {
            //                 if (runner.profit)
            //                     runner.profit = (runner.profit + value.stake) * -1;
            //                 else
            //                     runner.profit = (value.stake) * -1;
            //             }
            //         });
            //     }
            // } else {

            //     if (value.type == "LAY") {
            //         _.each(market.runners, function (runner) {
            //             if (value.selectionId == runner.betfairId) {
            //                 if (runner.profit) {
            //                     runner.profit = runner.profit + ((value.liability) * -1);
            //                 } else {
            //                     runner.profit = -1 * value.liability;
            //                 }
            //                 $scope.previousSelection = value.selectionId;
            //                 $scope.previousSelectionType = value.type;
            //             } else {
            //                 if (runner.profit)
            //                     runner.profit = runner.profit + value.stake;
            //                 else
            //                     runner.profit = value.stake;
            //             }

            //         });
            //     } else if (value.type == "BACK") {
            //         _.each(market.runners, function (runner) {
            //             if (value.selectionId == runner.betfairId) {
            //                 if (runner.profit)
            //                     runner.profit = (runner.profit + value.profit);
            //                 else
            //                     runner.profit = value.profit;

            //                 $scope.previousSelection = value.selectionId;
            //                 $scope.previousSelectionType = value.type;
            //             } else {
            //                 if (runner.profit)
            //                     runner.profit = (runner.profit + value.stake) * -1;
            //                 else
            //                     runner.profit = (value.stake) * -1;
            //             }

            //         });
            //     }
            // }
            console.log("got marketid", book);
            _.each(book, function (b) {
                if (b.type == "LAY") {
                    _.each(market.runners, function (runner) {
                        if (b.selectionId == runner.betfairId) {
                            if (runner.profit)
                                runner.profit = (runner.profit + b.liability) * -1;
                            else
                                runner.profit = -1 * b.liability;
                        } else {
                            if (runner.profit)
                                runner.profit = runner.profit + b.stake;
                            else
                                runner.profit = b.stake;
                        }

                    });
                } else if (b.type == "BACK") {
                    _.each(market.runners, function (runner) {
                        if (b.selectionId == runner.betfairId) {
                            if (runner.profit)
                                runner.profit = (runner.profit + b.profit);
                            else
                                runner.profit = b.profit;
                        } else {
                            if (runner.profit)
                                runner.profit = (runner.profit + b.stake) * -1;
                            else
                                runner.profit = (b.stake) * -1;
                        }

                    });
                }
            })

            console.log("market###################", market);
        }
    };

    function establishSocketConnection() {
        $scope.mySocket1 = io.sails.connect(adminUUU);
        $scope.market = {
            "_id": "5b4064f36b204c1fcb533759",
            "betfairId": "1.144476996",
            "marketStartTime": "2018-08-01T10:00:00.000Z",
            "parentCategory": {
                "_id": "5b4064f36b204c1fcb5336fe",
                "name": "England v India (1st Test)",
                "betfairId": "28755539"
            },
            "runners": [{
                "_id": "5b4064f36b204c1fcb533774",
                "name": "England",
                "betfairId": "10301",
                "sortPriority": 1,
                "back": [
                    [0, 2.16, 200],
                    [1, 2.14, 9.67],
                    [2, 2.12, 579.91]
                ],
                "lay": [
                    [0, 2.26, 21.92],
                    [1, 2.5, 18.42],
                    [2, 1000, 2.61]
                ],
                "$$hashKey": "object:252"
            }, {
                "_id": "5b4064f36b204c1fcb533773",
                "name": "India",
                "betfairId": "414464",
                "sortPriority": 2,
                "back": [
                    [0, 3.05, 24.49],
                    [1, 3, 5],
                    [2, 2.98, 15.78]
                ],
                "lay": [
                    [0, 3.25, 45.66],
                    [1, 3.4, 75.99],
                    [2, 3.5, 139.19]
                ],
                "$$hashKey": "object:253"
            }, {
                "_id": "5b4064f36b204c1fcb533775",
                "name": "The Draw",
                "betfairId": "60443",
                "sortPriority": 3,
                "back": [
                    [0, 4.4, 5.85],
                    [1, 4.3, 100],
                    [2, 4.2, 210.03]
                ],
                "lay": [
                    [0, 4.5, 45.11],
                    [1, 4.6, 56.14],
                    [2, 4.7, 108.37]
                ],
                "$$hashKey": "object:254"
            }]
        }
        // console.log("socket data detail");
        // _.each($scope.marketData, function (market) {
        //     $scope.mySocket1.on("market_" + market.betfairId, function onConnect(data) {
        //         console.log("socket data detail", data);

        //         _.each(market.runners, function (runner) {
        //             _.each(data, function (rate) {
        //                 console.log(runner.betfairId, "string", (rate.id).toString());
        //                 if (runner.betfairId == (rate.id).toString()) {
        //                     runner.back = rate.batb;
        //                     runner.lay = rate.batl;
        //                     var back = [];
        //                     var lay = [];
        //                     _.each(runner.back, function (backRate) {
        //                         if (backRate[0] == 0)
        //                             back[0] = backRate;
        //                         if (backRate[0] == 1)
        //                             back[1] = backRate;
        //                         if (backRate[0] == 2)
        //                             back[2] = backRate;
        //                     });

        //                     _.each(runner.lay, function (layRate) {
        //                         if (layRate[0] == 0)
        //                             lay[0] = layRate;
        //                         if (layRate[0] == 1)
        //                             lay[1] = layRate;
        //                         if (layRate[0] == 2)
        //                             lay[2] = layRate;
        //                     });
        //                     runner.back = back;
        //                     runner.lay = lay;
        //                 }
        //             });
        //         });
        //         var sortedArray = _.sortBy(market.runners, ['sortPriority']);


        //         market.runners = [];
        //         _.each(sortedArray, function (n) {
        //             market.runners[n.sortPriority - 1] = n;
        //         });
        //         $scope.market = market;

        //         console.log("sortedArray", sortedArray);
        //         console.log(market.betfairId + "marketodds", market);
        //         $scope.$apply();
        //     });
        // })

    };

    $scope.getMarketIds = function (value) {

        NavigationService.apiCallWithData('Category/getMarketIds', value, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    // $scope.marketData = data.data;
                    $scope.marketData = [{
                        "_id": "5b4064f36b204c1fcb533759",
                        "betfairId": "1.144476996",
                        "marketStartTime": "2018-08-01T10:00:00.000Z",
                        "parentCategory": {
                            "_id": "5b4064f36b204c1fcb5336fe",
                            "name": "England v India (1st Test)",
                            "betfairId": "28755539"
                        },
                        "runners": [{
                            "_id": "5b4064f36b204c1fcb533774",
                            "name": "England",
                            "betfairId": "10301",
                            "sortPriority": 1,
                            "back": [
                                [0, 2.16, 200],
                                [1, 2.14, 9.67],
                                [2, 2.12, 579.91]
                            ],
                            "lay": [
                                [0, 2.26, 21.92],
                                [1, 2.5, 18.42],
                                [2, 1000, 2.61]
                            ],
                            "$$hashKey": "object:252"
                        }, {
                            "_id": "5b4064f36b204c1fcb533773",
                            "name": "India",
                            "betfairId": "414464",
                            "sortPriority": 2,
                            "back": [
                                [0, 3.05, 24.49],
                                [1, 3, 5],
                                [2, 2.98, 15.78]
                            ],
                            "lay": [
                                [0, 3.25, 45.66],
                                [1, 3.4, 75.99],
                                [2, 3.5, 139.19]
                            ],
                            "$$hashKey": "object:253"
                        }, {
                            "_id": "5b4064f36b204c1fcb533775",
                            "name": "The Draw",
                            "betfairId": "60443",
                            "sortPriority": 3,
                            "back": [
                                [0, 4.4, 5.85],
                                [1, 4.3, 100],
                                [2, 4.2, 210.03]
                            ],
                            "lay": [
                                [0, 4.5, 45.11],
                                [1, 4.6, 56.14],
                                [2, 4.7, 108.37]
                            ],
                            "$$hashKey": "object:254"
                        }]
                    }]
                    $scope.home = true;
                    // console.log("Category/getMarketIds detail page", $scope.marketData);
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