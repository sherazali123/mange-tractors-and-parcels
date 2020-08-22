import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import config from '../../config';

const { disableAuthAccess } = config;

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args: any) {
      const [, , context] = args;
      if (disableAuthAccess) {
        return resolve.apply(this, args);
      }
      if (!context.auth) {
        throw new Error('Authentication required !');
      }
      return resolve.apply(this, args);
    };
  }
}
