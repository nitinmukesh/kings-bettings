myApp.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Home",
        classis: "active",
        anchor: "home",
        subnav: [{
            name: "Subnav1",
            classis: "active",
            anchor: "home"
        }]
    }, {
        name: "Links",
        classis: "active",
        anchor: "links",
        subnav: []
    }];

    var betList = [{
        name: "Subnav1",
        classis: "active",
        anchor: "home"
    }];

    return {
        getNavigation: function () {
            return navigation;
        },

        apiCallWithData: function (url, formData, callback) {
            var accessToken = $.jStorage.get("accessToken");
            formData.accessToken = accessToken;
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
    };
});