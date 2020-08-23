"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var federation_1 = require("@apollo/federation");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var path_1 = __importDefault(require("path"));
var graphql_tools_1 = require("graphql-tools");
var authDirective_1 = __importDefault(require("./directives/authDirective"));
var allTypes = merge_graphql_schemas_1.fileLoader(path_1.default.join(__dirname, './**/*.graphql'));
var allResolvers = merge_graphql_schemas_1.fileLoader(path_1.default.join(__dirname, './**/resolvers.*'));
var mergedResolvers = merge_graphql_schemas_1.mergeResolvers(allResolvers);
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), allTypes.join('\n'));
exports.default = graphql_tools_1.mergeSchemas({
    schemas: [
        federation_1.buildFederatedSchema([
            {
                typeDefs: typeDefs,
                resolvers: mergedResolvers,
            },
        ]),
    ],
    schemaDirectives: {
        requireAuth: authDirective_1.default,
    },
});
var templateObject_1;
