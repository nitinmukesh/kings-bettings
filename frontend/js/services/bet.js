var adminurl = adminUUU + '/api/';

myApp.service('BetService', function () {
    this.betList = [];
    this.setBet = function (bet) {
        this.betList.unshift(bet);
        console.log(this.betList);
    };

});