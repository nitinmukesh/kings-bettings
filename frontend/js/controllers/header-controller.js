myApp.controller('headerCtrl', function ($scope, TemplateService, $state) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $.fancybox.close(true);
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
    $scope.currentUrl = $state.current.name;
    $scope.goback = function () {
        window.history.back();
    }
    $scope.submenu = [{
        sport: "cricket",
        name: "cricket",
        class: "cricket-class",
        tournament: [{
            name: "ipl",
            matches: [{
                name: "Delhi Daredevils v Sunrisers Hyderabad",
                Fixtures: [{
                    name: "Fixtures",
                    submatches: [{

                    }]
                }]
            }]
        }]
    }, {

    }]
});