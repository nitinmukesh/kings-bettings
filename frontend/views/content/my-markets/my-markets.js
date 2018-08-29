myApp.controller('MyMarketsCtrl', function ($scope, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService.getHTML("content/my-markets/my-markets.html");
    TemplateService.title = "My Markets"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

    $scope.getMyMarket = function () {
        var user = $.jStorage.get("userId");
        NavigationService.apiCallWithData('category/getMyMarket', {
            user: user
        }, function (data) {
            console.log("getMyMarketData", data);
            if (data.value) {
                $scope.myMarkets = data.data;
            } else {
                $scope.myMarkets = [];
            }
        });

    };

    $scope.getMyMarket();

    $scope.getMarket = function (value) {
        $state.go("detailPage", {
            game: value.eventType.name,
            parentId: value.parentCategory._id
        });
    }

});