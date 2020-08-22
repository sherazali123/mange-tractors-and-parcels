import { first } from 'lodash';
import Context from './../context';
import { Admin } from './../../interfaces/admin';
import { AdminFilters, LoginForm } from './../../interfaces/admin';
export default {
  Admin: {
    fullName({ firstName, lastName }: Admin) {
      return (firstName + ' ' + (lastName ? lastName : '')).trim();
    },
  },
  Query: {
    admin(root: Admin, { id }: Admin, context: Context) {
      return context.admin.getById(id);
    },
    adminByEmail(root: Admin, { email }: Admin, context: Context) {
      return context.admin.loaders.getByEmail.load(email);
    },
    admins(root: Admin, { paging, params }: AdminFilters, context: Context) {
      return context.admin.getAll(paging, params);
    },
  },
  Mutation: {
    login(root: Admin, { input }: { input: LoginForm }, context: Context) {
      return context.admin.login(input);
    },
  },
};
