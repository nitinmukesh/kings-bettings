myApp.controller('TransferstatementCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/transfer-statement/transfer-statement.html");
    TemplateService.title = "Transfer Statement"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.getPlayerTransaction = function () {
        NavigationService.searchPlayerTransactionData({
            _id: $.jStorage.get("userId")
        }, function (data) {
            if (data.value) {
                $scope.myMarkets = data.data;
            } else {
                $scope.myMarkets = [];
            }
        });

    };

    $scope.getPlayerTransaction();

});