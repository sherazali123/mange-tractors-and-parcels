import Context from '../context';
import { Parcel, ParcelFilters } from '../../interfaces/parcel';
export default {
  Parcel: {},
  Query: {
    parcel(_root: Parcel, { id }: Parcel, context: Context) {
      return context.parcel.getById(id);
    },
    parcels(_root: Parcel, { paging, params }: ParcelFilters, context: Context) {
      return context.parcel.getAll(paging, params);
    },
  },
  Mutation: {
    saveParcel(_root: Parcel, { input }: { input: Parcel }, context: Context) {
      return context.parcel.save(input);
    },
  },
};
