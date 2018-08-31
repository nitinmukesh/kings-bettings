// adminurl = "http://localhost:1337/api/";
// adminurl = "https://sportsbookb.kingsplay.co/";
// io.sails.url = adminUUU;
// io.sails.autoConnect = false;
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
        },
        {
            name: "Links",
            classis: "active",
            anchor: "links",
            subnav: []
        }
    ];

    var betList = [{
        name: "Subnav1",
        classis: "active",
        anchor: "home"
    }];

    function getcsrf() {
        $http.get('http://sportsbookb.kingsplay.co/csrfToken').then(function (data) {
            console.log("data", data);
        });
    }


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
        getUserDetail: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        userSignup: function (url, formData, callback) {
            getcsrf();
            // $http.post(adminurl + url, formData).then(function (data) {
            //     data = data.data;
            //     callback(data);
            // });
        },
        apiCallWithData: function (url, formData, callback) {
            if ($.jStorage.get("accessTokenId")) {
                if (!formData) {
                    formData = {};
                }
                formData.accessTokenId = $.jStorage.get("accessTokenId");
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            }
        },
        placeOrders: function (url, formData, callback) {

            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });

        },
        apiCallWithUrl: function (url, formData, callback) {
            if ($.jStorage.get("accessTokenId")) {
                if (!formData) {
                    formData = {};
                }
                formData.accessTokenId = $.jStorage.get("accessTokenId");
                $http.post(url, formData).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            }
        },
        getMatchOddsData: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },

        getAccountFunds: function (formData, callback) {
            if ($.jStorage.get("accessTokenId")) {
                if (!formData) {
                    formData = {};
                }
                formData.accessTokenId = $.jStorage.get("accessTokenId");
                $http.post(adminurl + 'betfair/getAccountFunds', formData).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            }
        },
        getListCurrentOrders: function (formData, callback) {
            if ($.jStorage.get("accessTokenId")) {
                if (!formData) {
                    formData = {};
                }
                formData.accessTokenId = $.jStorage.get("accessTokenId");
                $http.post(adminurl + 'betfair/getListCurrentOrders', formData).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            }
        },
        betCancelation: function (formData, callback) {
            $http.post(adminurl + 'betfair/cancelOrders', formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },

        myBets: function (formData, callback) {
            if ($.jStorage.get("accessTokenId")) {
                if (!formData) {
                    formData = {};
                }
                formData.accessTokenId = $.jStorage.get("accessTokenId");
                $http.post(adminurl + 'betfair/myBets', formData).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            }

        },
        getMyCurrentOrders: function (formData, callback) {
            if ($.jStorage.get("accessTokenId")) {
                if (!formData) {
                    formData = {};
                }
                formData.accessTokenId = $.jStorage.get("accessTokenId");
                $http.post(adminurl + 'betfair/getMyCurrentOrders', formData).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            }

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

        payNow: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        updateUser: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
    };
});