// Link all the JS Docs here
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'angularPromiseButtons',
    'toastr'
]);

// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL

    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: tempateURL,
            controller: 'HomeCtrl'
        })
        .state('placebet', {
            url: "/placebet",
            templateUrl: tempateURL,
            controller: 'PlaceBetCtrl'
        })
        .state('account-statement', {
            url: "/account-statement",
            templateUrl: tempateURL,
            controller: 'AccountStatementCtrl'
        })
        .state('mybet', {
            url: "/mybet",
            templateUrl: tempateURL,
            controller: 'MybetCtrl'
        })
        .state('cricket', {
            url: "/cricket",
            templateUrl: tempateURL,
            controller: 'CricketCtrl'
        })
        .state('cricket-inner', {
            url: "/cricket-inner",
            templateUrl: tempateURL,
            controller: 'CricketinnerCtrl'
        })
        .state('football', {
            url: "/football",
            templateUrl: tempateURL,
            controller: 'FootballCtrl'
        })
        .state('football-inner', {
            url: "/football-inner",
            templateUrl: tempateURL,
            controller: 'FootballinnerCtrl'
        })
        .state('football-country', {
            url: "/football-country",
            templateUrl: tempateURL,
            controller: 'FootballcountryCtrl'
        })

        .state('football-league', {
            url: "/football-league",
            templateUrl: tempateURL,
            controller: 'FootballleagueCtrl'
        })
        .state('football-fixtures', {
            url: "/football-fixtures",
            templateUrl: tempateURL,
            controller: 'FootballFixturesCtrl'
        })

        .state('ipl', {
            url: "/ipl",
            templateUrl: tempateURL,
            controller: 'IplCtrl'
        })
        .state('tennis', {
            url: "/tennis",
            templateUrl: tempateURL,
            controller: 'TennisCtrl'
        })
        .state('tennis-inner', {
            url: "/tennis-inner",
            templateUrl: tempateURL,
            controller: 'TennisinnerCtrl'
        })
        .state('tennis-tournament', {
            url: "/tennis-tournament",
            templateUrl: tempateURL,
            controller: 'TennisinnerCtrl'
        })

        .state('ipl-inner', {
            url: "/ipl-inner",
            templateUrl: tempateURL,
            controller: 'IplInnerCtrl'
        })
        .state('horse-racing', {
            url: "/horse-racing",
            templateUrl: tempateURL,
            controller: 'HorseracingCtrl'
        })
        .state('ipl-winner', {
            url: "/ipl-winner",
            templateUrl: tempateURL,
            controller: 'IplWinnerCtrl'
        })
        .state('favourites', {
            url: "/favourites",
            templateUrl: tempateURL,
            controller: 'FavouritesCtrl'
        })
        .state('links', {
            url: "/links",
            templateUrl: tempateURL,
            controller: 'LinksCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});

// For Language JS
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});