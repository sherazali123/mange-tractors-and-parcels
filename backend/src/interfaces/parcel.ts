import { PaginatorInput, Geolocation } from './';
import { Parcel as ParcelEntity } from './../entity/Parcel';
import { Status } from './../entity/root/enums';

export interface Parcel {
  id: string;
  name: string;
  culture: string;
  area: string;
  geoLocation: Geolocation;
  longitude?: number;
  latitude?: number;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

export interface Params {
  searchText: string;
  status: string;
}

export interface ParcelFilters {
  params: Params;
  paging: PaginatorInput;
}

export interface SaveParcelPayload {
  errors?: string[];
  data?: { parcel: ParcelEntity };
  errorMessage?: string | '';
}
