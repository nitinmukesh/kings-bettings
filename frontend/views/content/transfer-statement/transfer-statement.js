myApp.controller('TransferstatementCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/transfer-statement/transfer-statement.html");
    TemplateService.title = "Transfer Statement"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.getPlayerTransaction = function (page) {
        $scope.userId = $.jStorage.get("userId");
        NavigationService.searchPlayerTransactionData({
            _id: $scope.userId,
            page: page
        }, function (data) {
            if (data.value) {
                // $scope.playerTransaction = data.data.results;
                $scope.items = data.data.results;
                $scope.totalItems = data.data.total;
                $scope.maxRow = data.data.options.count;
            } else {
                $scope.playerTransaction = [];
            }
        });

    };
    $scope.getPlayerTransaction(1);

});