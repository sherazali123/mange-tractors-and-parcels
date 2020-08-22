import { PaginatorInput } from './';
import { Tractor as TractorEntity } from './../entity/Tractor';
import { Status } from './../entity/root/enums';

export interface Tractor {
  id: string;
  name: string;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

export interface Params {
  searchText: string;
  status: string;
}

export interface TractorFilters {
  params: Params;
  paging: PaginatorInput;
}

export interface SaveTractorPayload {
  errors?: string[];
  data?: { tractor: TractorEntity };
  errorMessage?: string | '';
}
