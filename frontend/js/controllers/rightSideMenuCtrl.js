myApp.controller('rightSideMenuCtrl', function ($scope, $stateParams, TemplateService, $state, $uibModal) {
    $scope.betConfirm = function () {

        $scope.betconfirm = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/betconfirm.html",
            scope: $scope,
            size: 'md',
        });
    }


});