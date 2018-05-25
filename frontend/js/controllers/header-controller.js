myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });

    if (!$.jStorage.get("accessToken")) {
        $state.go('login');
    }

    // if (!_.isEmpty($.jStorage.get("visitedCategories"))) {
    //     $scope.visitedCategories = $.jStorage.get("visitedCategories");
    // } else {
    //     $scope.visitedCategories = [];
    // }

    $scope.visitedCategories = [];

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
        $scope.currentUrl = "test";

        $scope.categories = _.find($scope.gameData, function (game) {
            if (game._id == value) {
                $scope.game = game.name;
                $scope.gameId = game._id;
                return game;
            }
        });
        $scope.game = $scope.categories.name;
        $scope.categories = $scope.categories.category;
        $location.path('/' + $scope.gameId + '/' + $scope.parentId, false);
        $scope.visitedCategories.push($scope.categories);
        // $.jStorage.set("visitedCategories", $scope.visitedCategories);
    };

    //To get sub Category
    $scope.getSubCategory = function (value) {
        $scope.subcategory = _.find($scope.categories, function (game) {
            if (game._id == value) {
                $scope.parentId = game._id;
                return game;
            }
        });
        $scope.categories = $scope.subcategory.children;
        $location.path('/' + $scope.gameId + '/' + $scope.parentId, false);
        $scope.visitedCategories.push($scope.categories);
        // $.jStorage.set("visitedCategories", $scope.visitedCategories);
    };



    $scope.getPreviousCategory = function () {
        $scope.visitedCategories.pop();
        $scope.categories = $scope.visitedCategories[$scope.visitedCategories.length - 1];
    };

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
    $location

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