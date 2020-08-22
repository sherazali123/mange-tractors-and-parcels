"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Tractor: {},
    Query: {
        tractor: function (_root, _a, context) {
            var id = _a.id;
            return context.tractor.getById(id);
        },
        tractors: function (_root, _a, context) {
            var paging = _a.paging, params = _a.params;
            return context.tractor.getAll(paging, params);
        },
    },
    Mutation: {
        saveTractor: function (_root, _a, context) {
            var input = _a.input;
            return context.tractor.save(input);
        },
    },
};
