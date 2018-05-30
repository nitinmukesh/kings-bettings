myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location, $timeout) {
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
    $scope.home = true;
    // if (window.location.pathname == '/home/1') {
    //     $scope.home = true;
    // }
    // alert("header controller");
    // $scope.setUrl = function (value1, value2) {
    //     // $location.path('/' + value1 + '/' + value2, false);
    //     $state.go('home', {
    //         game: value1,
    //         parentId: value2
    //     }, {
    //         notify: false
    //     });
    // };

    $scope.visitedCategories = [];
    //To get games
    $scope.getGames = function () {
        NavigationService.apiCallWithData('Game/getAllGamesAndCategory', {}, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.gameData = data.data;
                    $scope.visitedCategories.push($scope.gameData);
                    // $scope.setUrl('game', '1');
                    $scope.home = true;
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
    $scope.getMatchByCategory = function (data) {
        NavigationService.apiCallWithData('market/getMarketByCategory', data, function (market) {

        });
    };

    //To get categories
    $scope.getCategories = function (value) {
        $scope.currentUrl = "test";
        $scope.home = false;
        $scope.next = true;
        $scope.previous = false;
        $scope.categories = _.find($scope.gameData, function (game) {
            if (game._id == value) {
                $scope.game = game.name;
                $scope.gameId = game._id;
                return game;
            }
        });
        $scope.game = $scope.categories.name;
        $scope.getMatchByCategory({
            'game': $scope.gameId
        });
        $scope.categories = $scope.categories.category;
        // $scope.setUrl($scope.gameId, '1');
        $scope.visitedCategories.push($scope.categories);
        // $.jStorage.set("visitedCategories", $scope.visitedCategories);
    };

    //To get sub Category
    $scope.getSubCategory = function (value) {
        $scope.home = false;
        $scope.next = true;
        $scope.previous = false;
        $scope.subcategory = _.find($scope.categories, function (game) {
            if (game._id == value) {
                $scope.parentId = game._id;
                return game;
            }
        });
        $scope.getMatchByCategory({
            'game': $scope.gameId,
            'category': $scope.parentId
        });
        if (!_.isEmpty($scope.subcategory.children)) {
            $scope.categories = $scope.subcategory.children;
            // $scope.setUrl($scope.gameId, $scope.parentId);
            $scope.visitedCategories.push($scope.categories);
        }

        // $.jStorage.set("visitedCategories", $scope.visitedCategories);
    };


    $scope.getPreviousCategory = function () {
        $scope.visitedCategories.pop();
        $scope.categories = $scope.visitedCategories[$scope.visitedCategories.length - 1];
        if ($scope.visitedCategories.length == 1) {
            $scope.home = true;
            $scope.next = false;
            $scope.previous = false;
            // $scope.setUrl('home', '1');
        } else {
            $scope.home = false;
            $scope.next = false;
            $scope.previous = true;
            $scope.parentId = $scope.categories[0].parentCategory;
            if ($scope.parentId == undefined)
                $scope.parentId = 1;
            $scope.gameId = $scope.categories[0].game;
            // $scope.setUrl($scope.gameId, $scope.parentId);
        }
    };


    //Go to home menu
    $scope.goTohome = function () {
        $scope.home = true;
        $scope.next = false;
        $scope.previous = false;
    };

    $scope.oneAtATime = true;
    $.fancybox.close(true);
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
    // $scope.currentUrl = $state.current.name;
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