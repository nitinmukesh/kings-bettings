myApp.controller('ChangepasswordCtrl', function ($scope, toastr, TemplateService, NavigationService) {
    $scope.template = TemplateService.getHTML("content/change-password/change-password.html");
    TemplateService.title = "Change Password"; //This is the Title of the Website
    TemplateService.sidemenu2 = "";
    $scope.navigation = NavigationService.getNavigation();
    $scope.passwordInfo = {};
    $scope.changePassword = function () {
        delete $scope.wrongOldPassword;
        $scope.passwordInfo._id = $.jStorage.get("userId");
        NavigationService.changePassword($scope.passwordInfo, function (data) {
            if (data.value) {
                if (data.data == 'Old password did not match') {
                    $scope.wrongOldPassword = data.data;
                    toastr.error(data.data);
                } else {
                    toastr.success("Password changed successfully!");
                }
            } else {
                toastr.error("Unable to change password");
            }
        });
    }

});