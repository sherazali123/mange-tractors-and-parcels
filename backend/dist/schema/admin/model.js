"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseModel_1 = __importDefault(require("../baseModel"));
var Admin_1 = require("../../entity/Admin");
var enum_1 = require("./enum");
var loaders_1 = require("./loaders");
var util_1 = require("../../component/lib/util");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var lodash_1 = require("lodash");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var typeorm_1 = require("typeorm");
var config_1 = __importDefault(require("./../../config"));
var Admin = (function (_super) {
    __extends(Admin, _super);
    function Admin(connection, context) {
        var _this = _super.call(this, connection, connection.getRepository(Admin_1.Admin), context) || this;
        _this.loaders = loaders_1.createLoaders(_this);
        return _this;
    }
    Admin.prototype.resolveParamsToFilters = function (query, params) {
        params = params || {};
        if (params.searchText) {
            params.searchText = "%" + params.searchText + "%";
            query.andWhere("(concat(first_name, ' ', last_name) ILIKE :searchText OR email ILIKE :searchText OR contact_number ILIKE :searchText)");
        }
        if (params.status) {
            query.andWhere('status = :status');
        }
        query.setParameters(params);
        return query;
    };
    Admin.prototype.getByIds = function (ids) {
        if (!ids || (ids && ids.length === 0)) {
            return [];
        }
        return this.repository.find({ where: { id: typeorm_1.In(ids) } });
    };
    Admin.prototype.getByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded;
            return __generator(this, function (_a) {
                if (token) {
                    decoded = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                    if (decoded) {
                        try {
                            if (decoded.id) {
                                return [2, this.getById(decoded.id)];
                            }
                        }
                        catch (error) {
                            throw error;
                        }
                    }
                }
                return [2];
            });
        });
    };
    Admin.prototype.getAll = function (paging, params) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = this.repository.createQueryBuilder();
                query = this.resolveParamsToFilters(query, params);
                query = this.sort(query, [{ field: 'createdAt', order: 'ASC' }]);
                return [2, this.paginator(query, paging)];
            });
        });
    };
    Admin.prototype.loginValidate = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, errorMessage, admin, isSamePassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = [];
                        errorMessage = '';
                        return [4, this.repository
                                .createQueryBuilder()
                                .andWhere('lower(email) = :email')
                                .setParameters({
                                email: input.email.toLowerCase().trim(),
                            })
                                .getOne()];
                    case 1:
                        admin = _a.sent();
                        if (!lodash_1.isEmpty(admin)) return [3, 2];
                        errors.push(enum_1.AdminError.INVALID_CREDENTIALS);
                        return [3, 4];
                    case 2: return [4, bcryptjs_1.default.compare(input.password, admin.password)];
                    case 3:
                        isSamePassword = _a.sent();
                        if (!isSamePassword) {
                            errors.push(enum_1.AdminError.INVALID_CREDENTIALS);
                        }
                        _a.label = 4;
                    case 4: return [2, { errors: errors, data: { admin: admin }, errorMessage: errorMessage }];
                }
            });
        });
    };
    Admin.prototype.login = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, errors, errorMessage, admin, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.loginValidate(input)];
                    case 1:
                        _a = _b.sent(), data = _a.data, errors = _a.errors, errorMessage = _a.errorMessage;
                        if (!lodash_1.isEmpty(errors)) {
                            return [2, this.formatErrors(errors, errorMessage)];
                        }
                        admin = data.admin;
                        delete admin.password;
                        token = util_1.generateAccessToken(JSON.stringify(admin));
                        return [2, { token: token, data: { admin: admin }, errors: errors, errorMessage: '' }];
                    case 2:
                        error_1 = _b.sent();
                        return [2, { errorMessage: error_1.message }];
                    case 3: return [2];
                }
            });
        });
    };
    return Admin;
}(baseModel_1.default));
exports.default = Admin;
