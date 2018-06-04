myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, uibDateParser, $stateParams) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.sidemenu2 = "";
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.oneAtATime = true;
    $scope.matches = [];
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $scope.itemArray = [{
            id: 1,
            name: 'first'
        },
        {
            id: 2,
            name: 'second'
        },
        {
            id: 3,
            name: 'third'
        },
        {
            id: 4,
            name: 'fourth'
        },
        {
            id: 5,
            name: 'fifth'
        },
    ];

    $scope.selected = {
        value: $scope.itemArray[0]
    };


    if (!_.isEmpty($.jStorage.get("visitedCategories"))) {
        $scope.visitedCategories = $.jStorage.get("visitedCategories");
    } else {
        $scope.visitedCategories = [];
    }

    //To get games
    $scope.getGames = function () {
        NavigationService.apiCallWithData('Game/getAllGamesAndCategory', {}, function (data) {
            if (data.value) {
                if (!_.isEmpty(data.data)) {
                    $scope.gameData = data.data;
                    $scope.visitedCategories.push($scope.gameData);
                    // $scope.setUrl('game', '1');
                    // $scope.home = true;
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

    $scope.getMatchByCategory = function (data) {
        NavigationService.apiCallWithData('market/getMarketByCategory', data, function (market) {
            $scope.matches = market.data;
        });
    };
    $scope.getMatchByCategory({
        'game': "5afebdc3c35ebd4a630532e6"
    });

    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();


});