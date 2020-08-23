"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcels = void 0;
var enums_1 = require("../../entity/root/enums");
var uuid_1 = require("uuid");
var faker_1 = __importDefault(require("faker"));
var util_1 = require("../../component/lib/util");
exports.parcels = function () {
    var data = [];
    for (var i = 0; i < 50; i++) {
        var address = faker_1.default.address;
        data.push({
            id: uuid_1.v4(),
            name: 'Parcel' + ' - ' + util_1.cryptoRandomString(8),
            area: address.streetName(),
            culture: address.city(),
            geoLocation: { type: 'Point', coordinates: [parseFloat(address.longitude()), parseFloat(address.latitude())] },
            status: enums_1.Status.ACTIVE,
        });
    }
    return data;
};
