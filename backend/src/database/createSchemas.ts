import 'reflect-metadata';
import { createConnection } from 'typeorm';

const createSchemas = async () => {
  try {
    const connection = await createConnection();
    await connection.close();
  } catch (error) {
    console.log('StartMigrations: CreateConnection:Error: ', error.message);
  }
};

createSchemas();
