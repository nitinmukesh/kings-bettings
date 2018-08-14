myApp.controller('MybetCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/mybet/mybet.html");
    TemplateService.title = "My Bet"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.userId= $.jStorage.get("userId");
    $scope.formData = {};
    $scope.formData.page = 1;
    $scope.getBetList = function (data) {
        var data = {};
        data.id = $scope.userId;
        // data.marketId = $stateParams.marketId;
        data.page = $scope.formData.page++;
        $scope.pageNo = data.page;

        NavigationService.getPlayerExecutedBets(data, function (data) {
            if (data.data.data[0]) {
                $scope.accountStatement = data.data.data[0].result;
                console.log("$scope.accountStatement", $scope.accountStatement);
                $scope.totalItems = data.data.data[0].countInfo.count;
            } else {
                $scope.noData = "No Data Found";
            }
            // $scope.maxRow = data.data.data.results.length;
        });
    };
    $scope.getBetList();

});