myApp.controller('rightSideMenuCtrl', function ($scope, $rootScope, $stateParams, jStorageService, TemplateService, BetService, $state, $uibModal, NavigationService, toastr, toastrConfig, $timeout) {
    $scope.BetService = BetService;

    $scope.layArray = [];
    $scope.backArray = [];
    $scope.isBetSlip = false;
    $scope.isLay = false;
    $scope.isBack = false;
    $scope.oneClickbet = false;
    $scope.onclickEdit = false;
    var user = jStorageService.getUserId();
    $scope.stakeData = {};

    $rootScope.$on('eventBroadcastedName', function (event, data) {
        // console.log("data for bet", data);
        $scope.activePill = 0;
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
            } else {
                $scope.backArray[backFound].odds = data.odds;
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
            } else {
                $scope.layArray[layFound].odds = data.odds;
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
    $scope.editStake = function () {
        $scope.editStakeModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/edit-stake.html",
            scope: $scope,
            stake: 'sm',
            windowClass: 'edit-stake-modal'
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
    $scope.getAvailableCredit();

    $scope.resetBet = function () {
        if ($scope.myCurrentBetData && $scope.myCurrentBetData.unMatchedbets) {
            _.forEach($scope.myCurrentBetData.unMatchedbets, function (unMatchedbet) {
                _.forEach(unMatchedbet.betData, function (bet) {
                    bet.betRate = bet.oldBetRate;
                    bet.stake = bet.oldStake;
                })
            })
        }
        $scope.changeInBet = false;
    }
    $scope.getMyCurrentBetStatus = function () {
        NavigationService.apiCallWithData('bet/getMyCurrentBetStatus', {
                playerId: user
            },
            function (betData) {
                console.log("betData", betData);
                if (betData.value) {
                    $scope.myCurrentBetData = betData.data;
                    if ($scope.myCurrentBetData && $scope.myCurrentBetData.unMatchedbets) {
                        _.forEach($scope.myCurrentBetData.unMatchedbets, function (unMatchedbet) {
                            _.forEach(unMatchedbet.betData, function (bet) {
                                bet.oldBetRate = bet.betRate;
                                bet.oldStake = bet.stake;
                            })
                        })
                    }
                }
            });
        $scope.mySocket2 = io.sails.connect(sportsSocket);
        $scope.mySocket2.on("player_" + user, function onConnect(myCurrentBetData) {
            console.log("myCurrentBetData", myCurrentBetData);
            $scope.myCurrentBetData = myCurrentBetData;
        })
    }
    $scope.checkChangeInBet = function () {
        $scope.changeInBet = false;
        if ($scope.myCurrentBetData && $scope.myCurrentBetData.unMatchedbets) {
            _.forEach($scope.myCurrentBetData.unMatchedbets, function (unMatchedbet) {
                _.forEach(unMatchedbet.betData, function (bet) {
                    if (bet.oldBetRate !== bet.betRate) {
                        $scope.changeInBet = true;
                    }
                    if (bet.oldStake !== bet.stake) {
                        $scope.changeInBet = true;
                    }
                })
            })
        }
    }
    $scope.getMyCurrentBetStatus();
    //calculate profit and liability
    $scope.calculatePL = function (type) {
        var userInfo = jStorageService.getuserInfo();
        $scope.memberMinRate = userInfo.minRate[0].memberMinRate;
        $scope.minBetError = false;
        // if (type == "LAY") {
        _.each($scope.layArray, function (n) {
            n.liability = (n.odds && n.stake) ? ((n.odds - 1) * n.stake) : 0;
            n.updatedodds = n.odds - 1;
            n.type = type;
            if (n.stake >= $scope.memberMinRate) {
                n.error = false;
            } else {
                n.error = true;
                $scope.minBetError = true;
            }
        });
        // }

        // if (type == "BACK") {
        _.each($scope.backArray, function (n) {
            n.profit = (n.odds && n.stake) ? ((n.odds - 1) * n.stake) : 0;
            n.updatedodds = n.odds - 1;
            n.type = type;
            if (n.stake >= $scope.memberMinRate) {
                n.error = false;
            } else {
                n.error = true;
                $scope.minBetError = true;
            }
        });
        // }
        $scope.liability = _.sumBy($scope.layArray, "liability") + _.sumBy($scope.backArray, "stake");

        $rootScope.calculateBook({
            lay: $scope.layArray,
            back: $scope.backArray
        });

    };

    $scope.cancelBet = function (betArray, level) {
        var reqData = [];
        if (level == 'All') {
            _.forEach(betArray, function (match) {
                _.forEach(match.betData, function (bet) {
                    reqData.push({
                        playerId: user,
                        betId: bet.betId
                    })
                })
            })
        } else if (level == 'Match') {
            _.forEach(betArray, function (bet) {
                reqData.push({
                    playerId: user,
                    betId: bet.betId
                })
            })
        } else {
            reqData.push({
                playerId: user,
                betId: betArray.betId
            })
        }
        NavigationService.apiCallWithData('Betfair/cancelPlayerBet', reqData, function (data) {
            if (data.value) {
                toastr.success("Bet cancelled successfully!");
            } else {
                toastr.success("Error while cancelling Bet!");
            }
        })
    }


    $scope.placeBet = function () {
        toastrConfig = {};
        toastrConfig.positionClass = 'toast-top-right';
        toastr.success('Your Bet will submit in 5 seconds');
        $scope.betconfirm.close();
        $scope.promise = NavigationService.success().then(function () {
            var reqData = _.concat($scope.layArray, $scope.backArray);
            NavigationService.apiCallWithData('Betfair/placePlayerBet', reqData, function (data) {
                // console.log("data", data);
                if (data.value) {
                    toastr.success("Bet Placed successfully!");
                } else {
                    if (data.error == "MIN_BET_STAKE_REQUIRED") {
                        toastr.error("please increase stake amount");
                    } else {
                        toastr.error("Error while placing Bet");
                    }
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


    //Edit Stakes
    $scope.getStakes = function () {
        NavigationService.apiCallWithData('UserStake/getUserStake', {
            user: user
        }, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.stakeData = data.data;
                    console.log("$scope.stakeData.stake", $scope.stakeData.stake);
                    $scope.stakes = _.cloneDeep($scope.stakeData.stake);
                } else {
                    $scope.stakeData.stake = [25, 50, 100, 150, 200, 250];
                    $scope.stakes = _.cloneDeep($scope.stakeData.stake);
                }
            } else {
                $scope.stakeData.stake = [25, 50, 100, 150, 200, 250];
                $scope.stakes = _.cloneDeep($scope.stakeData.stake);
            }
        });
    };
    $scope.getStakes();

    $scope.saveStake = function (value) {
        // if (!value.user) {
        //     value.user = user;
        // }
        value.user = user;
        NavigationService.apiCallWithData('UserStake/saveUserStake', value, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.stakeData = data.data;
                    $scope.stakes = _.cloneDeep($scope.stakeData.stake);
                    $scope.editStakeModal.close();
                }
            } else {
                toastr.error("Unable to save stake");
                $scope.editStakeModal.close();
            }
        });
    }

});