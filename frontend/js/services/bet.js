var adminurl = adminUUU + '/api/';
io.sails.url = adminUUU;
io.sails.autoConnect = false;

myApp.service('BetService', function () {
    this.betList = [];
    this.setBet = function (bet) {
        this.betList.unshift(bet);
        console.log(this.betList);
    };

});