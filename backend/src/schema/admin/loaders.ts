import DataLoader from 'dataloader';
import { map, find } from 'lodash';
import { In } from 'typeorm';
import Admin from './model';

export const createLoaders = (model: Admin) => {
  return {
    getByEmail: new DataLoader(async (emails: any) => {
      const items = await model.repository.find({
        email: In(emails),
      });
      return map(emails, (email) => find(items, { email }));
    }),
    getByContactNumber: new DataLoader(async (contactNumbers: any) => {
      const items = await model.repository.find({
        contactNumber: In(contactNumbers),
      });
      return map(contactNumbers, (contactNumber) => find(items, { contactNumber }));
    }),
  };
};
