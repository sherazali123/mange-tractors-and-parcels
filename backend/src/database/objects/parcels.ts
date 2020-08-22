import { Status } from '../../entity/root/enums';
import { Parcel as ParcelInterface } from '../../interfaces/parcel';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import { cryptoRandomString } from '../../component/lib/util';

export const parcels = (): ParcelInterface[] => {
  const data: ParcelInterface[] = [];
  for (let i = 0; i < 500; i++) {
    const address = faker.address;
    data.push({
      id: uuidv4(),
      name: 'Parcel' + ' - ' + cryptoRandomString(8),
      area: address.streetName(),
      culture: address.city(),
      geoLocation: { type: 'Point', coordinates: [parseFloat(address.longitude()), parseFloat(address.latitude())] },
      status: Status.ACTIVE,
    });
  }
  return data;
};
