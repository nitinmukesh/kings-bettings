myApp.controller('rightSideMenuCtrl', function ($scope, $rootScope, $stateParams, TemplateService, BetService, $state, $uibModal) {
    $scope.BetService = BetService;
    $scope.betConfirm = function () {

        $scope.betconfirm = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/betconfirm.html",
            scope: $scope,
            size: 'md',
        });
    };
    $scope.removeAllBets = function () {

    };

});