<<<<<<< HEAD
myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService) {
=======
myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, $uibModal) {
>>>>>>> 323829d48a75c0babfc2ceefd69e3263d42026c4
    $scope.template = TemplateService;
    console.log("in header controller header");
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });

    if (!$.jStorage.get("accessToken")) {
        $state.go('login');
    }

<<<<<<< HEAD
    //To get games
    $scope.getGames = function () {
        NavigationService.apiCallWithData('Game/getAllGamesAndCategory', {}, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.gameData = data.data;
                } else {
                    $scop.gameData = [];
                }
            } else {
                alert("Unable get games");
            }
        });
    };

    // Onload function call
    $scope.getGames();

    //To get categories
    $scope.getCategories = function (value) {
        $scope.categories = _.find($scope.gameData, function (game) {
            if (game._id == value) {
                var category = game.category;
                return category;
            }

        });
        console.log("$scope.categories", $scope.categories);
    };
=======
>>>>>>> 323829d48a75c0babfc2ceefd69e3263d42026c4

    $scope.oneAtATime = true;
    $.fancybox.close(true);
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
    $scope.currentUrl = $state.current.name;
    $scope.currentgame = $stateParams.game;
    $scope.gameId = $stateParams.id;
    $scope.goback = function () {
        window.history.back();
        $(".previous-button").addClass("left-menu-inner going-prev");
    };

    $scope.submenu = {
        cricket: {
            sport: "cricket",
            name: "cricket",
            class: "cricket-class",
            tournament: [{
                name: "ipl",
                matches: [{
                    name: "Delhi Daredevils v Sunrisers Hyderabad",
                    fixtures: [{
                        name: "Fixtures",
                        submatches: [{

                        }]
                    }]
                }]
            }]
        },
        football: {
            sport: "football",
            name: "football",
            class: "football-class",
            tournament: [{
                name: "English Football",
                matches: [{
                    name: "English Premier League",
                    fixtures: [{
                        name: "Fixtures 10 May",
                        submatches: [{
                            name: "West Ham v Man Utd"
                        }]
                    }]
                }]
            }, {
                name: "German Football",
                matches: [{
                    name: "Bundesliga 1",
                    fixtures: [{
                        name: "Fixtures 12 May",
                        submatches: [{
                            name: "Hertha Berlin v RB Leipzig"
                        }, {
                            name: "Hoffenheim v Dortmund"
                        }, {
                            name: "Schalke v Eintracht Frankfurt"
                        }]
                    }]
                }]
            }]
        },
        horse_racing: {
            sport: "Horse Racing",
            name: "Horse Racing",
            class: "Horse Racing",
            tournament: [{
                name: "Horse Racing",
                matches: [{
                    name: "Delhi Daredevils v Sunrisers Hyderabad",
                    fixtures: [{
                        name: "Fixtures",
                        submatches: [{

                        }]
                    }]
                }]
            }]
        },
    };

    $scope.logout = function () {
        $.jStorage.flush("accessToken");
        $state.go('login');
    };

});