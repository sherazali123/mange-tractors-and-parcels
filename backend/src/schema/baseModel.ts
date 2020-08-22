import { forEach, snakeCase, map, find, isArray } from 'lodash';
import { In, Connection } from 'typeorm';
import DataLoader from 'dataloader';
import Context from './context';

import { PaginatorInput, Sort } from '../interfaces';

export default class BaseModel {
  repository: any;
  connection: Connection;
  context: Context;
  _idLoader: any;
  constructor(connection: Connection, repository: object, context: Context) {
    this.connection = connection;
    this.repository = repository;
    this.context = context;

    this._idLoader = new DataLoader(async (ids: any) => {
      const items = await this.repository.find({
        id: In(ids),
      });
      return map(ids, (id) => find(items, { id }));
    });
  }

  getById(id: string) {
    if (!id) return null;
    // return this.repository.findOne(id);
    return isArray(id) ? this._idLoader.loadMany(id) : this._idLoader.load(id);
  }

  getSortedTable() {
    return this.repository.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  getOneByField(field: string, value: string) {
    if (!field || !value) {
      return null;
    }
    const where: { [index: string]: any } = {};
    where[field] = value;
    return this.repository.findOne({ where });
  }

  getAllByField(field: string, value: string) {
    if (!field || !value) {
      return null;
    }
    const where: { [index: string]: any } = {};
    where[field] = value;
    return this.repository.find({ where });
  }

  rawPaginator(paging: PaginatorInput): string {
    paging.page--;
    let offset;
    if (paging.limit < 0) {
      paging.limit = 10;
    }
    if (paging.page <= 0) {
      offset = 0;
    } else {
      offset = paging.page * paging.limit;
    }
    paging.page++;
    return `limit ${paging.limit} offset ${offset}`;
  }

  async paginator(query: any, paging: PaginatorInput) {
    const queryBuilder = query;
    let list = [];
    if (paging) {
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
      paging.totalPages = Math.ceil((await query.getCount()) / paging.limit);
      list = await queryBuilder
        .skip(paging.page * paging.limit)
        .take(paging.limit)
        .getMany();
    } else {
      const dataLength = await query.getCount();
      paging = {
        totalPages: 1,
        page: 1,
        limit: dataLength,
      };
      list = await queryBuilder.getMany();
    }

    return { list, paging };
  }

  sort(query: any, sort: Sort[]) {
    forEach(sort, (s: Sort): void => {
      let alias = s.alias ? s.alias : '';
      let fieldName = snakeCase(s.field);
      if (alias) {
        fieldName = alias + '.' + fieldName;
      }
      query.orderBy(fieldName, s.order);
    });
    return query;
  }

  formatErrors(errors: string[], errorMessage?: string | '') {
    return { error: errors[0], errors, errorMessage };
  }
}
