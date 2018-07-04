myApp.controller('rightSideMenuCtrl', function ($scope, $rootScope, $stateParams, TemplateService, BetService, $state, $uibModal, NavigationService) {
    $scope.BetService = BetService;

    $scope.layArray = [];
    $scope.backArray = [];
    $scope.isBetSlip = false;
    $scope.isLay = false;
    $scope.isBack = false;
    $scope.oneClickbet = false;
    $scope.onclickEdit = false;

    $scope.$on('eventBroadcastedName', function (event, data) {
        $scope.isBetSlip = true;
        if (data.type == "BACK") {
            $scope.backArray.push({
                event: data.event,
                selectionId: data.selectionId,
                selectionName: data.selectionName,
                matchId: data.matchId,
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
                selectionId: data.selectionId,
                selectionName: data.selectionName,
                matchId: data.matchId,
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

        console.log("$scope.liability", $scope.liability);
        console.log("$scope.layArray", $scope.layArray);
        console.log("$scope.backArray", $scope.backArray);
    };

    $scope.placeBet = function () {
        var tmsData;
        async.waterfall([
            function (callback) {
                var reqData = _.concat($scope.layArray, $scope.backArray)
                console.log(reqData)
                // NavigationService.calculateBet(reqData, function (data) {
                //     console.log(data.data);
                //     if (data.value) {
                //         callback();
                //     }
                // });
                callback(null, "hey");
            },
            function (data, callback) {
                // tmsData = data;
                // NavigationService.apiCallWithData('Betfair/placeOrders', {}, function (data) {
                //     callback();
                // });
                callback(null, "hey");
            },
            function (data, callback) {
                data = [{
                            "event": "Sunrisers Hyderabad v Chennai Super Kings",
                            "liability": 25,
                            "matchId": "12345",
                            "odds": 25,
                            "selectionId": "123",
                            "selectionName": "Hyderabad",
                            "stake": 50,
                            "type": "LAY",
                            "updatedodds": 0.5,
                            "sport": "Soccer",
                            "calcAmt": 10,
                            "accessToken": "abc1",
                            "userId": "12345"
                        },
                        {
                            "event": "Sunrisers Hyderabad v Chennai Super Kings",
                            "liability": 25,
                            "matchId": "12345",
                            "odds": 25,
                            "selectionId": "123",
                            "selectionName": "Hyderabad",
                            "stake": 50,
                            "type": "LAY",
                            "updatedodds": 0.5,
                            "sport": "Cricket",
                            "calcAmt": 10,
                            "accessToken": "abc1",
                            "userId": "12345"
                        }
                    ],

                    NavigationService.apiCallWithData('Bet/saveUserBet', data, function (data) {
                        console.log()
                    });
            }
        ], function () {

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