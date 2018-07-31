myApp.controller('rightSideMenuCtrl', function ($scope, $rootScope, $stateParams, jStorageService, TemplateService, BetService, $state, $uibModal, NavigationService, toastr) {
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
            var backFound = _.findIndex($scope.backArray, function (back) {
                return data.selectionId == back.selectionId;
            })
            if (backFound == -1) {
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
        }
        if (data.type == "LAY") {
            var layFound = _.findIndex($scope.layArray, function (lay) {
                return data.selectionId == lay.selectionId;
            })
            if (layFound == -1) {
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
        $rootScope.calculateBook({
            lay: $scope.layArray,
            back: $scope.backArray
        });
    };

    $scope.getAvailableCredit = function () {
        var user = jStorageService.getUserId();
        NavigationService.apiCallWithUrl(mainServer + 'api/sportsbook/getCurrentBalance', {
                _id: user
            },
            function (balanceData) {
                if (balanceData.value) {
                    $scope.balanceData = balanceData.data;
                }
            });
        NavigationService.apiCallWithUrl(mainServer + 'api/netExposure/getMemberNetExposure', {
                _id: user
            },
            function (netExposureData) {
                if (netExposureData.value) {
                    console.log("netExposureData!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", netExposureData);
                    $scope.netExposureData = netExposureData.data.netExposure ? (netExposureData.data.netExposure * -1) : 0;
                    console.log("$scope.netExposureData##########################", $scope.netExposureData);
                }
            });
        $scope.mySocket1 = io.sails.connect(mainServer);
        console.log("getAvailableCredit", user);

        $scope.mySocket1.on("Balance_" + user, function onConnect(balanceData) {
            $scope.balanceData = balanceData;
            $scope.$apply();
        });
        $scope.mySocket1.on("NetExposure_" + user, function onConnect(netExposureData) {
            $scope.netExposureData = netExposureData.netExposure ? (netExposureData.netExposure * -1) : 0;
            console.log("$scope.netExposureData22222222222222222222222", $scope.netExposureData);
            $scope.$apply();
        })
    }
    // $scope.getAvailableCredit();
    //calculate profit and liability
    $scope.calculatePL = function (type) {
        if (type == "LAY") {
            _.each($scope.layArray, function (n) {
                n.liability = (n.odds && n.stake) ? ((n.odds - 1) * n.stake) : 0;
                n.updatedodds = n.odds - 1;
                n.type = type;
            });
        }

        if (type == "BACK") {
            _.each($scope.backArray, function (n) {
                n.profit = (n.odds && n.stake) ? ((n.odds - 1) * n.stake) : 0;
                n.updatedodds = n.odds - 1;
                n.type = type;
            });
        }

        $scope.liability = _.sumBy($scope.layArray, "liability") + _.sumBy($scope.backArray, "stake");

        // $rootScope.calculateBook({
        //     lay: $scope.layArray,
        //     back: $scope.backArray
        // });

    };

    $scope.placeBet = function () {
        $scope.promise = NavigationService.success().then(function () {
            var accessToken = $.jStorage.get("accessToken");
            var reqData = _.concat($scope.layArray, $scope.backArray);
            var obj = {
                array: reqData,
                accessToken: accessToken
            }
            NavigationService.placeOrders('Betfair/placeOrders', obj, function (data) {
                // console.log("data", data);
                if (data.value) {
                    toastr.success("Bet Placed successfully!");
                    $rootScope.getAccountFunds();
                    $scope.betconfirm.close();
                    $scope.removeAllBets();
                } else {
                    toastr.error("Error while placing Bet");
                    $scope.betconfirm.close();
                    $rootScope.getAccountFunds();
                }
                // callback();
            });
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