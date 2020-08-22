"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./../../entity/root/enums");
var uuid_1 = require("uuid");
var util_1 = require("./../../component/lib/util");
exports.tractors = function () {
    var data = [];
    for (var i = 0; i < 30; i++) {
        data.push({
            id: uuid_1.v4(),
            name: 'Tractor' + ' - ' + util_1.cryptoRandomString(8),
            status: enums_1.Status.ACTIVE,
        });
    }
    return data;
};
