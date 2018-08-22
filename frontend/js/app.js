// Link all the JS Docs here
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap',
    'angularPromiseButtons',
    'toastr',
    'infinite-scroll'
]);

var globalInteval;

// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $qProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL
    var accountTempateURL = "views/template/account-template.html";
    var loginTempateURL = "views/template/login-template.html";
    //Default Template URL
    // for http request with session
    $qProvider.errorOnUnhandledRejections(false);
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            cache: false,
            url: "/home",
            templateUrl: tempateURL,
            controller: 'HomeCtrl'
        })
        .state('homeInside', {
            cache: false,
            url: "/home/:game/:parentId",
            templateUrl: tempateURL,
            controller: 'HomeCtrl'
        })
        .state('detailPage', {
            cache: false,
            url: "/event1/:eventId",
            templateUrl: tempateURL,
            controller: 'DetailPageCtrl'
        })
        .state('login', {
            url: "/login",
            templateUrl: loginTempateURL,
            controller: 'LoginCtrl'
        })
        .state('signup', {
            url: "/signup",
            templateUrl: loginTempateURL,
            controller: 'SignupCtrl'
        })
        .state('subcription', {
            url: "/subcription",
            templateUrl: loginTempateURL,
            controller: 'SubcriptionCtrl'
        })

        // .state('cricket', {
        //     url: "/cricket",
        //     templateUrl: tempateURL,
        //     controller: 'CricketCtrl'
        // })
        .state('cricket-inner', {
            url: "/event/:eventId",
            templateUrl: tempateURL,
            controller: 'CricketinnerCtrl'
        })
        .state('mybet', {
            url: "/mybet",
            templateUrl: tempateURL,
            controller: 'MybetCtrl'
        })
        .state('redirectTo', {
            url: "/redirectTo/:id",
            templateUrl: tempateURL,
            controller: 'RedirectToCtrl'
        })
        .state('thankyou', {
            url: "/thankyou",
            templateUrl: loginTempateURL,
            controller: 'ThankyouCtrl'
        }).state('cancel', {
            url: "/cancel",
            templateUrl: loginTempateURL,
            controller: 'CancelCtrl'
        });
    $urlRouterProvider.otherwise("/home");
    $locationProvider.html5Mode(isproduction);
});

// For Language JS
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});