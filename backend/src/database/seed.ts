import 'reflect-metadata';

import { values } from 'lodash';

import { createConnection } from 'typeorm';
import { Admin } from './../entity/Admin';
import { Tractor } from './../entity/Tractor';
import { Parcel } from './../entity/Parcel';
import { TractorParcel } from './../entity/TractorParcel';
import config from './../config';

import { admins } from './objects/admins';
import { tractors } from './objects/tractors';
import { parcels } from './objects/parcels';
import { tractorParcels } from './objects/tractorParcels';

export const startSeeding = async (): Promise<void> => {
  try {
    const { defaultUser } = config;
    createConnection()
      .then(async (connection) => {
        console.log('Adding Admins');
        await connection.createQueryBuilder().insert().into(Admin).values(admins(defaultUser)).execute();

        console.log('Adding Tractors');
        await connection.createQueryBuilder().insert().into(Tractor).values(tractors()).execute();

        console.log('Adding Parcels');
        await connection.createQueryBuilder().insert().into(Parcel).values(parcels()).execute();

        console.log('Assign parcels to tractors');
        let addedTractors = await connection.getRepository(Tractor).createQueryBuilder().getMany();
        let addedParcels = await connection.getRepository(Parcel).createQueryBuilder().getMany();
        await connection
          .createQueryBuilder()
          .insert()
          .into(TractorParcel)
          .values(tractorParcels(addedTractors, addedParcels))
          .execute();
        console.log('Seeded!');
        await connection.close();
      })
      .catch((error) => {
        console.log('StartSeeding: CreateConnection:Error: ', error.message);
      });
  } catch (error) {}
};

startSeeding();
