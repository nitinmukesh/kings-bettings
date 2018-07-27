// var adminurl = adminUUU;
// adminurl = adminurl + "/api/";
adminUUU = "https://rates.kingsplay.co/"; //socket betfair
sportsSocket = "https://sportsbookb.kingsplay.co/";
// sportsSocket = "http://192.168.2.30:1337/";
// sportsSocket = "http://192.168.43.8:1337/";
adminurl = sportsSocket + "api/"; //sports book
mainServer = "https://test.kingsplay.co/"; //main server
// mainServer = "http://kingplay.online/"; //main server
// mainServer = "http://192.168.2.31:1337/"; //main server
// adminurl = "http://192.168.1.107:1337/api/"
io.sails.url = adminUUU;
io.sails.autoConnect = false;
myApp.factory('NavigationService', function ($http, $q, $log, $timeout) {

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
        apiCallWithUrl: function (url, formData, callback) {
            $http.post(url, formData).then(function (data) {
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
        },

        success: function () {
            var defer = $q.defer();
            $timeout(function () {
                $log.info('resolve');
                defer.resolve({
                    msg: 'SUCCESS'
                });
            }, 1000);
            return defer.promise;
        },
    };
});