require('../../config/globals.js');

global.Config = require('../../api/services/Config');


var sinon = require('sinon');
var assert = require('assert');

module.exports = function (name) {
    var allCases = require('../cases/' + name + '.cases');
    var Model = require('../../api/services/' + name);

    describe('Checking ' + name + ' Service', function () {
        _.each(allCases, function (sinCase) {
            describe(sinCase.funcName + "()", function () {
                if (sinCase.type == "callback") {
                    _.each(sinCase.cases, function (test) {
                        it(test.name, function (done) {
                            var testCallback = function () {
                                var retVal = true;
                                var returnArr = [];
                                _.each(arguments, function (arg, index2) {
                                    var testVal = test.expected[index2](arg);
                                    returnArr.push(testVal);
                                    retVal = retVal && testVal;
                                });
                                if (retVal) {
                                    done();
                                } else {
                                    done(returnArr);
                                }
                            };
                            Model.findOne.apply(Model, _.concat(test.args, testCallback));
                        });
                    });
                } else if (sinCase.type == "return") {
                    _.each(sinCase.cases, function (test) {
                        it(test.name, function () {
                            var res = Model[sinCase.funcName].apply(null, test.args);
                            assert.equal(res, test.expected);
                        });
                    });
                }
            });
        });
    });
};