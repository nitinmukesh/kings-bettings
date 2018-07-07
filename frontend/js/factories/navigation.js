var adminurl = adminUUU;
// adminurl = adminurl + "/api/";
adminUUU = "http://localhost:1338/"
// adminurl = "http://localhost:1337/api/"
adminurl = "http://192.168.1.107:1337/api/"
io.sails.url = adminUUU;
io.sails.autoConnect = false;
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

        userLogin: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        apiCallWithData: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                // console.log('data', data);
                data = data.data;
                callback(data);
            });
        },
        getMatchOddsData: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                console.log('data', data);
                data = data.data;
                callback(data);
            });
        },

        calculateBet: function (formData, callback) {
            $http.post("http://192.168.1.107:1337/api/SportsBook/loseMoney", formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        }
    };
});