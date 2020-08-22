import { first } from 'lodash';
import Context from '../context';
import { TractorParcel, TractorParcelFilters } from '../../interfaces/tractorParcel';
import { Tractor } from '../../interfaces/tractor';
import { Parcel } from '../../interfaces/parcel';
export default {
  TractorParcel: {
    tractor({ tractorId }: TractorParcel, args: Tractor, context: Context) {
      return context.tractor.getById(tractorId);
    },
    parcel({ parcelId }: TractorParcel, args: Parcel, context: Context) {
      return context.parcel.getById(parcelId);
    },
  },
  Query: {
    tractorParcel(_root: TractorParcel, { id }: TractorParcel, context: Context) {
      return context.tractorParcel.getById(id);
    },
    processedParcels(_root: TractorParcel, { paging, params }: TractorParcelFilters, context: Context) {
      return context.tractorParcel.processedParcels(paging, params);
    },
    getActiveTractorsAndParcels(_root: TractorParcel, _args: any, context: Context) {
      return context.tractorParcel.getActiveTractorsAndParcels();
    },
  },
  Mutation: {
    saveTractorParcel(_root: TractorParcel, { input }: { input: TractorParcel }, context: Context) {
      return context.tractorParcel.save(input);
    },
  },
};
