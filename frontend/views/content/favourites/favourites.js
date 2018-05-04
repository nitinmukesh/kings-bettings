myApp.controller('FavouritesCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/favourites/favourites.html");
    TemplateService.title = "Favourites"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();

});