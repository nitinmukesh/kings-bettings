myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, uibDateParser, $stateParams) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.sidemenu2 = "";
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.oneAtATime = true;
    // alert("home");
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


    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();


});