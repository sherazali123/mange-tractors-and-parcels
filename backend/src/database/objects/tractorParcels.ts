import { TractorParcel as TractorParcelnterface } from '../../interfaces/tractorParcel';
import { Tractor } from '../../entity/Tractor';
import { Parcel } from '../../entity/Parcel';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { forEach } from 'lodash';

export const tractorParcels = (tractors: Tractor[], parcels: any): TractorParcelnterface[] => {
  const data: TractorParcelnterface[] = [];
  const startProcessingFromDate = moment().subtract(20, 'days');

  for (let i = 0; i < tractors.length; i++) {
    const tractorId = tractors[0].id;

    // apply number of parcels to current tractor
    const processParcels = 10;
    if (parcels.length <= 0) {
      break;
    }
    for (let j = 0; j < processParcels; j++) {
      const parcel = parcels[0];
      data.push({
        id: uuidv4(),
        tractorId,
        parcelId: parcel.id,
        processOn: startProcessingFromDate.add(i, 'days').toDate(),
        area: parcel.area,
        geoLocation: parcel.geoLocation,
      });
    }
    parcels = parcels.splice(processParcels);
  }
  return data;
};
