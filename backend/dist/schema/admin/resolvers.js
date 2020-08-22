"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Admin: {
        fullName: function (_a) {
            var firstName = _a.firstName, lastName = _a.lastName;
            return (firstName + ' ' + (lastName ? lastName : '')).trim();
        },
    },
    Query: {
        admin: function (root, _a, context) {
            var id = _a.id;
            return context.admin.getById(id);
        },
        adminByEmail: function (root, _a, context) {
            var email = _a.email;
            return context.admin.loaders.getByEmail.load(email);
        },
        admins: function (root, _a, context) {
            var paging = _a.paging, params = _a.params;
            return context.admin.getAll(paging, params);
        },
    },
    Mutation: {
        login: function (root, _a, context) {
            var input = _a.input;
            return context.admin.login(input);
        },
    },
};
