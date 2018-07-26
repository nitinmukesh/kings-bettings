myApp.controller('headerCtrl', function ($scope, $stateParams, TemplateService, $state, NavigationService, $location, $timeout, $window, $rootScope) {
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

    if (!$rootScope.$$listenerCount['innerPage']) {
        $rootScope.$on('innerPage', function () {
            // vm.searchText = $state.params.search;
            $timeout(function () {
                $scope.currentGame = ($location.path()).split('/');
                if ($scope.currentGame[1] != "home" || $scope.currentGame[1] != "login") {

                    console.log("$scope.currentGame", $scope.currentGame);
                    $scope.getPreviousCategory();
                }
            }, 1000);

        });
    }
    // $scope.visitedCategories = [];
    $scope.previousState = [];
    //To get games
    $scope.getGames = function () {
        NavigationService.apiCallWithData('Category/getCategoriesForNavigation', {}, function (data) {
            // console.log(data);
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.gameData = data.data;
                    // $scope.gameData = [{
                    //     "name": "Cricket",
                    //     "children": [{
                    //             "_id": "5b55b662c3ae5c393f72ef42",
                    //             "name": "ICC Cricket World Cup 2019",
                    //             "children": [{
                    //                 "_id": "5b55b664c3ae5c393f72ef53",
                    //                 "name": "ICC Cricket World Cup 2019",
                    //                 children: [{
                    //                     _id: 1,
                    //                     name: "d1",
                    //                     children: [{
                    //                         _id: 4,
                    //                         name: "d4"
                    //                     }, {
                    //                         _id: 5,
                    //                         name: "d5"
                    //                     }, {
                    //                         _id: 6,
                    //                         name: "d6"
                    //                     }]
                    //                 }, {
                    //                     _id: 2,
                    //                     name: "d2"
                    //                 }, {
                    //                     _id: 3,
                    //                     name: "d3"
                    //                 }]
                    //             }]
                    //         },
                    //         {
                    //             "_id": "5b55b662c3ae5c393f72ef40",
                    //             "name": "Test Matches",
                    //             "children": [{
                    //                 "_id": "5b55b664c3ae5c393f72ef66",
                    //                 "name": "England v India (1st Test)"
                    //             }]
                    //         },
                    //         {
                    //             "_id": "5b55b662c3ae5c393f72ef41",
                    //             "name": "T20 Blast",
                    //             "children": [{
                    //                 "_id": "5b55b66ac3ae5c393f72f02b",
                    //                 "name": "Middlesex v Hampshire"
                    //             }]
                    //         },
                    //         {
                    //             "_id": "5b55b662c3ae5c393f72ef44",
                    //             "name": "Test Series Markets",
                    //             "children": [{
                    //                 "_id": "5b55b664c3ae5c393f72ef6a",
                    //                 "name": "England v India"
                    //             }]
                    //         },
                    //         {
                    //             "_id": "5b55b662c3ae5c393f72ef45",
                    //             "name": "Tamil Nadu Premier League",
                    //             "children": [{
                    //                     "_id": "5b55b668c3ae5c393f72efa0",
                    //                     "name": "Jones TUTI Patriots v Dindigul Dragons"
                    //                 },
                    //                 {
                    //                     "_id": "5b55b668c3ae5c393f72efa1",
                    //                     "name": "Ruby Trichy Warriors v Lyca Kovai Kings"
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             "_id": "5b55b662c3ae5c393f72ef43",
                    //             "name": "The Ashes (Series Markets)",
                    //             "children": [{
                    //                 "_id": "5b55b668c3ae5c393f72efcd",
                    //                 "name": "The Ashes(Series Markets)"
                    //             }]
                    //         },
                    //         {
                    //             "_id": "5b55b662c3ae5c393f72ef46",
                    //             "name": "Caribbean Premier League",
                    //             "children": [{
                    //                 "_id": "5b55b668c3ae5c393f72efce",
                    //                 "name": "Caribbean Premier League"
                    //             }]
                    //         },
                    //         {
                    //             "_id": "5b55b662c3ae5c393f72ef47",
                    //             "name": "Youth One Day Internationals",
                    //             "children": [{
                    //                 "_id": "5b55b668c3ae5c393f72efbf",
                    //                 "name": "England U19 v South Africa U19"
                    //             }]
                    //         },
                    //         {
                    //             "_id": "5b55b662c3ae5c393f72ef48",
                    //             "name": "ICC World Twenty20",
                    //             "children": [{
                    //                 "_id": "5b55b668c3ae5c393f72efc0",
                    //                 "name": "ICC World Twenty20 2020"
                    //             }]
                    //         },
                    //         {
                    //             "_id": "5b56b9ec7ea4dc113022f0f8",
                    //             "name": "One Day Internationals",
                    //             "children": [{
                    //                 "_id": "5b56ba057ea4dc113022f102",
                    //                 "name": "West Indies v Bangladesh (2nd ODI)"
                    //             }]
                    //         },
                    //         {
                    //             "_id": "5b56b9ec7ea4dc113022f0f9",
                    //             "name": "Womens Super League",
                    //             "children": [{
                    //                 "_id": "5b56ba057ea4dc113022f103",
                    //                 "name": "Southern Vipers v Loughborough Lightning"
                    //             }]
                    //         }
                    //     ]
                    // }]
                    // console.log("$scope.gameData >>>>>>>>>>>>", $scope.gameData);
                    // console.log("$scope.gameData", $scope.gameData);
                    // $scope.visitedCategories.push($scope.gameData);
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


        //get match odds on click
        // $scope.getMatchOdds({
        //     game: $scope.game,
        //     parentId: $scope.parentId
        // });
        if (!_.isEmpty(value)) {

            $state.go('homeInside', {
                game: $scope.game,
                parentId: $scope.parentId
            }, {
                notify: false
            });

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
    };

    $scope.getGameName = function (value) {
        $scope.game = value;
    };

    $scope.getParentId = function (value) {
        $scope.previousParentId = $scope.parentId;
        $scope.parentId = value;
    }

    function find1(array, id) {
        if (typeof array != 'undefined') {
            for (var i = 0; i < array.length; i++) {
                if (array[i]._id == id) {
                    return [id];
                }
                var a = find1(array[i].children, id);
                if (a != null) {
                    a.unshift(array[i]._id);
                    return a;
                }
            }
        }
        return null;
    };

    $scope.getPreviousCategory = function (data) {
        $scope.test = [];
        var game = $scope.currentGame[1];
        var parent = $scope.currentGame[3];
        //find parent of parent 
        console.log("game>>>>>>>>>", game, "parent>>>>>>>>>>>>", parent);
        var eventType = _.find($scope.gameData, function (singleGame) {
            return singleGame.name == game;
        });

        console.log("eventType>>>>>>>>", eventType);

        $scope.test = find1(eventType.children, parent);
        $scope.demo = _(eventType.children).thru(function (coll) {
            return _.union(coll, _.map(coll, 'children'));
        }).flatten().find({
            _id: $scope.test[$scope.test.length - 2]
        });
        console.log("$scope.demo>>>>>>>.", $scope.demo);
        $scope.subcategory = $scope.demo.children;
        $state.go('homeInside', {
            game: game,
            parentId: $scope.demo._id
        }, {
            notify: false
        });
    };

    // $scope.getPreviousCategory = function (data) {
    //     $scope.test = [];
    //     var game = $scope.currentGame[1];
    //     var parent = $scope.currentGame[3];
    //     //find parent of parent 
    //     console.log("game>>>>>>>>>", game, "parent>>>>>>>>>>>>", parent);
    //     var eventType = _.find($scope.gameData, function (singleGame) {
    //         return singleGame.name == game;
    //     });

    //     console.log("eventType>>>>>>>>", eventType);

    //     // console.log("find parent", find1(eventType.children, "5b55b662c3ae5c393f72ef42"));
    //     $scope.test = find1(eventType.children, parent);
    //     console.log("$scope.test>>>>>>>.", $scope.test);
    //     if ($scope.test.length == 1) {
    //         _.each($scope.gameData, function (n) {
    //             if (n.name == game) {
    //                 $scope.subcategory = n.children;
    //             }
    //         });
    //     } else {
    //         $scope.demo = _(eventType.children).thru(function (coll) {
    //             return _.union(coll, _.map(coll, 'children'));
    //         }).flatten().find({
    //             _id: $scope.test[$scope.test.length - 1]
    //         });
    //         console.log("$scope.demo>>>>>>>.", $scope.demo);
    //         $scope.subcategory = $scope.demo.children;
    //         // $state.go('homeInside', {
    //         //     game: $scope.game,
    //         //     parentId: $scope.demo._id
    //         // }, {
    //         //     notify: false
    //         // });
    //         // console.log("demo>>>>>>>>>>>>>>>>>>>>.", demo);
    //     }

    //     $scope.home = false;
    //     $scope.next = true;
    //     $state.go('detailPage', {
    //         game: game,
    //         parentId: $scope.demo._id
    //     }, {
    //         notify: false
    //     });


    //     // if (!_.isEmpty($scope.previousState)) {
    //     //     if (!$scope.next) {
    //     //         $scope.next = true;
    //     //         $scope.previous = false;
    //     //     } else {
    //     //         $scope.next = false;
    //     //         $scope.previous = true;
    //     //     }
    //     //     $scope.subcategory = $scope.previousState[$scope.previousState.length - 1];
    //     //     $scope.parentId = $scope.previousParentId;
    //     //     $scope.previousState.pop();
    //     //     $state.go('homeInside', {
    //     //         game: $scope.game,
    //     //         parentId: $scope.parentId
    //     //     }, {
    //     //         notify: false
    //     //     });
    //     //     // $scope.getMatchOdds({
    //     //     //     game: $scope.game,
    //     //     //     parentId: $scope.parentId
    //     //     // });
    //     // } else {
    //     //     $scope.subcategory = [];
    //     //     $scope.previousState = [];
    //     //     $scope.home = true;
    //     //     $scope.next = false;
    //     //     $scope.previous = false;
    //     //     $state.go('home', {
    //     //         notify: false
    //     //     });
    //     //     // $scope.getMatchOdds({
    //     //     //     game: "Cricket"
    //     //     // });
    //     // }

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

});