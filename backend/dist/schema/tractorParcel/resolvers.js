"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    TractorParcel: {
        tractor: function (_a, args, context) {
            var tractorId = _a.tractorId;
            return context.tractor.getById(tractorId);
        },
        parcel: function (_a, args, context) {
            var parcelId = _a.parcelId;
            return context.parcel.getById(parcelId);
        },
    },
    Query: {
        tractorParcel: function (_root, _a, context) {
            var id = _a.id;
            return context.tractorParcel.getById(id);
        },
        processedParcels: function (_root, _a, context) {
            var paging = _a.paging, params = _a.params;
            return context.tractorParcel.processedParcels(paging, params);
        },
        getActiveTractorsAndParcels: function (_root, _args, context) {
            return context.tractorParcel.getActiveTractorsAndParcels();
        },
    },
    Mutation: {
        saveTractorParcel: function (_root, _a, context) {
            var input = _a.input;
            return context.tractorParcel.save(input);
        },
    },
};
