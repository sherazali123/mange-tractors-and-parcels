import { Status } from './../../entity/root/enums';
import { Tractor as TractorInterface } from './../../interfaces/tractor';
import { v4 as uuidv4 } from 'uuid';
import { cryptoRandomString } from './../../component/lib/util';

export const tractors = (): TractorInterface[] => {
  const data: TractorInterface[] = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      id: uuidv4(),
      name: 'Tractor' + ' - ' + cryptoRandomString(8),
      status: Status.ACTIVE,
    });
  }
  return data;
};
