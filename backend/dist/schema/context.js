"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __importDefault(require("./admin/model"));
var model_2 = __importDefault(require("./tractor/model"));
var model_3 = __importDefault(require("./tractorParcel/model"));
var model_4 = __importDefault(require("./parcel/model"));
var Context = (function () {
    function Context(connection, schema, _req, auth) {
        this.auth = auth;
        this.userId = auth ? auth.id : undefined;
        this.schema = schema;
        this.admin = new model_1.default(connection, this);
        this.tractor = new model_2.default(connection, this);
        this.parcel = new model_4.default(connection, this);
        this.tractorParcel = new model_3.default(connection, this);
    }
    return Context;
}());
exports.default = Context;
