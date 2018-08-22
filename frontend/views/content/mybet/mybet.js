myApp.controller('MybetCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/mybet/mybet.html");
    TemplateService.title = "My Bet"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    TemplateService.rightsidemenu = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.isLoadMore = false;
    $scope.clearedOrders = [];
    $scope.currentOrders = [];
    $scope.formData = {};
    $scope.formData.skip = 0;


    $scope.filter = function (value) {
        $scope.clearedOrders = [];
        $scope.currentOrders = [];
        $scope.formData.skip = 0;
        $scope.myBets(value);
    };

    $scope.myBets = function (formData) {
        formData.skip = ++$scope.formData.skip;
        if (formData.betStatus == "EXECUTION_COMPLETE" || formData.betStatus == "EXECUTABLE") {
            $scope.settledBets = false;
            $scope.currentBet = true;
            NavigationService.getMyCurrentOrders(formData, function (data) {
                if (data.data[0].result.moreAvailable == false) {
                    $scope.noData = true;
                }
                if (data.data[0].result.currentOrders) {
                    $scope.currentOrders = _.concat($scope.currentOrders, data.data[0].result.currentOrders);
                    $scope.isLoadMore = true;
                } else if (data.data.error) {
                    $scope.error = data.data.error;
                } else {
                    $scope.noData = true;
                    $scope.error = "No data Found";
                }
            });
        } else {
            $scope.settledBets = true;
            $scope.currentBet = false;
            NavigationService.myBets(formData, function (data) {
                if (data.data[0].result.moreAvailable == false) {
                    $scope.noData = true;
                }
                if (data.data[0].result.clearedOrders) {
                    $scope.clearedOrders = _.concat($scope.clearedOrders, data.data[0].result.clearedOrders);
                    $scope.isLoadMore = true;
                } else if (data.data.error) {
                    $scope.error = data.data.error;
                } else {
                    $scope.noData = true;
                    $scope.error = "No data Found";
                }
            });
        }

    };
    $scope.myBets($scope.formData);
    $scope.loadMore = function (value) {
        if ($scope.isLoadMore) {
            $scope.myBets(value);
            $scope.isLoadMore = false;
        }
    }

});