module.exports = [{
    funcName: "findOne",
    type: "callback",
    cases: [{
            args: [{
                _id: "58543b058f9429cef6a78f9c"
            }],
            expected: [_.isEmpty, function (data) {
                return (_.isObject(data) && data.email == "chintan@wohlig.com");
            }],
            name: "for user already present"
        },
        {
            args: [{
                _id: "58543b058f9429ce96a78f9c"
            }],
            expected: [_.isEmpty, _.isEmpty],
            name: "for not present"
        },
        {
            args: [{
                _id: "b058f9429ce96a78f9c"
            }],
            expected: [_.isObject, _.isEmpty],
            name: "for error request"
        }
    ]
}, {
    funcName: "search",
    type: "callback",
    cases: [{
            args: [{}],
            expected: [_.isEmpty, _.isObject],
            name: "check Search"
        },
        {
            args: [{
                "keyword2": "Ame"
            }],
            expected: [_.isEmpty, _.isEmpty],
            name: "for not present"
        }
    ]
}, {
    funcName: "add",
    type: "return",
    cases: [{
            args: [],
            expected: 0,
            name: "for 0"
        }, {
            args: [1],
            expected: 1,
            name: "for 1"
        }, {
            args: [1, 2],
            expected: 3,
            name: "for 2"
        },
        {
            args: [1, 2, 3],
            expected: 6,
            name: "for 3"
        }
    ]
}];