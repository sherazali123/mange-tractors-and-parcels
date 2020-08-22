import { first } from 'lodash';
import Context from '../context';
import { Tractor, TractorFilters } from '../../interfaces/tractor';
export default {
  Tractor: {},
  Query: {
    tractor(_root: Tractor, { id }: Tractor, context: Context) {
      return context.tractor.getById(id);
    },
    tractors(_root: Tractor, { paging, params }: TractorFilters, context: Context) {
      return context.tractor.getAll(paging, params);
    },
  },
  Mutation: {
    saveTractor(_root: Tractor, { input }: { input: Tractor }, context: Context) {
      return context.tractor.save(input);
    },
  },
};
