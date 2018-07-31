myApp.controller('CricketCtrl', function ($scope, TemplateService, NavigationService, $rootScope, $interval, $state, jStorageService) {
    $scope.template = TemplateService.getHTML("content/cricket/cricket.html");
    TemplateService.title = "Cricket"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    // alert("bro its cricket",$scope.date);
    console.log("Changes Cricket Ctrl");

    $scope.odds = function () {
        var obj = {}
        obj.eventId = [];
        _.each($scope.homeData, function (n) {
            obj.eventId.push(n.event.id);
        });
        console.log("Cricket Controller Ods Calculated");
        NavigationService.apiCallWithData('betfair/getMarketsFromBetFair', obj, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.marketData = data.data;

                    _.each($scope.marketData, function (market) {
                        market = _.sortBy(market.runners, ['sortPriority']);
                    })
                    $scope.home = true;
                } else {
                    $scope.marketData = [];
                }
            } else {
                // alert("Unable get games");
            }
        });
    };

    $interval.cancel(globalInteval);
    globalInteval = $interval(function () {
        $scope.odds();
    }, 2000);

    $rootScope.getEventList = function (data) {
        console.log($state.current.name);
        if ($state.current.name == "home") {
            console.log("RooTScopeCalled");
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
                if (data.value) {
                    if (!_.isEmpty(data.data)) {
                        $scope.homeData = data.data;
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
        }
    };

    $scope.getDetailedPage = function (data) {
        $state.go("cricket-inner", {
            eventId: data.eventId
        });
    };

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