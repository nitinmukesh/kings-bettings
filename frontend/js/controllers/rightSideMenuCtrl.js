myApp.controller('rightSideMenuCtrl', function ($scope, $rootScope, $stateParams, TemplateService, BetService, $state, $uibModal, NavigationService) {
    $scope.BetService = BetService;

    $scope.layArray = [];
    $scope.backArray = [];
    $scope.isBetSlip = false;
    $scope.isLay = false;
    $scope.isBack = false;
    $scope.oneClickbet = false;
    $scope.onclickEdit = false;

    $rootScope.$on('eventBroadcastedName', function (event, data) {
        // console.log("data for bet", data);
        $scope.isBetSlip = true;
        if (data.type == "BACK") {
            $scope.backArray.push({
                event: data.event,
                eventId: data.eventId,
                selectionId: data.selectionId,
                selectionName: data.selectionName,
                marketId: data.marketId,
                odds: data.odds,
                accessToken: data.accessToken,
                sport: data.sport,
                profit: 0
            });
            $scope.isBack = true;
        }
        if (data.type == "LAY") {
            $scope.layArray.push({
                event: data.event,
                eventId: data.eventId,
                selectionId: data.selectionId,
                selectionName: data.selectionName,
                marketId: data.marketId,
                odds: data.odds,
                accessToken: data.accessToken,
                sport: data.sport,
                liability: 0
            });
            $scope.isLay = true;
        }
    });


    $scope.betConfirm = function () {

        $scope.betconfirm = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/betconfirm.html",
            scope: $scope,
            stake: 'md',
        });
    };
    $scope.removeAllBets = function () {
        $scope.layArray = [];
        $scope.backArray = [];
        $scope.isLay = false;
        $scope.isBack = false;
        $scope.isBetSlip = false;
        $scope.liability = 0;
    };

    //calculate profit and liability
    $scope.calculatePL = function (type) {

        if (type == "LAY") {
            _.each($scope.layArray, function (n) {
                n.liability = ((n.odds - 1) * n.stake);
                n.updatedodds = n.odds - 1;
                n.type = type;
            });
        }

        if (type == "BACK") {
            _.each($scope.backArray, function (n) {
                n.profit = ((n.odds - 1) * n.stake);
                n.updatedodds = n.odds - 1;
                n.type = type;
            });
        }

        $scope.liability = _.sumBy($scope.layArray, "liability") + _.sumBy($scope.backArray, "stake");
        var c = 0;
        console.log("countere", c++);

        var market = {
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

        var book = [];
        _.each($scope.layArray, function (n) {
            if (n.marketId == market.betfairId)
                book.push(n);
        });



        _.each($scope.backArray, function (n) {
            if (n.marketId == market.betfairId)
                book.push(n);
        });


        // _.each(book, function (b) {
        //     if (b.type == "LAY") {
        //         _.each(market.runners, function (runner) {
        //             if (b.selectionId == runner.betfairId) {
        //                 if (runner.profit)
        //                     runner.profit = (runner.profit + (b.liability * -1));
        //                 else
        //                     runner.profit = -1 * b.liability;
        //             } else {
        //                 if (runner.profit)
        //                     runner.profit = runner.profit + b.stake;
        //                 else
        //                     runner.profit = b.stake;
        //             }

        //         });
        //     } else if (b.type == "BACK") {
        //         _.each(market.runners, function (runner) {
        //             if (b.selectionId == runner.betfairId) {
        //                 if (runner.profit)
        //                     runner.profit = (runner.profit + b.profit);
        //                 else
        //                     runner.profit = b.profit;
        //             } else {
        //                 if (runner.profit)
        //                     runner.profit = (runner.profit + (b.stake * -1));
        //                 else
        //                     runner.profit = (b.stake) * -1;
        //             }

        //         });
        //     }
        // })

        // console.log("market###################", market);

        $rootScope.$broadcast('bookEvent', {
            lay: $scope.layArray,
            back: $scope.backArray
        });


        // console.log("$scope.liability", $scope.liability);
        // console.log("$scope.layArray", $scope.layArray);
        // console.log("$scope.backArray", $scope.backArray);
    };

    $scope.placeBet = function () {
        var reqData = _.concat($scope.layArray, $scope.backArray);
        NavigationService.apiCallWithData('Betfair/placePlayerBet', reqData, function (data) {
            // console.log("data", data);
            $scope.betconfirm.close();
            // callback();
        });
    }

    $scope.addstake = function (value, index, type) {
        if (type == "BACK") {
            if ($scope.backArray[index].stake) {
                $scope.backArray[index].stake = $scope.backArray[index].stake + value;
            } else {
                $scope.backArray[index].stake = 0 + value;
            }
            $scope.calculatePL(type);
        }

        if (type == "LAY") {
            if ($scope.layArray[index].stake) {
                $scope.layArray[index].stake = $scope.layArray[index].stake + value;
            } else {
                $scope.layArray[index].stake = 0 + value;
            }

            $scope.calculatePL(type);
        }
    };

    $scope.clearStake = function (type, index) {
        if (type == "BACK") {
            $scope.backArray[index].stake = 0;
            $scope.calculatePL(type);
        }

        if (type == "LAY") {
            $scope.layArray[index].stake = 0;
            $scope.calculatePL(type);
        }
    };

    $scope.removeBet = function (type, index) {

        if (type == "BACK") {
            _.pullAt($scope.backArray, [index]);
            $scope.calculatePL(type);
        }

        if (type == "LAY") {
            _.pullAt($scope.layArray, [index]);
            $scope.calculatePL(type);
        }

        if (_.isEmpty($scope.backArray) && _.isEmpty($scope.layArray)) {
            $scope.layArray = [];
            $scope.backArray = [];
            $scope.isLay = false;
            $scope.isBack = false;
            $scope.isBetSlip = false;
            $scope.liability = 0;
        }
    };

    //Oneclick betting
    $scope.editOneClickValue = function () {
        $scope.onclickEdit = !$scope.onclickEdit;
    };

    $scope.saveOneClickValue = function () {
        console.log("saveOneClickValue api call");
    }

});