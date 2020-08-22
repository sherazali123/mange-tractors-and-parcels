// Models
import BaseModel from '../baseModel';

// Orm entities
import { Parcel as ParcelEntity } from '../../entity/Parcel';

// Load Errors
import { ParcelError } from './enum';
import { createLoaders } from './loaders';
import Context from '../context';

// Interfaces
import { Parcel as ParcelInterface, Params, SaveParcelPayload } from '../../interfaces/parcel';
import { PaginatorInput, Validator as ValidatorInterface } from '../../interfaces';

import { Connection, Raw } from 'typeorm';
import { isEmpty } from 'lodash';
import { In, EntityManager } from 'typeorm';

export default class Parcel extends BaseModel {
  repository: any;
  connection: any;
  loaders: any;
  constructor(connection: Connection, context: Context) {
    super(connection, connection.getRepository(ParcelEntity), context);
    this.loaders = createLoaders(this);
  }

  resolveParamsToFilters(query: any, params: Params) {
    params = params || {};

    if (params.searchText) {
      params.searchText = `%${params.searchText}%`;
      query.andWhere(`
        name ILIKE :searchText 
        OR area ILIKE :searchText 
        OR culture ILIKE :searchText  
      `);
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

  async getAll(paging: PaginatorInput, params: Params) {
    let query = this.repository.createQueryBuilder();

    query = this.resolveParamsToFilters(query, params);

    query = this.sort(query, [{ field: 'createdAt', order: 'DESC' }]);

    return this.paginator(query, paging);
  }

  async saveValidate(input: ParcelInterface): Promise<ValidatorInterface> {
    const errors = [];
    let errorMessage = '';

    const parcel: ParcelEntity = await this.getById(input.id);

    if (!isEmpty(input.id) && !parcel) {
      errors.push(ParcelError.INVALID_ID);
    }

    return { errors, data: { parcel }, errorMessage };
  }

  async save(input: ParcelInterface): Promise<SaveParcelPayload> {
    try {
      const { data, errors, errorMessage } = await this.saveValidate(input);
      if (!isEmpty(errors)) {
        return this.formatErrors(errors, errorMessage);
      }

      let { parcel } = data;

      const transaction = await this.connection.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          if (isEmpty(parcel)) {
            // creating new one
            parcel = new ParcelEntity();
          }
          parcel.name = input.name;
          parcel.culture = input.culture;
          parcel.area = input.area;
          parcel.geoLocation = {
            type: 'Point',
            coordinates: [input.longitude ? input.longitude : 0, input.latitude ? input.latitude : 0],
          };

          parcel.status = input.status;

          await transactionalEntityManager.save(parcel);
        }
      );

      return { data: { parcel }, errors, errorMessage: '' };
    } catch (error) {
      return { errorMessage: error.message };
    }
  }
}
