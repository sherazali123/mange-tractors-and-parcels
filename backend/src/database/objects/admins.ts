import { createPasswordFromString } from '../../component/lib/util';
import { Status } from './../../entity/root/enums';
import { Admin as AdminInterface } from './../../interfaces/admin';

export const admins = (defaultUser: AdminInterface): AdminInterface[] => [
  {
    ...defaultUser,
    ...{
      password: createPasswordFromString(defaultUser.password ? defaultUser.password : '123456'),
      status: Status.ACTIVE,
    },
  },
];
