import * as dotenv from 'dotenv';
import * as path from 'path';
import { defaultTo } from 'lodash';

import { Admin as AdminInterface } from './interfaces/admin';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLocaleLowerCase() : 'development';

const ROOT = path.resolve(__dirname, '../');

export interface IConfig {
  server: {
    port: number | boolean;
    root: string;
    host: string;
  };
  cors: {
    origin: string;
    allowMethods: string[];
    exposeHeaders: string[];
  };
  defaultUser: AdminInterface;
  bodyParser: {
    enableTypes: string[];
    formLimit: string;
    jsonLimit: string;
  };
  nodeEnv: string;
  isTest: boolean;
  isProduction: boolean;
  isDevelopment: boolean;
  disableAuthAccess: boolean;
  tokenSecret: string;
}

const config: IConfig = {
  server: {
    port: normalizePort(defaultTo(process.env.NODE_PORT, 6001)),
    root: ROOT,
    host: defaultTo(process.env.NODE_HOST, 'localhost'),
  },

  cors: {
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id'],
  },
  bodyParser: {
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb',
  },
  defaultUser: {
    id: '1f14512b-9434-5c51-987a-a37605ac5334',
    firstName: 'Sheraz',
    lastName: 'Ali',
    email: 'sheraz.ali342@gmail.com',
    contactNumber: '+971558063571',
    password: '123456',
  },
  nodeEnv: process.env.NODE_ENV,
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  disableAuthAccess: process.env.DISABLE_AUTH_ACCESS ? process.env.DISABLE_AUTH_ACCESS === 'true' : false,
  tokenSecret: process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '986fghjr5h2h3cc1e1e19523fd5345fgh567FG',
};

/**
 * Normalize port
 * @param val {string} value port
 */
export function normalizePort(val: string | number): number | boolean {
  const port: number = parseInt(val as string, 10);

  if (isNaN(port)) {
    return port;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

export default config;
