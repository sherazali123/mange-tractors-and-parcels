// Models
import BaseModel from '../baseModel';

// Orm entities
import { Tractor as TractorEntity } from '../../entity/Tractor';

// Load Errors
import { TractorError } from './enum';
import { createLoaders } from './loaders';
import Context from '../context';

// Interfaces
import { Tractor as TractorInterface, Params, SaveTractorPayload } from '../../interfaces/tractor';
import { PaginatorInput, Validator as ValidatorInterface } from '../../interfaces';

import { Connection, Raw } from 'typeorm';
import { isEmpty } from 'lodash';
import { In, EntityManager } from 'typeorm';
import { Status } from '../../entity/root/enums';

export default class Tractor extends BaseModel {
  repository: any;
  connection: any;
  loaders: any;
  constructor(connection: Connection, context: Context) {
    super(connection, connection.getRepository(TractorEntity), context);
    this.loaders = createLoaders(this);
  }

  resolveParamsToFilters(query: any, params: Params) {
    params = params || {};

    if (params.searchText) {
      params.searchText = `%${params.searchText}%`;
      query.andWhere('name ILIKE :searchText');
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

  getActive(): Promise<Tractor[]> {
    return this.repository.find({ order: { name: 'ASC' } });
  }

  async getAll(paging: PaginatorInput, params: Params) {
    let query = this.repository.createQueryBuilder();

    query = this.resolveParamsToFilters(query, params);

    query = this.sort(query, [{ field: 'updatedAt', order: 'DESC' }]);

    return this.paginator(query, paging);
  }

  getByName(name: string): TractorEntity {
    return this.repository.findOne({
      name: Raw((alias) => `LOWER(${alias}) = '${name.toLowerCase()}'`),
    });
  }

  async saveValidate(input: TractorInterface): Promise<ValidatorInterface> {
    const errors = [];
    let errorMessage = '';

    const tractor: Tractor = await this.getById(input.id);

    if (!isEmpty(input.id) && !tractor) {
      errors.push(TractorError.INVALID_ID);
    }

    const tractorExists = await this.getByName(input.name);
    if (tractorExists && tractorExists.id !== input.id) {
      errors.push(TractorError.DUPLICATE_NAME);
    }

    return { errors, data: { tractor }, errorMessage };
  }

  async save(input: TractorInterface): Promise<SaveTractorPayload> {
    try {
      const { data, errors, errorMessage } = await this.saveValidate(input);
      if (!isEmpty(errors)) {
        return this.formatErrors(errors, errorMessage);
      }

      let { tractor } = data;

      const transaction = await this.connection.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          if (isEmpty(tractor)) {
            // creating new one
            tractor = new TractorEntity();
          }
          tractor.name = input.name;

          tractor.status = input.status;

          await transactionalEntityManager.save(tractor);
        }
      );

      return { data: { tractor }, errors, errorMessage: '' };
    } catch (error) {
      return { errorMessage: error.message };
    }
  }
}
