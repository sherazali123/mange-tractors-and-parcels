"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var crypto_1 = __importDefault(require("crypto"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("./../../config"));
var saltSound = 15;
exports.transformToSnakeCase = function (data) {
    var snakeCaseObj = function (obj) {
        var dataWithSnakeCase = lodash_1.mapKeys(obj, function (value, key) { return lodash_1.snakeCase(key); });
        lodash_1.keys(obj).forEach(function (key) {
            delete obj[key];
        });
        lodash_1.keys(dataWithSnakeCase).forEach(function (key) {
            obj[key] = dataWithSnakeCase[key];
        });
        return obj;
    };
    return lodash_1.isArray(data) ? lodash_1.map(data, snakeCaseObj) : snakeCaseObj(data);
};
exports.cryptoRandomString = function (length) {
    if (!Number.isFinite(length)) {
        throw new TypeError('Expected a finite number');
    }
    return crypto_1.default
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};
exports.createPasswordFromString = function (string) {
    return bcryptjs_1.default.hashSync(string);
};
exports.generateAccessToken = function (user) {
    return jsonwebtoken_1.default.sign(user, config_1.default.tokenSecret);
};
