myApp.controller('MybetCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/mybet/mybet.html");
    TemplateService.title = "My Bet"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.userId = $.jStorage.get("userId");
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
    $scope.formData = {};
    $scope.formData.fromDate = new Date(moment().format());
    $scope.formData.toDate = new Date(moment().format());
    $scope.formData.time = 'Current';
    $scope.formData.betType = 'Matched';
    $scope.getMyBets = function () {
        $scope.formData.userId = $.jStorage.get("userId");
        NavigationService.apiCallWithData("bet/getMyBets", $scope.formData, function (data) {
            if (data.value) {
                $scope.myBetList = data.data;
            }
        });
    };
    $scope.getMyBets();

});