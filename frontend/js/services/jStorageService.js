myApp.service('jStorageService', function () {
    this.getAccessToken = function () {
        var data = $.jStorage.get("accessToken");
        console.log("data", data);
        // return data.data;
        return "abc1";
    };

    this.getUserId = function () {
        var data = $.jStorage.get("userId");
        console.log("data", data);
        return data.data;
    }

});