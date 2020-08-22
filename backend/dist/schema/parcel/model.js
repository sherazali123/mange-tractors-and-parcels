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
var Parcel_1 = require("../../entity/Parcel");
var enum_1 = require("./enum");
var loaders_1 = require("./loaders");
var lodash_1 = require("lodash");
var typeorm_1 = require("typeorm");
var Parcel = (function (_super) {
    __extends(Parcel, _super);
    function Parcel(connection, context) {
        var _this = _super.call(this, connection, connection.getRepository(Parcel_1.Parcel), context) || this;
        _this.loaders = loaders_1.createLoaders(_this);
        return _this;
    }
    Parcel.prototype.resolveParamsToFilters = function (query, params) {
        params = params || {};
        if (params.searchText) {
            params.searchText = "%" + params.searchText + "%";
            query.andWhere("\n        name ILIKE :searchText \n        OR area ILIKE :searchText \n        OR culture ILIKE :searchText  \n      ");
        }
        if (params.status) {
            query.andWhere('status = :status');
        }
        query.setParameters(params);
        return query;
    };
    Parcel.prototype.getByIds = function (ids) {
        if (!ids || (ids && ids.length === 0)) {
            return [];
        }
        return this.repository.find({ where: { id: typeorm_1.In(ids) } });
    };
    Parcel.prototype.getAll = function (paging, params) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = this.repository.createQueryBuilder();
                query = this.resolveParamsToFilters(query, params);
                query = this.sort(query, [{ field: 'createdAt', order: 'DESC' }]);
                return [2, this.paginator(query, paging)];
            });
        });
    };
    Parcel.prototype.saveValidate = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, errorMessage, parcel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = [];
                        errorMessage = '';
                        return [4, this.getById(input.id)];
                    case 1:
                        parcel = _a.sent();
                        if (!lodash_1.isEmpty(input.id) && !parcel) {
                            errors.push(enum_1.ParcelError.INVALID_ID);
                        }
                        return [2, { errors: errors, data: { parcel: parcel }, errorMessage: errorMessage }];
                }
            });
        });
    };
    Parcel.prototype.save = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, errors, errorMessage, parcel_1, transaction, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4, this.saveValidate(input)];
                    case 1:
                        _a = _b.sent(), data = _a.data, errors = _a.errors, errorMessage = _a.errorMessage;
                        if (!lodash_1.isEmpty(errors)) {
                            return [2, this.formatErrors(errors, errorMessage)];
                        }
                        parcel_1 = data.parcel;
                        return [4, this.connection.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (lodash_1.isEmpty(parcel_1)) {
                                                parcel_1 = new Parcel_1.Parcel();
                                            }
                                            parcel_1.name = input.name;
                                            parcel_1.culture = input.culture;
                                            parcel_1.area = input.area;
                                            parcel_1.geoLocation = {
                                                type: 'Point',
                                                coordinates: [input.longitude ? input.longitude : 0, input.latitude ? input.latitude : 0],
                                            };
                                            parcel_1.status = input.status;
                                            return [4, transactionalEntityManager.save(parcel_1)];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); })];
                    case 2:
                        transaction = _b.sent();
                        return [2, { data: { parcel: parcel_1 }, errors: errors, errorMessage: '' }];
                    case 3:
                        error_1 = _b.sent();
                        return [2, { errorMessage: error_1.message }];
                    case 4: return [2];
                }
            });
        });
    };
    return Parcel;
}(baseModel_1.default));
exports.default = Parcel;
