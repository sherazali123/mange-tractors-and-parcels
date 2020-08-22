import camalCaseKeys from 'camelcase-keys';
import { isEmpty, get } from 'lodash';
import jwt from 'jsonwebtoken';
import config from './../config';

const handleAuth = async ({ req }: any) => {
  // if (shouldAuthenticate(req.body)) {
  const authorization = get(req.headers, 'authorization', null);
  try {
    if (!isEmpty(authorization)) {
      // check authentication here

      let decoded = jwt.verify(authorization, config.tokenSecret);

      return { user: decoded, authorization };
    }
  } catch (error) {
    console.log('error', error);
  }
  return { user: null, authorization };
  // }
};

export default handleAuth;
