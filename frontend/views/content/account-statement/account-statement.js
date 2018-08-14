myApp.controller('AccountStatementCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/account-statement/account-statement.html");
    TemplateService.title = "Account Statement"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.accessToken = $.jStorage.get("accessToken");
    console.log("accessToken//////////////////////////////////////////////////////", $scope.accessToken);
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };

    // $scope.resetStatementFilter = function () {
    //     $scope.pageNo = 1;
    //     $scope.allResults = [];
    //     $scope.results = [];
    // };

    var accountStatmentFilter = {};
    accountStatmentFilter.fromDate = moment().format();
    accountStatmentFilter.toDate = moment().format();
    console.log("acccountFIlter outside",accountStatmentFilter);
    $scope.accountStatements = function (accountStatmentFilter) {
        console.log("accountStatmentFilter", accountStatmentFilter);
        $scope.pageNo = 1;
        accountStatmentFilter.accessToken = $.jStorage.get("accessToken");
        accountStatmentFilter.page = $scope.pageNo;
        // $scope.resetStatementFilter();
        NavigationService.getAccountStatement(accountStatmentFilter, function (data) {
            console.log(data.data.data);
            $scope.accounts = data.data.data.accounts.results;
            $scope.netProfit = data.data.data.netProfit;
            console.log("netProfit", $scope.netProfit);
        });
    };

    // if($.jStorage.get("accessToken")){
    //     $scope.accountStatements();
    // }
});