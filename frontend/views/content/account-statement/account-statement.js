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
    console.log("acccountFIlter outside", accountStatmentFilter);
    $scope.accountStatements = function (accountStatmentFilter) {
        console.log("accountStatmentFilter", accountStatmentFilter);
        $scope.pageNo = 1;
        accountStatmentFilter.accessToken = $.jStorage.get("accessToken");
        accountStatmentFilter.page = $scope.pageNo;
        // $scope.resetStatementFilter();
        NavigationService.getAccountStatement(accountStatmentFilter, function (data) {
            console.log(data.data.data);
            $scope.accounts = _.concat(data.data.data.accounts.results, data.data.data.creditLimitLogs.results);
            // _.sortBy($scope.accounts, ['createdAt']);
            $scope.accounts.sort(function (a, b) {
                return (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0);
            });
            $scope.netProfit = data.data.data.netProfit;
            console.log("netProfit", $scope.netProfit);
        });
    };

    $scope.getBetList = function (data) {
        if (data.selectionName) {
            data.id = $.jStorage.get("userId");;
            data.marketId = data.marketId;
            data.page = 1;

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
        }
    };

    $scope.getUserBook = function () {
        var data = {
            user: globalStorage.get("profile")._id,
            marketId: $scope.marketId
        };
        NavigationService.getUserBook(data, function (data) {
            // console.log(data);
            if (data.data.data) {
                $scope.user = globalStorage.get("profile");
                var books = data.data.data;
                books.horse = _.sortBy(books.horse, ['sortPriority']);
                $scope.user.book = books;
                $scope.horseno = $scope.user.book.horse.length;
                console.log("HORSEOK", $scope.horseno);
                if (!$scope.horseno) {
                    $scope.horseno = 3;
                }
                $scope.user.children = undefined;
                console.log("getUserBook");
                console.log($scope.user);
            } else {
                console.log("error");
            }
        });
    };

    // if($.jStorage.get("accessToken")){
    //     $scope.accountStatements();
    // }
});