"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var language_1 = require("graphql/language");
var moment_1 = __importDefault(require("moment"));
module.exports = {
    Date: new graphql_1.GraphQLScalarType({
        name: 'Date',
        description: 'Date in format yyyy-mm-dd',
        serialize: function (value) { return value && moment_1.default.utc(value).toISOString().split('.')[0] + 'Z'; },
        parseValue: function (value) { return value && moment_1.default.utc(value).hours(12); },
        parseLiteral: function (ast) { return (ast.kind === language_1.Kind.STRING ? moment_1.default.utc(ast.value).hours(12) : null); },
    }),
    Datetime: new graphql_1.GraphQLScalarType({
        name: 'Datetime',
        description: 'ISO 8601 Datetime string',
        serialize: function (value) { return value && moment_1.default.utc(value).toISOString().split('.')[0] + 'Z'; },
        parseValue: function (value) { return value && moment_1.default.utc(value); },
        parseLiteral: function (ast) { return (ast.kind === language_1.Kind.STRING ? moment_1.default.utc(ast.value) : null); },
    }),
    LocalTime: new graphql_1.GraphQLScalarType({
        name: 'LocalTime',
        description: 'LocalTime custom scalar type',
        serialize: function (value) { return String(value); },
        parseValue: function (value) { return String(value); },
        parseLiteral: function (ast) { return (ast.kind === language_1.Kind.STRING ? ast.value : null); },
    }),
};
