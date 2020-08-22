import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date in format yyyy-mm-dd',

    // NOTE: serialize date value into string
    serialize: (value) => value && moment.utc(value).toISOString().split('.')[0] + 'Z', // Drop millisecond precision

    // NOTE: parses client value into date
    parseValue: (value) => value && moment.utc(value).hours(12),

    // NOTE: parse ast literal to date
    parseLiteral: (ast) => (ast.kind === Kind.STRING ? moment.utc(ast.value).hours(12) : null),
  }),
  Datetime: new GraphQLScalarType({
    name: 'Datetime',
    description: 'ISO 8601 Datetime string',

    // NOTE: serialize date value into string
    serialize: (value) => value && moment.utc(value).toISOString().split('.')[0] + 'Z', // Drop millisecond precision

    // NOTE: parses client value into date
    parseValue: (value) => value && moment.utc(value),

    // NOTE: parse ast literal to date
    parseLiteral: (ast) => (ast.kind === Kind.STRING ? moment.utc(ast.value) : null),
  }),
  LocalTime: new GraphQLScalarType({
    name: 'LocalTime',
    description: 'LocalTime custom scalar type',

    // NOTE: serialize LocalTime
    serialize: (value) => String(value),

    // NOTE: parses client value into date
    parseValue: (value) => String(value),

    // NOTE: parse ast literal to date
    parseLiteral: (ast) => (ast.kind === Kind.STRING ? ast.value : null),
  }),
};
