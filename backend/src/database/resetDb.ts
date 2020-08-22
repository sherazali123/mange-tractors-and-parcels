import 'reflect-metadata';

import { createConnection, getConnectionOptions } from 'typeorm';

const resetDb = async () => {
  try {
    const connectionOptions = await getConnectionOptions();

    createConnection({ ...connectionOptions, dropSchema: true })
      .then(async (connection) => {
        await connection.close();
      })
      .catch((error) => {
        console.log('ResetDb: CreateConnection:Error: ', error.message);
      });
  } catch (error) {}
};

resetDb();
