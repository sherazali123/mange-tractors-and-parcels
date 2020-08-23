"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Parcel: {},
    Query: {
        parcel: function (_root, _a, context) {
            var id = _a.id;
            return context.parcel.getById(id);
        },
        parcels: function (_root, _a, context) {
            var paging = _a.paging, params = _a.params;
            return context.parcel.getAll(paging, params);
        },
    },
    Mutation: {
        saveParcel: function (_root, _a, context) {
            var input = _a.input;
            return context.parcel.save(input);
        },
    },
};
