// Models
import BaseModel from '../baseModel';

// Orm entities
import { TractorParcel as TractorParcelEntity } from '../../entity/TractorParcel';
import { Parcel as ParcelEntity, Parcel } from '../../entity/Parcel';
import { Tractor as TractorEntity } from '../../entity/Tractor';

// Load Errors
import { TractorParcelError } from './enum';
import { createLoaders } from './loaders';
import Context from '../context';

// Interfaces
import {
  TractorParcel as TractorParcelInterface,
  Params,
  SaveTractorParcelPayload,
} from '../../interfaces/tractorParcel';
import { PaginatorInput, Validator as ValidatorInterface } from '../../interfaces';

import { Connection, Raw } from 'typeorm';
import { isEmpty } from 'lodash';
import { In, EntityManager } from 'typeorm';
import moment from 'moment';

export default class TractorParcel extends BaseModel {
  repository: any;
  connection: any;
  loaders: any;
  constructor(connection: Connection, context: Context) {
    super(connection, connection.getRepository(TractorParcelEntity), context);
    this.loaders = createLoaders(this);
  }

  resolveParamsToFilters(query: any, params: Params) {
    params = params || {};

    if (params.parcelName) {
      params.parcelName = `%${params.parcelName}%`;
      query.andWhere('parcel.name ILIKE :parcelName');
    }

    if (params.culture) {
      params.culture = `%${params.culture}%`;
      query.andWhere('parcel.culture ILIKE :culture');
    }

    if (params.date) {
      params.date = moment(params.date).format('YYYY-MM-DD');
      query.andWhere(`TO_CHAR(tractorParcel.processOn, 'YYYY-MM-DD')  = :date`);
    }
    if (params.tractorName) {
      params.tractorName = `%${params.tractorName}%`;
      query.andWhere('tractor.name ILIKE :tractorName');
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

  async processedParcels(paging: PaginatorInput, params: Params) {
    let query = this.repository.createQueryBuilder('tractorParcel');

    // query.select(['tractorParcel.*']);
    query.innerJoin('tractorParcel.tractor', 'tractor');
    query.innerJoin('tractorParcel.parcel', 'parcel');

    query = this.resolveParamsToFilters(query, params);

    query.orderBy('tractorParcel.createdAt', 'DESC');

    return this.paginator(query, paging);
  }

  async isParcelInRadius(parcel: Parcel, coordinates: number[]): Promise<Boolean> {
    // Allow only if it's in the range of 20km meters
    let inRadius = await this.connection
      .getRepository(Parcel)
      .createQueryBuilder()
      .andWhere('id = :id')
      .andWhere('ST_DWithin(geo_location, ST_MakePoint(:longitude, :latitude)::geography, 20000)')
      .setParameters({ id: parcel.id, longitude: coordinates[0], latitude: coordinates[1] })
      .getOne();
    return inRadius ? true : false;
  }

  async getByTractorAndParcelId(tractorId: string, parcelId: string): Promise<TractorParcelEntity> {
    return this.repository.findOne({ where: { tractorId, parcelId }, order: { createdAt: 'ASC' } });
  }

  async saveValidate(input: TractorParcelInterface): Promise<ValidatorInterface> {
    const errors = [];
    let errorMessage = '';

    const tractorParcel: TractorParcelEntity = await this.getById(input.id);
    const tractor: TractorEntity = await this.context.tractor.getById(input.tractorId);
    const parcel: ParcelEntity = await this.context.parcel.getById(input.parcelId);

    if (!isEmpty(input.id) && !tractorParcel) {
      errors.push(TractorParcelError.INVALID_ID);
    }

    if (isEmpty(tractor)) {
      errors.push(TractorParcelError.INVALID_TRACTOR_ID);
    }

    const alreadyExists = await this.getByTractorAndParcelId(tractor.id, parcel.id);
    if (alreadyExists && alreadyExists.id !== input.id) {
      errors.push(TractorParcelError.ALREADY_PROCESSED);
    }

    if (isEmpty(parcel)) {
      errors.push(TractorParcelError.INVALID_PARCEL_ID);
    }
    const isParcelInRadius: Boolean = await this.isParcelInRadius(parcel, [
      input.longitude ? input.longitude : 0,
      input.latitude ? input.latitude : 0,
    ]);
    if (!isParcelInRadius) {
      errors.push(TractorParcelError.OUT_OF_RANGE);
    }

    return { errors, data: { tractorParcel }, errorMessage };
  }

  async save(input: TractorParcelInterface): Promise<SaveTractorParcelPayload> {
    try {
      const { data, errors, errorMessage } = await this.saveValidate(input);
      if (!isEmpty(errors)) {
        return this.formatErrors(errors, errorMessage);
      }

      let { tractorParcel } = data;

      const transaction = await this.connection.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          if (isEmpty(tractorParcel)) {
            // creating new one
            tractorParcel = new TractorParcelEntity();
          }
          tractorParcel.tractorId = input.tractorId;
          tractorParcel.parcelId = input.parcelId;
          tractorParcel.processOn = input.processOn;
          tractorParcel.area = input.area;
          tractorParcel.geoLocation = {
            type: 'Point',
            coordinates: [input.longitude, input.latitude],
          };

          await transactionalEntityManager.save(tractorParcel);
        }
      );

      return { data: { tractorParcel }, errors, errorMessage: '' };
    } catch (error) {
      return { errorMessage: error.message };
    }
  }
}
