myApp.controller('CricketinnerCtrl', function ($scope, TemplateService, NavigationService, $state, $interval, $stateParams, $rootScope) {
    $scope.template = TemplateService.getHTML("content/cricket-inner/cricket-inner.html");
    TemplateService.title = "Cricket Inner"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.page = "content/cricket-inner/cricket-inner.html";

    $scope.odds = function (data) {
        var obj = {}
        obj.eventId = [];
        var id = $stateParams.eventId;
        obj.eventId.push(id);

        NavigationService.apiCallWithData('betfair/getMarketsFromBetFair', obj, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.market = data.data[0];
                    $scope.market.runners = _.sortBy($scope.market.runners, ['sortPriority']);
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