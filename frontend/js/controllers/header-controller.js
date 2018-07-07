myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location, $timeout, $window) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });

    if (!$.jStorage.get("accessToken")) {
        $state.go('login');
    }

    //To handle the reload functionality.
    window.onbeforeunload = function () {
        $.jStorage.flush();
    };

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
    $scope.previousState = [];
    //To get games
    $scope.getGames = function () {
        NavigationService.apiCallWithData('Category/getCategoriesForNavigation', {}, function (data) {
            // console.log(data);
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.gameData = data.data;
                    // console.log("$scope.gameData", $scope.gameData);
                    $scope.visitedCategories.push($scope.gameData);
                    // $scope.setUrl('game', '1');
                    $scope.home = true;
                } else {
                    $scope.gameData = [];
                }
            } else {
                alert("Unable get games");
            }
        });
    };
    $scope.getGames();

    //     });
    // };

    // //To get sub Category
    $scope.getSubCategory = function (value) {
        $state.go('homeInside', {
            game: $scope.game,
            parentId: $scope.parentId
        }, {
            notify: false
        });

        //get match odds on click
        // $scope.getMatchOdds({
        //     game: $scope.game,
        //     parentId: $scope.parentId
        // });

        if (!_.isEmpty(value)) {
            if (!$scope.next) {
                $scope.next = true;
                $scope.previous = false;
            } else {
                $scope.next = false;
                $scope.previous = true;
            }
            $scope.home = false;

            // $scope.previous = false;
            if (!_.isEmpty($scope.subcategory)) {
                $scope.previousState.push($scope.subcategory);
            }

            $scope.subcategory = value;
        }

        // $scope.getMatchByCategory({
        //     'game': $scope.gameId,
        //     'category': $scope.parentId
        // });
        // if (!_.isEmpty($scope.subcategory.children)) {
        //     $scope.categories = $scope.subcategory.children;
        //     // $scope.setUrl($scope.gameId, $scope.parentId);
        //     $scope.visitedCategories.push($scope.categories);
        // }

        // $.jStorage.set("visitedCategories", $scope.visitedCategories);
    };

    $scope.getGameName = function (value) {
        $scope.game = value;
    };

    $scope.getParentId = function (value) {
        $scope.previousParentId = $scope.parentId;
        $scope.parentId = value;
    }


    $scope.getPreviousCategory = function () {

        if (!_.isEmpty($scope.previousState)) {
            if (!$scope.next) {
                $scope.next = true;
                $scope.previous = false;
            } else {
                $scope.next = false;
                $scope.previous = true;
            }
            $scope.subcategory = $scope.previousState[$scope.previousState.length - 1];
            $scope.parentId = $scope.previousParentId;
            $scope.previousState.pop();
            $state.go('homeInside', {
                game: $scope.game,
                parentId: $scope.parentId
            }, {
                notify: false
            });
            // $scope.getMatchOdds({
            //     game: $scope.game,
            //     parentId: $scope.parentId
            // });
        } else {
            $scope.subcategory = [];
            $scope.previousState = [];
            $scope.home = true;
            $scope.next = false;
            $scope.previous = false;
            $state.go('home', {
                notify: false
            });
            // $scope.getMatchOdds({
            //     game: "Cricket"
            // });
        }


    };

    // $scope.getMatchOdds = function (value) {
    //     NavigationService.apiCallWithData('Category/getMarketIds', value, function (data) {
    //         // console.log(data);
    //         if (data.value) {
    //             if (!_.isEmpty(data.data)) {
    //                 // console.log("data.data", data.data);

    //                 // $scope.setUrl('game', '1');
    //             } else {
    //                 $scope.gameData = [];
    //             }
    //         } else {
    //             alert("Unable get games");
    //         }
    //     });
    // };


    // //Go to home menu
    $scope.goTohome = function () {
        $scope.subcategory = [];
        $scope.previousState = [];
        $scope.home = true;
        $scope.next = false;
        $scope.previous = false;
        $state.go('home', {
            notify: false
        });
    };

    // $scope.oneAtATime = true;
    // $.fancybox.close(true);
    // $scope.status = {
    //     isCustomHeaderOpen: false,
    //     isFirstOpen: true,
    //     isFirstDisabled: false
    // };
    // // $scope.currentUrl = $state.current.name;
    // $scope.currentgame = $stateParams.game;
    // $scope.gameId = $stateParams.id;
    // $scope.goback = function () {
    //     window.history.back();
    //     $(".previous-button").addClass("left-menu-inner going-prev");
    // };

});