// Models
import BaseModel from '../baseModel';

// Orm entities
import { Admin as AdminEntity } from '../../entity/Admin';

// Load Errors
import { AdminError } from './enum';
import { createLoaders } from './loaders';
import { createPasswordFromString, generateAccessToken } from '../../component/lib/util';
import Context from './../context';
import jwt from 'jsonwebtoken';
// Interfaces
import { Admin as AdminInterface, Params, LoginResponse, LoginForm } from './../../interfaces/admin';
import { PaginatorInput, Validator as ValidatorInterface } from './../../interfaces';

import { Connection } from 'typeorm';
import { isEmpty } from 'lodash';
import bcrypt from 'bcryptjs';
import { In, EntityManager } from 'typeorm';
import config from './../../config';

export default class Admin extends BaseModel {
  repository: any;
  connection: any;
  loaders: any;
  constructor(connection: Connection, context: Context) {
    super(connection, connection.getRepository(AdminEntity), context);
    this.loaders = createLoaders(this);
  }

  resolveParamsToFilters(query: any, params: Params) {
    params = params || {};

    if (params.searchText) {
      params.searchText = `%${params.searchText}%`;
      query.andWhere(
        "(concat(first_name, ' ', last_name) ILIKE :searchText OR email ILIKE :searchText OR contact_number ILIKE :searchText)"
      );
    }
    if (params.status) {
      query.andWhere('status = :status');
    }
    query.setParameters(params);
    return query;
  }

  getByIds(ids: string[]) {
    if (!ids || (ids && ids.length === 0)) {
      return [];
    }
    return this.repository.find({ where: { id: In(ids) } });
  }

  async getByToken(token: string) {
    if (token) {
      let decoded: any = jwt.verify(token, config.tokenSecret);

      if (decoded) {
        try {
          if (decoded.id) {
            return this.getById(decoded.id);
          }
        } catch (error) {
          throw error;
        }
      }
    }
  }

  async getAll(paging: PaginatorInput, params: Params) {
    let query = this.repository.createQueryBuilder();

    query = this.resolveParamsToFilters(query, params);

    query = this.sort(query, [{ field: 'createdAt', order: 'ASC' }]);

    return this.paginator(query, paging);
  }

  async loginValidate(input: LoginForm): Promise<ValidatorInterface> {
    const errors = [];
    let errorMessage = '';

    const admin = await this.repository
      .createQueryBuilder()
      .andWhere('lower(email) = :email')
      // .andWhere('password = :password')
      .setParameters({
        email: input.email.toLowerCase().trim(),
        // password: await createPasswordFromString(input.password),
      })
      .getOne();

    if (isEmpty(admin)) {
      errors.push(AdminError.INVALID_CREDENTIALS);
    } else {
      const isSamePassword = await bcrypt.compare(input.password, admin.password);
      if (!isSamePassword) {
        errors.push(AdminError.INVALID_CREDENTIALS);
      }
    }

    return { errors, data: { admin }, errorMessage };
  }

  async login(input: LoginForm): Promise<LoginResponse> {
    try {
      const { data, errors, errorMessage } = await this.loginValidate(input);
      if (!isEmpty(errors)) {
        return this.formatErrors(errors, errorMessage);
      }

      let { admin } = data;
      delete admin.password;

      const token = generateAccessToken(JSON.stringify(admin));
      return { token, data: { admin }, errors, errorMessage: '' };
    } catch (error) {
      return { errorMessage: error.message };
    }
  }
}
