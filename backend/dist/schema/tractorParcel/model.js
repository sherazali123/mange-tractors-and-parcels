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
var TractorParcel_1 = require("../../entity/TractorParcel");
var Parcel_1 = require("../../entity/Parcel");
var enum_1 = require("./enum");
var loaders_1 = require("./loaders");
var lodash_1 = require("lodash");
var typeorm_1 = require("typeorm");
var moment_1 = __importDefault(require("moment"));
var TractorParcel = (function (_super) {
    __extends(TractorParcel, _super);
    function TractorParcel(connection, context) {
        var _this = _super.call(this, connection, connection.getRepository(TractorParcel_1.TractorParcel), context) || this;
        _this.loaders = loaders_1.createLoaders(_this);
        return _this;
    }
    TractorParcel.prototype.resolveParamsToFilters = function (query, params) {
        params = params || {};
        if (params.parcelName) {
            params.parcelName = "%" + params.parcelName + "%";
            query.andWhere('parcel.name ILIKE :parcelName');
        }
        if (params.culture) {
            params.culture = "%" + params.culture + "%";
            query.andWhere('parcel.culture ILIKE :culture');
        }
        if (params.date) {
            params.date = moment_1.default(params.date).format('YYYY-MM-DD');
            query.andWhere("TO_CHAR(tractorParcel.processOn, 'YYYY-MM-DD')  = :date");
        }
        if (params.tractorName) {
            params.tractorName = "%" + params.tractorName + "%";
            query.andWhere('tractor.name ILIKE :tractorName');
        }
        query.setParameters(params);
        return query;
    };
    TractorParcel.prototype.getByIds = function (ids) {
        if (!ids || (ids && ids.length === 0)) {
            return [];
        }
        return this.repository.find({ where: { id: typeorm_1.In(ids) } });
    };
    TractorParcel.prototype.processedParcels = function (paging, params) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = this.repository.createQueryBuilder('tractorParcel');
                query.innerJoin('tractorParcel.tractor', 'tractor');
                query.innerJoin('tractorParcel.parcel', 'parcel');
                query = this.resolveParamsToFilters(query, params);
                query.orderBy('tractorParcel.createdAt', 'DESC');
                return [2, this.paginator(query, paging)];
            });
        });
    };
    TractorParcel.prototype.isParcelInRadius = function (parcel, coordinates) {
        return __awaiter(this, void 0, void 0, function () {
            var inRadius;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.connection
                            .getRepository(Parcel_1.Parcel)
                            .createQueryBuilder()
                            .andWhere('id = :id')
                            .andWhere('ST_DWithin(geo_location, ST_MakePoint(:longitude, :latitude)::geography, 20000)')
                            .setParameters({ id: parcel.id, longitude: coordinates[0], latitude: coordinates[1] })
                            .getOne()];
                    case 1:
                        inRadius = _a.sent();
                        return [2, inRadius ? true : false];
                }
            });
        });
    };
    TractorParcel.prototype.getByTractorAndParcelId = function (tractorId, parcelId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.repository.findOne({ where: { tractorId: tractorId, parcelId: parcelId }, order: { createdAt: 'ASC' } })];
            });
        });
    };
    TractorParcel.prototype.saveValidate = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, errorMessage, tractorParcel, tractor, parcel, alreadyExists, isParcelInRadius;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = [];
                        errorMessage = '';
                        return [4, this.getById(input.id)];
                    case 1:
                        tractorParcel = _a.sent();
                        return [4, this.context.tractor.getById(input.tractorId)];
                    case 2:
                        tractor = _a.sent();
                        return [4, this.context.parcel.getById(input.parcelId)];
                    case 3:
                        parcel = _a.sent();
                        if (!lodash_1.isEmpty(input.id) && !tractorParcel) {
                            errors.push(enum_1.TractorParcelError.INVALID_ID);
                        }
                        if (lodash_1.isEmpty(tractor)) {
                            errors.push(enum_1.TractorParcelError.INVALID_TRACTOR_ID);
                        }
                        return [4, this.getByTractorAndParcelId(tractor.id, parcel.id)];
                    case 4:
                        alreadyExists = _a.sent();
                        if (alreadyExists && alreadyExists.id !== input.id) {
                            errors.push(enum_1.TractorParcelError.ALREADY_PROCESSED);
                        }
                        if (lodash_1.isEmpty(parcel)) {
                            errors.push(enum_1.TractorParcelError.INVALID_PARCEL_ID);
                        }
                        return [4, this.isParcelInRadius(parcel, [
                                input.longitude ? input.longitude : 0,
                                input.latitude ? input.latitude : 0,
                            ])];
                    case 5:
                        isParcelInRadius = _a.sent();
                        if (!isParcelInRadius) {
                            errors.push(enum_1.TractorParcelError.OUT_OF_RANGE);
                        }
                        return [2, { errors: errors, data: { tractorParcel: tractorParcel }, errorMessage: errorMessage }];
                }
            });
        });
    };
    TractorParcel.prototype.save = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, errors, errorMessage, tractorParcel_1, transaction, error_1;
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
                        tractorParcel_1 = data.tractorParcel;
                        return [4, this.connection.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (lodash_1.isEmpty(tractorParcel_1)) {
                                                tractorParcel_1 = new TractorParcel_1.TractorParcel();
                                            }
                                            tractorParcel_1.tractorId = input.tractorId;
                                            tractorParcel_1.parcelId = input.parcelId;
                                            tractorParcel_1.processOn = input.processOn;
                                            tractorParcel_1.area = input.area;
                                            tractorParcel_1.geoLocation = {
                                                type: 'Point',
                                                coordinates: [input.longitude, input.latitude],
                                            };
                                            return [4, transactionalEntityManager.save(tractorParcel_1)];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); })];
                    case 2:
                        transaction = _b.sent();
                        return [2, { data: { tractorParcel: tractorParcel_1 }, errors: errors, errorMessage: '' }];
                    case 3:
                        error_1 = _b.sent();
                        return [2, { errorMessage: error_1.message }];
                    case 4: return [2];
                }
            });
        });
    };
    return TractorParcel;
}(baseModel_1.default));
exports.default = TractorParcel;
