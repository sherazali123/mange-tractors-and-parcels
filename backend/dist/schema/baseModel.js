"use strict";
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
var lodash_1 = require("lodash");
var typeorm_1 = require("typeorm");
var dataloader_1 = __importDefault(require("dataloader"));
var BaseModel = (function () {
    function BaseModel(connection, repository, context) {
        var _this = this;
        this.connection = connection;
        this.repository = repository;
        this.context = context;
        this._idLoader = new dataloader_1.default(function (ids) { return __awaiter(_this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.find({
                            id: typeorm_1.In(ids),
                        })];
                    case 1:
                        items = _a.sent();
                        return [2, lodash_1.map(ids, function (id) { return lodash_1.find(items, { id: id }); })];
                }
            });
        }); });
    }
    BaseModel.prototype.getById = function (id) {
        if (!id)
            return null;
        return lodash_1.isArray(id) ? this._idLoader.loadMany(id) : this._idLoader.load(id);
    };
    BaseModel.prototype.getSortedTable = function () {
        return this.repository.find({
            order: {
                createdAt: 'ASC',
            },
        });
    };
    BaseModel.prototype.getOneByField = function (field, value) {
        if (!field || !value) {
            return null;
        }
        var where = {};
        where[field] = value;
        return this.repository.findOne({ where: where });
    };
    BaseModel.prototype.getAllByField = function (field, value) {
        if (!field || !value) {
            return null;
        }
        var where = {};
        where[field] = value;
        return this.repository.find({ where: where });
    };
    BaseModel.prototype.rawPaginator = function (paging) {
        paging.page--;
        var offset;
        if (paging.limit < 0) {
            paging.limit = 10;
        }
        if (paging.page <= 0) {
            offset = 0;
        }
        else {
            offset = paging.page * paging.limit;
        }
        paging.page++;
        return "limit " + paging.limit + " offset " + offset;
    };
    BaseModel.prototype.paginator = function (query, paging) {
        return __awaiter(this, void 0, void 0, function () {
            var queryBuilder, list, _a, _b, _c, dataLength;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        queryBuilder = query;
                        list = [];
                        if (!paging) return [3, 3];
                        paging.page--;
                        if (paging.page < 0) {
                            paging.page = 0;
                        }
                        if (paging.limit < 0) {
                            paging.limit *= -1;
                        }
                        if (paging.page < 0) {
                            paging.page;
                        }
                        _a = paging;
                        _c = (_b = Math).ceil;
                        return [4, query.getCount()];
                    case 1:
                        _a.totalPages = _c.apply(_b, [(_d.sent()) / paging.limit]);
                        return [4, queryBuilder
                                .skip(paging.page * paging.limit)
                                .take(paging.limit)
                                .getMany()];
                    case 2:
                        list = _d.sent();
                        return [3, 6];
                    case 3: return [4, query.getCount()];
                    case 4:
                        dataLength = _d.sent();
                        paging = {
                            totalPages: 1,
                            page: 1,
                            limit: dataLength,
                        };
                        return [4, queryBuilder.getMany()];
                    case 5:
                        list = _d.sent();
                        _d.label = 6;
                    case 6: return [2, { list: list, paging: paging }];
                }
            });
        });
    };
    BaseModel.prototype.sort = function (query, sort) {
        lodash_1.forEach(sort, function (s) {
            var alias = s.alias ? s.alias : '';
            var fieldName = lodash_1.snakeCase(s.field);
            if (alias) {
                fieldName = alias + '.' + fieldName;
            }
            query.orderBy(fieldName, s.order);
        });
        return query;
    };
    BaseModel.prototype.formatErrors = function (errors, errorMessage) {
        return { error: errors[0], errors: errors, errorMessage: errorMessage };
    };
    return BaseModel;
}());
exports.default = BaseModel;
