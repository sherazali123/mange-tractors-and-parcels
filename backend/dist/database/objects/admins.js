"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../component/lib/util");
var enums_1 = require("./../../entity/root/enums");
exports.admins = function (defaultUser) { return [
    __assign(__assign({}, defaultUser), {
        password: util_1.createPasswordFromString(defaultUser.password ? defaultUser.password : '123456'),
        status: enums_1.Status.ACTIVE,
    }),
]; };
