myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, uibDateParser, $stateParams, jStorageService) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.sidemenu2 = "";
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.oneAtATime = true;
    $scope.matches = [];

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $scope.itemArray = [{
            id: 1,
            name: 'first'
        },
        {
            id: 2,
            name: 'second'
        },
        {
            id: 3,
            name: 'third'
        },
        {
            id: 4,
            name: 'fourth'
        },
        {
            id: 5,
            name: 'fifth'
        },
    ];

    $scope.selected = {
        value: $scope.itemArray[0]
    };

    // io.socket.on("marketOdds" + 1.144715412, function (data) {
    //     console.log(data);
    // });

    function establishSocketConnection() {
        var mySocket1 = io.sails.connect(adminUUU);

        _.each($scope.marketData, function (market) {
            console.log("market_" + market.betfairId);
            mySocket1.on("market_" + market.betfairId, function onConnect(data) {
                console.log(market.betfairId + "marketodds", data);
                $scope.matches = data;
                $scope.$apply();
            });
        })

    }

    $scope.getMarketIds = function () {

        NavigationService.apiCallWithData('Category/getMarketIds', {
            game: "Tennis",
        }, function (data) {
            // console.log("Category/getMarketIds", data);
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.marketData = data.data;
                    $scope.marketId = "market_1.144792630";
                    // console.log("$scope.marketData", $scope.marketData);
                    // $scope.setUrl('game', '1');
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
    $scope.getMarketIds();





    // $scope.getMatchOdds = function (data) {
    //     NavigationService.getMatchOddsData('BetFair/getMatchOdds', {}, function (data) {
    //         $scope.matches = data.data;
    //         console.log("home", $scope.matches);
    //     });
    // };
    // setInterval(function(){
    //     $scope.getMatchOdds();
    //   }, 1000)

    // $scope.getMatchByCategory({
    //     'game': "5afebdc3c35ebd4a630532e6"
    // });

    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();

    $scope.check = function (price, type) {
        var accessToken = jStorageService.getAccessToken();
        var userId = jStorageService.getUserId();
        $scope.$broadcast('eventBroadcastedName', {
            odds: price,
            type: type,
            event: "Sunrisers Hyderabad v Chennai Super Kings",
            selectionId: "123",
            selectionName: "Hyderabad",
            sport: "Cricket",
            marketId: "12345",
            accessToken: accessToken,
            userId: userId
        });
    }


});