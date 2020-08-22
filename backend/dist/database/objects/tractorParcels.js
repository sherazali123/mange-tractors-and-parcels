"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tractorParcels = void 0;
var uuid_1 = require("uuid");
var moment_1 = __importDefault(require("moment"));
exports.tractorParcels = function (tractors, parcels) {
    var data = [];
    var startProcessingFromDate = moment_1.default().subtract(20, 'days');
    for (var i = 0; i < tractors.length; i++) {
        var tractorId = tractors[0].id;
        var processParcels = 10;
        if (parcels.length <= 0) {
            break;
        }
        for (var j = 0; j < processParcels; j++) {
            var parcel = parcels[0];
            data.push({
                id: uuid_1.v4(),
                tractorId: tractorId,
                parcelId: parcel.id,
                processOn: startProcessingFromDate.add(i, 'days').toDate(),
                area: parcel.area,
                geoLocation: parcel.geoLocation,
            });
        }
        parcels = parcels.splice(processParcels);
    }
    return data;
};
