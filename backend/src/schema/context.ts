// models
import AdminModel from './admin/model';
import TractorModel from './tractor/model';
import TractorParcelModel from './tractorParcel/model';
import ParcelModel from './parcel/model';

import { Connection } from 'typeorm';
import { Admin as AdminInterface } from './../interfaces/admin';

export default class Context {
  admin: AdminModel;
  tractor: TractorModel;
  parcel: ParcelModel;
  tractorParcel: TractorParcelModel;
  req?: object;
  auth?: AdminInterface;
  userId?: string | undefined;
  schema: any;
  constructor(connection: Connection, schema: any, _req?: object, auth?: AdminInterface) {
    this.auth = auth;
    this.userId = auth ? auth.id : undefined;

    this.schema = schema;

    this.admin = new AdminModel(connection, this);
    this.tractor = new TractorModel(connection, this);
    this.parcel = new ParcelModel(connection, this);
    this.tractorParcel = new TractorParcelModel(connection, this);
  }
}
