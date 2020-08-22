import { keys, snakeCase, mapKeys, isArray, map } from 'lodash';

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from './../../config';
import { Admin as AdminInterface } from './../../interfaces/admin';

const saltSound = 15;
export const transformToSnakeCase = (data: any) => {
  const snakeCaseObj = (obj: any) => {
    const dataWithSnakeCase = mapKeys(obj, (value: any, key: any) => snakeCase(key));
    keys(obj).forEach((key: string | number) => {
      delete obj[key];
    });

    keys(dataWithSnakeCase).forEach((key: string | number) => {
      obj[key] = dataWithSnakeCase[key];
    });

    return obj;
  };

  return isArray(data) ? map(data, snakeCaseObj) : snakeCaseObj(data);
};

export const cryptoRandomString = (length: any) => {
  if (!Number.isFinite(length)) {
    throw new TypeError('Expected a finite number');
  }

  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

export const createPasswordFromString = (string: string) => {
  return bcrypt.hashSync(string);
};

export const generateAccessToken = (user: string): string => {
  return jwt.sign(user, config.tokenSecret);
};
